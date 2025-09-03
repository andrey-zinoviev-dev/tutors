import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/sessions/sessions";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshTokenCookie = cookieStore.get('refreshTokenCookie')?.value;
        const deviceIdCookie = cookieStore.get('deviceIdCookie')?.value;
        

        if(!refreshTokenCookie) {
            return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
        }

        const { refresh_token } = await decrypt(refreshTokenCookie) as { refresh_token: string };
        const { device_id, state } = await decrypt(deviceIdCookie) as { device_id: string, state: string };

        if(!refresh_token) {
            return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
        };

        const res = await fetch(`id.vk.com/oauth2/auth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                // client_secret: process.env.AUTH_VK_SECRET || "",
                grant_type: "refresh_token",
                refresh_token: refresh_token,
                client_id: process.env.NEXT_PUBLIC_AUTH_VK_ID || "",
                device_id: device_id,
                state: state,
            }),
        });
        
        if(res.ok) {
            // return NextResponse.json({ success: true })
        } else {
            // return NextResponse.json({ error: 'Refresh token failed' }, { status: 500 });
        }



        // if(!decodedRefreshToken) {
    }

    catch(error) {
        console.error('Refresh token error:', error);
        return NextResponse.json({ error: 'Refresh token failed' }, { status: 500 });
    }
}