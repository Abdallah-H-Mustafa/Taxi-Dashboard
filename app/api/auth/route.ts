import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_TOKEN_KEY, USER_DATA_KEY } from '@/lib/auth/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, user } = body;

    // Set secure HTTP-only cookies
    cookies().set(AUTH_TOKEN_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    cookies().set(USER_DATA_KEY, JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  cookies().delete(AUTH_TOKEN_KEY);
  cookies().delete(USER_DATA_KEY);
  return NextResponse.json({ success: true });
}