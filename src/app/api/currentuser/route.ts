import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL;

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if(!token) {
      return NextResponse.json(
          { message: 'Token does not exist' },
          { status: 401 }
      );
    }
    
    const res = await fetch(`${BACKEND_URL}/currentuser`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
        Cookie: `token=${token}`
      },
      credentials: 'include',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch current user' }, 
        { status: res.status || 500 }
      );      
    }

    return NextResponse.json(
      { user: data.data, message: 'Successfully fetched current user' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}