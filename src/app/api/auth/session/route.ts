import { createSession, createTokens } from '@/lib/sessions/sessions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { user, tokens } = await request.json();
    const { id, provider } = user;
    const { access_token, expires_in, refresh_token } = tokens;
    // console.log(access_token, expires_in, refresh_token);
    
    // Validate provider 
    if (!['vk', 'yandex', 'google'].includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
    }
    

    // Create tokens
    await createTokens({access_token, expires_in, refresh_token});

    // Create session (works for any provider)
    await createSession({id, provider});
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json({ error: 'Session creation failed' }, { status: 500 })
  }
}
