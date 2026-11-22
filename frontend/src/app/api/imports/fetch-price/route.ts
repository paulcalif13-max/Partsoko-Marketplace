import { NextResponse } from 'next/server';

// Standard currency exchange rates to Kenyan Shillings (KES)
const FX_RATES_TO_KES: Record<string, number> = {
  USD: 129.5,
  AUD: 85.5,
  CAD: 94.2,
  EUR: 141.0,
  GBP: 167.0,
  JPY: 0.86,
  AED: 35.3,
  CNY: 18.2,
  ZAR: 7.2,
  KES: 1.0,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, vehicle = '', notes = '', manualPrice, manualCurrency } = body;

    // Direct manual conversion mode (e.g. admin types AU $112.67 or enters price + currency)
    if (manualPrice !== undefined && manualPrice !== null && manualPrice !== '') {
      const rawStr = String(manualPrice).trim();
      let detectedCurr = (manualCurrency || 'USD').toUpperCase();

      // Check if currency symbol or code is embedded in manualPrice string
      if (/AU\s*\$|AUD/i.test(rawStr)) detectedCurr = 'AUD';
      else if (/C\s*\$|CAD/i.test(rawStr)) detectedCurr = 'CAD';
      else if (/US\s*\$|USD|\$/i.test(rawStr)) detectedCurr = 'USD';
      else if (/€|EUR/i.test(rawStr)) detectedCurr = 'EUR';
      else if (/£|GBP/i.test(rawStr)) detectedCurr = 'GBP';
      else if (/¥|JPY/i.test(rawStr)) detectedCurr = 'JPY';
      else if (/AED/i.test(rawStr)) detectedCurr = 'AED';
      else if (/CNY|RMB/i.test(rawStr)) detectedCurr = 'CNY';

      const numericVal = parseFloat(rawStr.replace(/[^0-9.]/g, ''));
      if (!isNaN(numericVal) && numericVal > 0) {
        const rate = FX_RATES_TO_KES[detectedCurr] || FX_RATES_TO_KES.USD;
        const fobKes = Math.round(numericVal * rate);
        const estimatedDuty = Math.round((fobKes + 8500) * 0.42 / 500) * 500;

        return NextResponse.json({
          success: true,
          fobKes,
          originalPrice: numericVal,
          currency: detectedCurr,
          exchangeRate: rate,
          estimatedDuty,
          detectedVendor: 'Manual Currency Converter',
          isEstimated: false,
          message: `Converted ${numericVal.toFixed(2)} ${detectedCurr} at ${rate} KES/${detectedCurr} → KES ${fobKes.toLocaleString()}`,
        });
      }
    }

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json(
        { message: 'A valid http/https product link is required.' },
        { status: 400 }
      );
    }

    let detectedVendor = 'Overseas Marketplace';
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('ebay')) detectedVendor = 'eBay';
    else if (lowerUrl.includes('alibaba')) detectedVendor = 'Alibaba';
    else if (lowerUrl.includes('aliexpress')) detectedVendor = 'AliExpress';
    else if (lowerUrl.includes('amazon')) detectedVendor = 'Amazon';
    else if (lowerUrl.includes('partsouq')) detectedVendor = 'PartSouq';
    else if (lowerUrl.includes('amayama')) detectedVendor = 'Amayama Japan';
    else if (lowerUrl.includes('rockauto')) detectedVendor = 'RockAuto';

    let extractedPrice: number | null = null;
    let extractedCurrency: string = 'USD';
    let productTitle: string = '';
    let htmlContent = '';
    let fetchStatus = 0;

    // Step 1: Attempt direct HTTP fetch
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
      clearTimeout(timeoutId);
      fetchStatus = res.status;

      if (res.ok) {
        htmlContent = await res.text();
      }
    } catch (err: any) {
      console.log(`[Price Agent] Fetch aborted or blocked for ${url}: ${err.message}`);
    }

    // Step 2: Parse HTML for structured product metadata if HTML was retrieved
    if (htmlContent && htmlContent.length > 200) {
      // 2A: Extract Product Title
      const titleMatch =
        htmlContent.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i) ||
        htmlContent.match(/<title>(.*?)<\/title>/i);
      if (titleMatch && titleMatch[1]) {
        productTitle = titleMatch[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
      }

      // 2B: Extract OpenGraph / Meta price tags
      const ogPriceMatch =
        htmlContent.match(/<meta\s+property=["']og:price:amount["']\s+content=["']([0-9.,]+)["']/i) ||
        htmlContent.match(/<meta\s+property=["']product:price:amount["']\s+content=["']([0-9.,]+)["']/i) ||
        htmlContent.match(/<meta\s+name=["']twitter:data1["']\s+content=["']([0-9.,]+)["']/i);

      const ogCurrencyMatch =
        htmlContent.match(/<meta\s+property=["']og:price:currency["']\s+content=["']([A-Z]{3})["']/i) ||
        htmlContent.match(/<meta\s+property=["']product:price:currency["']\s+content=["']([A-Z]{3})["']/i);

      if (ogPriceMatch && ogPriceMatch[1]) {
        extractedPrice = parseFloat(ogPriceMatch[1].replace(/,/g, ''));
        if (ogCurrencyMatch && ogCurrencyMatch[1]) {
          extractedCurrency = ogCurrencyMatch[1].toUpperCase();
        }
      }

      // 2C: Extract Schema.org JSON-LD
      if (!extractedPrice) {
        const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
        let jsonMatch: RegExpExecArray | null;
        while ((jsonMatch = jsonLdRegex.exec(htmlContent)) !== null) {
          try {
            const data = JSON.parse(jsonMatch[1]);
            const offer = data.offers || (Array.isArray(data['@graph']) ? data['@graph'].find((item: any) => item.offers)?.offers : null);
            if (offer) {
              const priceVal = Array.isArray(offer) ? offer[0]?.price : (offer.price || offer.lowPrice);
              const currVal = Array.isArray(offer) ? offer[0]?.priceCurrency : offer.priceCurrency;
              if (priceVal) {
                extractedPrice = parseFloat(String(priceVal).replace(/,/g, ''));
                if (currVal) extractedCurrency = String(currVal).toUpperCase();
                break;
              }
            }
          } catch {
            // Ignore malformed JSON-LD
          }
        }
      }

      // 2D: Platform-specific patterns (including AU $, C $, US $, etc.)
      if (!extractedPrice) {
        // Multi-currency price matchers
        const multiCurrMatch = htmlContent.match(/(AU\s*\$|AUD|C\s*\$|CAD|US\s*\$|USD|[$€£¥])\s*([0-9]+(?:\.[0-9]{2})?)/i);
        if (multiCurrMatch) {
          const rawSymbol = multiCurrMatch[1].toUpperCase();
          extractedPrice = parseFloat(multiCurrMatch[2]);
          if (rawSymbol.includes('AU')) extractedCurrency = 'AUD';
          else if (rawSymbol.includes('C')) extractedCurrency = 'CAD';
          else if (rawSymbol === '€') extractedCurrency = 'EUR';
          else if (rawSymbol === '£') extractedCurrency = 'GBP';
          else if (rawSymbol === '¥') extractedCurrency = 'JPY';
          else extractedCurrency = 'USD';
        }
      }
    }

    // Step 3: Handle when scraping is blocked (e.g. Akamai 403 on eBay or captcha)
    if (!extractedPrice || isNaN(extractedPrice) || extractedPrice <= 0) {
      return NextResponse.json({
        success: false,
        blocked: true,
        detectedVendor,
        fetchStatus,
        message: `${detectedVendor} blocked direct price extraction (${fetchStatus === 403 ? 'Anti-bot protection 403' : 'No price tags found'}). Please check the supplier's tab and enter their listed price in the currency converter.`,
        rates: FX_RATES_TO_KES,
      });
    }

    // Step 4: Currency Conversion to KES using real exchange rate
    const rate = FX_RATES_TO_KES[extractedCurrency] || FX_RATES_TO_KES.USD;
    const fobKes = Math.round(extractedPrice * rate);

    // Step 5: Recommended KRA Customs Duty calculation (~42% of CIF)
    const estimatedDuty = Math.round((fobKes + 8500) * 0.42 / 500) * 500;

    return NextResponse.json({
      success: true,
      fobKes,
      originalPrice: Number(extractedPrice.toFixed(2)),
      currency: extractedCurrency,
      exchangeRate: rate,
      estimatedDuty,
      productTitle: productTitle || `${vehicle} Sourced Part`,
      detectedVendor,
      isEstimated: false,
      message: `✨ Detected live price from ${detectedVendor}: ${extractedPrice.toFixed(2)} ${extractedCurrency} → KES ${fobKes.toLocaleString()} (Rate: ${rate} KES/${extractedCurrency}).`,
    });
  } catch (error: any) {
    console.error('Error in /api/imports/fetch-price:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to detect price from product link' },
      { status: 500 }
    );
  }
}
