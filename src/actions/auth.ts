'use server'

const API_BASE_URL = process.env.BACKEND_API_URL

import { cookies } from 'next/headers';
import { SigninValues, SignupValues } from '@/lib/validations/user';

export async function signup(values:SignupValues) {
  try {
    const {name, email, password} = values;
    const res = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include'
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    const cookieStore = await cookies();
    cookieStore.set('token', data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 ,
      path: '/'
    });

  } catch (error) {
    throw error;
  }
}

export async function signin(values:SigninValues) {
  try {
    const {email, password} = values;
    const res = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await res.json();
    
    if (!res.ok) throw new Error(data.message);

    const cookieStore = await cookies();
    cookieStore.set('token', data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 ,
      path: '/'
    });

  } catch (error) {
    throw error;
  }
}