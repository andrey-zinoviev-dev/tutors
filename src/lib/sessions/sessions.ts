'use server';
import { SignJWT, jwtVerify } from 'jose'
import { UnifiedUser } from '../features/userSlice';
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET;
console.log('secretKey', secretKey);
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: {user: {id: string, provider: string}, expiresAt: Date}) {
    if (!payload) {
        throw new Error('Payload is null');
    }
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(encodedKey)
};

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.error('Error decrypting token:', error);
        return null;
    }
};

export async function createSession({id, provider}: {id: string, provider: string}) {
    // console.log('createSession', id, provider)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ user: { id, provider }, expiresAt })
    const cookieStore = await cookies()
   
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    })
  }