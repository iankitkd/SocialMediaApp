"use server"

import { cookies } from 'next/headers';

const BACKEND_URL = process.env.BACKEND_API_URL;

import { ProfileValues } from "@/lib/validations/user"

export async function getCurrentUser() {
  try {
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
  } catch (error) {
      throw new Error("Internal server error");
  }
}

export async function getUserByUsername(username: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const res = await fetch(`${BACKEND_URL}/user/${username}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if(!res.ok) {
      if (res.status === 404) {
        return null;
      }
      const error = await res.json();
      throw new Error(error.message || "Internal server error");
    }

    const data = await res.json();
    return data.data;
    
  } catch (error:any) {
      throw new Error(error.message || "Internal server error");
  }
}


export async function updateUser(data: ProfileValues) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) throw new Error("Not authorized");

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
    return response.data;
  } catch (error:any) {
      throw new Error(error.message || 'Something went wrong');;
  }
}

export async function isUsernameAvailable(username:string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) throw new Error("Not authorized");

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
  } catch (error:any) {
    throw new Error(error.message || 'Something went wrong');
  }
}