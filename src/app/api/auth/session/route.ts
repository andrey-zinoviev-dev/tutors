import { createSession } from '@/lib/sessions/sessions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { id, provider } = await request.json();
    // const { id, provider } = user;
    // const { expires_in, refresh_token } = tokens;
    // const { device_id, state } = device_state;
    // console.log(access_token, expires_in, refresh_token);
    
    // Validate provider 
    if (!['vk', 'yandex', 'google'].includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
    }
    

    // Create tokens
    // await createTokens({expires_in, refresh_token, deviceId: device_id, state: state});

    // Create session (works for any provider)
    await createSession({id, provider});
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json({ error: 'Session creation failed' }, { status: 500 })
  }
}
