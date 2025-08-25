import NextAuth from "next-auth";
import Yandex from "next-auth/providers/yandex";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Yandex({
      clientId: process.env.AUTH_YANDEX_ID,
      clientSecret: process.env.AUTH_YANDEX_SECRET,
      authorization: {
        url: "https://oauth.yandex.ru/authorize",
        params: {
          scope: "login:email",
          response_type: "code",
          redirect_uri:
            "https://tutors-brown.vercel.app/api/auth/callback/yandex",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    redirect: async ({ baseUrl }) => {
      return `${baseUrl}/user`;
    },
  },
  // debug: true,
  // logger: {
  //   error(error) {
  //     console.error("AUTH ERROR", error);
  //     // Log the cause to see what's actually failing
  //     if (error.cause) {
  //       console.error("AUTH ERROR CAUSE:", error.cause);
  //     }
  //   },
  //   debug(code, meta) {
  //     console.log("AUTH DEBUG", code, meta);
  //   },

  //   warn(code) {
  //     console.warn("AUTH WARN", code);
  //   },
  // },
});
