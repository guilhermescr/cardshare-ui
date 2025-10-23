type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: HttpMethod;
  token?: string | null;
  body?: unknown;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

export async function httpRequest<T>(
  path: string,
  { method = 'GET', token, body, params, headers = {} }: RequestOptions = {}
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL!;
  const url = new URL(path, base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (body && method !== 'GET') {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body && method !== 'GET' ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }

  return {} as T;
}
