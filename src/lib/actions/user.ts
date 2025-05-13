"use server"

import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_API_URL;

import { ProfileValues } from "@/lib/validations/user"


export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  const res = await fetch(`${BACKEND_URL}/profile`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  const data = await res.json();
  return res.ok ? data.data : null;
}


export async function updateUser(data: ProfileValues) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    const res = await fetch(`${BACKEND_URL}/profile/update`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(data)
    })
    
    const response = await res.json();

    if(!res.ok) {
      throw new Error(response.message || "Update Failed");
    }
  } catch (error) {
      throw error;
  }
}

export async function isUsernameAvailable(username:string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    const res = await fetch(`${BACKEND_URL}/validate-username`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token}`,
      },
      body: JSON.stringify({username})
    })
    
    const response = await res.json();

    if(!res.ok) {
      throw new Error(response.message || "Username validation error");
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}