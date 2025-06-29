"use server"

import serverApiRequest from '@/lib/serverApiRequest';
import { appEnv } from '@/lib/env';
const BACKEND_URL = appEnv.BACKEND_API_URL;

import { ProfileValues } from "@/validators/user"

export async function getCurrentUser() {
  try {
    const res =  await serverApiRequest(`${BACKEND_URL}/profile`, "GET", {}, false);
    const data = await res.json();
    return res.ok ? data.data : null;
  } catch (error) {
      throw new Error("Internal server error");
  }
}

export async function getUserByUsername(username: string) {
  try {
    const res = await serverApiRequest(`${BACKEND_URL}/users/${username}`, "GET", {}, false);
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
    const response = await serverApiRequest(`${BACKEND_URL}/profile`, "PATCH", {
        data: data,
    });
    return response.data;
  } catch (error:any) {
      throw new Error(error.message || 'Something went wrong');;
  }
}

export async function isUsernameAvailable(username:string) {
  try {
    const response = await serverApiRequest(`${BACKEND_URL}/validate-username`, "POST", {
      data: {username},
    });
    return response.data;
  } catch (error:any) {
    throw new Error(error.message || 'Something went wrong');
  }
}

export async function searchUsers(searchString:string) {
  try {
    const res = await serverApiRequest(`${BACKEND_URL}/users/search?q=${searchString}`, "GET");
    return res.data;
  } catch (error) {
    throw error;
  }
}