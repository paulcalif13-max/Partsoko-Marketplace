/**
 * Centralized API configuration for PARTSOKO.
 * In production on Vercel, requests route to '/api' on the same domain,
 * eliminating CORS issues, mixed content blocks, and localhost failures.
 */
export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || '/api';

export async function apiFetch<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<{ ok: boolean; data?: T; error?: string; status: number }> {
  // Normalize endpoint to ensure single leading slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // If endpoint already starts with /api and API_BASE_URL is /api, avoid /api/api
  let fullUrl: string;
  if (API_BASE_URL === '/api' || API_BASE_URL === '') {
    fullUrl = cleanEndpoint.startsWith('/api') ? cleanEndpoint : `/api${cleanEndpoint}`;
  } else {
    fullUrl = `${API_BASE_URL}${cleanEndpoint.replace(/^\/api/, '')}`;
  }

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    let data: any = null;
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: (data && data.message) || res.statusText || 'Request failed',
        data,
      };
    }

    return {
      ok: true,
      status: res.status,
      data,
    };
  } catch (err: any) {
    console.error(`API Fetch Error [${fullUrl}]:`, err);
    return {
      ok: false,
      status: 0,
      error: err.message || 'Network error, please check your internet connection',
    };
  }
}
