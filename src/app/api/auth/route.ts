import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const mode = req.mode;
    if(!mode) {
      return NextResponse.json(
        { message: 'Invalid Request' },
        { status: 404 }
      );
    }
    
    const res = await fetch(`${BACKEND_URL}/${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || ''
      },
      body: JSON.stringify(req),
      credentials: 'include'
    });

    const data = await res.json();

    if (!res.ok) {
      const error = data;
      return NextResponse.json(
        { message: error.message || 'Authentication failed' },
        { status: res.status }
      );
    }

    const authCookie = data.data.token;

    const response = NextResponse.json(data);
    response.cookies.set('token', authCookie || '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60, // 1 day
        path: '/',
    });
    return response;

  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}