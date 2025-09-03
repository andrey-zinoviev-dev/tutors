'use server';
import { SignJWT, jwtVerify } from 'jose'
// import { UnifiedUser } from '../features/userSlice';
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

async function setCookie(name: string, value: string, expiresAt: number) {
    const cookieStore = await cookies();
    
    cookieStore.set(name, value, {
        httpOnly: true,
        secure: true,
        expires: new Date(expiresAt),
        sameSite: 'lax',
        path: '/',
    });
}

export async function encrypt<T extends Record<string, unknown>>(payload: T) {
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
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const session = await encrypt({id, provider});

    await setCookie('session', session, expiresAt);
    // const cookieStore = await cookies()
   
    // cookieStore.set('session', session, {
    //   httpOnly: true,
    //   secure: true,
    //   expires: expiresAt,
    //   sameSite: 'lax',
    //   path: '/',
    // });
};

export async function createTokens({expires_in, refresh_token, deviceId, state}: {expires_in: number, refresh_token: string, deviceId: string, state: string}) {
    const createdAt =Date.now();
    const expiresAt = createdAt + expires_in * 1000;

    // //expires_in cookie
    const expiresInEncrypted = await encrypt({expires_at: expiresAt});
    await setCookie('expiresInCookie', expiresInEncrypted, expiresAt);

    // //refresh_token cookie
    const refreshTokenEncrypted = await encrypt({refresh_token})
    await setCookie('refreshTokenCookie', refreshTokenEncrypted, expiresAt);
    
    //device_id cookie
    const deviceIdEncrypted = await encrypt({device_id: deviceId});
    await setCookie('deviceIdCookie', deviceIdEncrypted, expiresAt);
}

export async function getDecodedSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value;
    const decodedSession = await decrypt(session);
    return decodedSession;
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function checkSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value;
    return session;
}