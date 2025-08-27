import NextAuth from "next-auth";
import Yandex from "next-auth/providers/yandex";

type VKIDProfile = {

  sub?: string

  id?: string | number

  user_id?: string | number

  email?: string

  first_name?: string

  last_name?: string

  name?: string

  picture?: string

  avatar?: string

}
// import Vk from "next-auth/providers/vk";

// const apiVersion = "5.126"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Yandex({
      clientId: process.env.AUTH_YANDEX_ID || "",
      clientSecret: process.env.AUTH_YANDEX_SECRET || "",
      authorization: {
        url: "https://oauth.yandex.ru/authorize",
        params: {
          scope: "login:email",
          response_type: "code",
          redirect_uri:
            "http://localhost/api/auth/callback/yandex",
        },
      },
    }),
    {
      id: "vk",
      name: "VK ID",
      type: "oauth",
      clientId: process.env.AUTH_VK_ID || "",
      clientSecret: process.env.AUTH_VK_SECRET || "",
      checks: ["pkce", "state"],
      token: {
        url: "https://id.vk.com/oauth2/token",
        // params: {
        //   grant_type: "authorization_code",
        // },
      },
      authorization: {
        url: "https://id.vk.com/authorize",
        params: {
          scope: "email",
          response_type: "code",
          redirect_uri:
            "http://localhost/api/auth/callback/vk",
          // grant_type: "authorization_code",
        },

      },
      client: { token_endpoint_auth_method: "client_secret_post" },
      userinfo: {

        // async request(ctx: any) {
    
        //   const tokens: any = ctx.tokens
    
        //   let claims: any
    
        //   if (tokens?.id_token) {
    
        //     try {
    
        //       const payload = tokens.id_token.split(".")
    
        //       claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"))
    
        //     } catch {}
    
        //   }
    
        //   return {
    
        //     sub: claims?.sub,
    
        //     email: claims?.email,
    
        //     name: claims?.name,
    
        //     first_name: claims?.given_name,
    
        //     last_name: claims?.family_name,
    
        //     picture: claims?.picture,
    
        //     user_id: tokens?.user_id, // если VK ID кладёт его в ответ токена
    
        //   } as VKIDProfile
    
        // },
    
      },
    },
    // Vk({
    //   clientId: process.env.AUTH_VK_ID || "",
    //   clientSecret: process.env.AUTH_VK_SECRET || "",
    //   checks: ["pkce"],
    //   // accessTokenUrl: `https://id.vk.com/access_token?v=${apiVersion}`,
    //   // requestTokenUrl: `https://id.vk.com/access_token?v=${apiVersion}`,
    //   authorization: {
    //     url: "https://id.vk.com/authorize",
    //     params: {
    //       scope: "email",
    //       response_type: "code",
    //       redirect_uri:
    //         "http://localhost/api/auth/callback/vk",
          
    //     },
    //   },

    // }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    redirect: async ({ baseUrl }) => {
      return `${baseUrl}/user`;
    },
  },
  debug: true,
  logger: {
    error(error) {
      console.error("AUTH ERROR", error);
      // Log the cause to see what's actually failing
      if (error.cause) {
        console.error("AUTH ERROR CAUSE:", error.cause);
      }
    },
    debug(code, meta) {
      console.log("AUTH DEBUG", code, meta);
    },

    warn(code) {
      console.warn("AUTH WARN", code);
    },
  },
});
