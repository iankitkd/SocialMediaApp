import { NextResponse } from "next/server"
import serverApiRequest from "@/lib/serverApiRequest";
import { appEnv } from "@/lib/env";

const BACKEND_URL = appEnv.BACKEND_API_URL;

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const receiverId = req.receiverId;
    if(!receiverId) {
        return NextResponse.json(
          { message: 'Invalid Request' },
          { status: 400 }
        );
    }

    const messages = await serverApiRequest(`${BACKEND_URL}/messages/${receiverId}`, "GET");
    return NextResponse.json({messages: messages.data, status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: error instanceof Error? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}