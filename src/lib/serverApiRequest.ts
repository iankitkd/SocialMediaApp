"use server"

import { cookies } from "next/headers";

export default async function serverApiRequest(
  url: string,
  method: string,
  options?: RequestInit & { data?: any },
  returnData: boolean = true
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // if (!token) throw new Error("Not authorized");

  const response = await fetch(url, {
    ...options,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: (token ? `token=${token}` : ""),
      ...options?.headers
    },
    body: options?.data ? JSON.stringify(options.data) : options?.body,
    credentials: 'include'
  });
  
  if(!returnData) {
    return response;
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}


//   'X-CSRF-Token': getCSRFToken(),