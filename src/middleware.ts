// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { decrypt } from "./lib/sessions/sessions";

export default async function middleware() {}

//     // const accessToken = request.cookies.get("accessTokenCookie")?.value;
//     const expiresIn = request.cookies.get("expiresInCookie")?.value;
//     const tenMinutes = 10 * 60 * 1000;
//     // console.log(expiresIn);
//     const refreshToken = request.cookies.get("refreshTokenCookie")?.value;

//     if(!expiresIn || !refreshToken) {
//         console.log('middleware expiresIn or refreshToken is invalid');
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     // //decoded tokens
//     // const decodedAccessToken = await decrypt(accessToken);
//     // // console.log(decodedAccessToken);
//     const { expires_at } = await decrypt(expiresIn) as {expires_at: number};
//     const { refresh_token } = await decrypt(refreshToken) as { refresh_token: string };
//     // console.log('middleware decodedExpiresIn', decodedExpiresIn);

//     //check if expiresIn is valid
//     const now = Date.now();
    
//     if(now > expires_at - tenMinutes) {
//         console.log('middleware expires_at is invalid');
//         const res = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
//             method: "POST",
//             headers: {
//               // Пробрасываем все куки как есть
//               Cookie: request.headers.get("cookie") || "",
//             },
//           });

//         if(res.ok) {
//             console.log(res.json());
//             // return NextResponse.next();
//         } else {
//             console.log('error');
//             console.log(res.json());
//             // return NextResponse.redirect(new URL('/login', request.url));
//         }
//         // return NextResponse.redirect(new URL('/login', request.url));
//     } else {
//         console.log('middleware expires_at is valid');
//     }
    
//     return NextResponse.next();

    

// }

// export const config = {
//     matcher: [
//         /*
//          * Match all request paths except for the ones starting with:
//          * - / (root)
//          * - /login
//          * - /api/auth
//          * - /_next/static (static files)
//          * - /_next/image (image optimization files)
//          * - /favicon.ico (favicon file)
//          */
//         '/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)',
//     ],
// };