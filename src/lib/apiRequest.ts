export default async function apiRequest(
  url: string,
  method: string,
  options?: RequestInit & { data?: any }
) {
  const response = await fetch(url, {
    ...options,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    body: options?.data ? JSON.stringify(options.data) : options?.body,
    credentials: 'include'
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

//   'X-CSRF-Token': getCSRFToken(),