import { NextResponse } from 'next/server';

// Standard currency exchange rates to Kenyan Shillings (KES)
const FX_RATES_TO_KES: Record<string, number> = {
  USD: 129.5,
  EUR: 141.0,
  GBP: 167.0,
  JPY: 0.86,
  AED: 35.3,
  CNY: 18.2,
  KES: 1.0,
};

// Fallback catalog estimations for common vehicle parts when external scraping is captcha-blocked
const PART_CATEGORY_ESTIMATES_USD: Array<{ keywords: string[]; avgUsd: number; dutyRate: number }> = [
  { keywords: ['caliper', 'brake caliper', 'brake system'], avgUsd: 185, dutyRate: 0.45 },
  { keywords: ['shock', 'strut', 'absorber', 'suspension', 'air spring'], avgUsd: 220, dutyRate: 0.45 },
  { keywords: ['turbo', 'turbocharger', 'actuator'], avgUsd: 380, dutyRate: 0.45 },
  { keywords: ['ecu', 'computer', 'module', 'sensor', 'sensor assembly'], avgUsd: 190, dutyRate: 0.35 },
  { keywords: ['alternator', 'starter', 'starter motor'], avgUsd: 160, dutyRate: 0.40 },
  { keywords: ['headlight', 'headlamp', 'lamp', 'taillight'], avgUsd: 175, dutyRate: 0.45 },
  { keywords: ['radiator', 'condenser', 'intercooler', 'cooling'], avgUsd: 140, dutyRate: 0.40 },
  { keywords: ['injector', 'fuel injector', 'fuel pump'], avgUsd: 240, dutyRate: 0.35 },
  { keywords: ['steering rack', 'rack and pinion', 'power steering'], avgUsd: 310, dutyRate: 0.45 },
  { keywords: ['gearbox', 'transmission', 'differential'], avgUsd: 650, dutyRate: 0.50 },
  { keywords: ['engine', 'cylinder head', 'crankshaft', 'block'], avgUsd: 950, dutyRate: 0.50 },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, vehicle = '', notes = '' } = body;

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
    let isEstimated = false;
    let htmlContent = '';

    // Step 1: Attempt direct HTTP fetch with realistic browser headers
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
          'Cache-Control': 'no-cache',
        },
      });
      clearTimeout(timeoutId);

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

      // 2D: Platform-specific patterns
      if (!extractedPrice) {
        // eBay patterns: e.g. "US $145.00" or item-price
        const ebayMatch = htmlContent.match(/itemprop=["']price["']\s+content=["']([0-9.]+)["']/i) ||
          htmlContent.match(/class=["'][^"']*x-price-primary[^"']*["'][^>]*>[\s\S]*?([$€£¥])\s*([0-9,.]+)/i) ||
          htmlContent.match(/([$€£¥]|USD|EUR|GBP|JPY)\s*([0-9]+(?:\.[0-9]{2})?)/i);

        if (ebayMatch) {
          const val = ebayMatch[2] || ebayMatch[1];
          const currSymbol = ebayMatch[1];
          extractedPrice = parseFloat(String(val).replace(/,/g, ''));
          if (currSymbol === '€') extractedCurrency = 'EUR';
          else if (currSymbol === '£') extractedCurrency = 'GBP';
          else if (currSymbol === '¥') extractedCurrency = 'JPY';
          else if (currSymbol === '$' || currSymbol === 'USD') extractedCurrency = 'USD';
        }
      }
    }

    // Step 3: Fallback Heuristic Estimation if site blocks direct scraping (Alibaba/Amazon botwall)
    if (!extractedPrice || isNaN(extractedPrice) || extractedPrice <= 0) {
      isEstimated = true;
      const combinedText = `${vehicle} ${notes} ${url}`.toLowerCase();
      let matchedEstimate = PART_CATEGORY_ESTIMATES_USD.find((cat) =>
        cat.keywords.some((kw) => combinedText.includes(kw))
      );

      // Default baseline if no specific part keyword matched
      const fallbackUsd = matchedEstimate ? matchedEstimate.avgUsd : 160;
      extractedPrice = fallbackUsd;
      extractedCurrency = 'USD';
      if (!productTitle) {
        productTitle = vehicle ? `Import Genuine OEM Parts (${vehicle})` : 'Import Automotive Replacement Part';
      }
    }

    // Step 4: Currency Conversion to KES
    const rate = FX_RATES_TO_KES[extractedCurrency] || FX_RATES_TO_KES.USD;
    const fobKes = Math.round(extractedPrice * rate);

    // Step 5: Recommended KRA Customs Duty calculation (~45% of CIF)
    // Standard CIF: FOB + ~8,500 freight. Duty approx 45% of CIF
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
      isEstimated,
      message: isEstimated
        ? `Estimated baseline calculated from automotive catalog for ${vehicle || 'part'}. You can adjust if needed.`
        : `Successfully detected live price from ${detectedVendor} ($${extractedPrice} ${extractedCurrency}) converted at ${rate} KES/${extractedCurrency}.`,
    });
  } catch (error: any) {
    console.error('Error in /api/imports/fetch-price:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to detect price from product link' },
      { status: 500 }
    );
  }
}
