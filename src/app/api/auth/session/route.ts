import { createSession, getDecodedSession } from '@/lib/sessions/sessions'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { id, provider } = await request.json()
    
    // Validate provider
    if (!['vk', 'yandex', 'google'].includes(provider)) {
      return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
    }
    
    // Create session (works for any provider)
    await createSession({id, provider})
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Session creation error:', error)
    return NextResponse.json({ error: 'Session creation failed' }, { status: 500 })
  }
}
