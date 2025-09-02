"use client";

import { setUser } from "@/lib/features/userSlice";
// import { useAppDispatch } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// import { handleVKAuth } from "@/app/actions/oauth";
import { useCreateSessionMutation } from "@/lib/features/apiSlice";

interface VKIDSDK {
  Config: {
    init: (config: VKIDConfig) => void;
    ResponseMode: {
      Callback: string;
    };
    Source: {
      LOWCODE: string;
    };
  };
  OneTap: new () => VKIDOneTap;
  WidgetEvents: {
    ERROR: string;
  };
  OneTapInternalEvents: {
    LOGIN_SUCCESS: string;
  };
  Auth: {
    exchangeCode: (code: string, deviceId: string) => Promise<VKAuthResult>;
    userInfo: (accessToken: string) => Promise<unknown>;
  };
}

interface VKIDConfig {
  app: number;
  redirectUrl: string;
  responseMode: string;
  source: string;
  scope: string;
}

interface VKIDOneTap {
  render: (options: {
    container: HTMLElement;
    showAlternativeLogin: boolean;
  }) => VKIDOneTap;
  on: (event: string, callback: (data: unknown) => void) => VKIDOneTap;
}

interface VKLoginPayload {
  code: string;
  device_id: string;
}

interface VKAuthResult {
  access_token: string;
  id_token: string;
  refresh_token: string;
  scope: string;
  state: string;
  user_id: number;
  token_type: string;
  expires_in: number;
}

interface VKUserInfo {
  user: {
    email: string;
    id: string;
    user_id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    birthday: string;
    sex: number;
    verified: boolean;
  },
}

export default function VKIDWrapper() {
  const vkContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [createSession] = useCreateSessionMutation();
  const router = useRouter();
  useEffect(() => {
    // console.log("VKIDWrapper mounted");

    const loadVKIDSDK = () => {
      // console.log("Loading VKID SDK...");
      if (typeof window !== "undefined" && !("VKIDSDK" in window)) {
        // SDK not loaded yet, load it first
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js";
        script.async = true;
        script.onload = () => {
          // console.log("VKID SDK loaded");
          initializeVKID();
        };
        script.onerror = (error) => {
          console.error("Failed to load VKID SDK:", error);
        };
        document.head.appendChild(script);
      } else {
        // SDK already loaded, initialize directly
        initializeVKID();
      }
    };

    const initializeVKID = () => {
      // console.log("Initializing VKID...");
      if (
        typeof window !== "undefined" &&
        "VKIDSDK" in window &&
        vkContainerRef.current
      ) {
        // console.log("VKID SDK found, initializing...");
        const VKID = (window as Window & { VKIDSDK: VKIDSDK }).VKIDSDK;

        // VKID.Config.init({
        //   app: parseInt(process.env.NEXT_PUBLIC_AUTH_VK_ID || "0"),
        //   redirectUrl: "https://tutors-brown.vercel.app/user",
        //   responseMode: "callback",
        //   source: "lowcode",
        //   scope: "email",
        // });

        VKID.Config.init({
          app: 54063777,
          redirectUrl: 'http://localhost/auth/vk',
          scope: 'email',
          responseMode: 'callback',
          source: 'lowcode',
        });

        const oneTap = new VKID.OneTap();
        oneTap
          .render({
            container: vkContainerRef.current,
            showAlternativeLogin: true,
          })
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload: unknown) {
            if (typeof payload === 'object' && payload !== null && 'code' in payload && 'device_id' in payload) {
            const code = payload.code as string;
            const deviceId = payload.device_id as string;

            VKID.Auth.exchangeCode(code, deviceId)
              .then(vkidOnSuccess)
              .catch(vkidOnError);
            }
          });
        
          function vkidOnSuccess(data: VKAuthResult) {
            // console.log(data);
            VKID.Auth.userInfo(data.access_token)
              .then((userInfo) => {
                const userData = userInfo as VKUserInfo;
                const unifiedUser = {
                  id: userData.user.user_id?.toString() || '',
                  email: userData.user.email || '',
                  first_name: userData.user.first_name || '',
                  last_name: userData.user.last_name || '',
                  provider: 'vk' as string,
                  // access_token: data.access_token || '',
                  // refresh_token: data.refresh_token || '',
              };
              
              // console.log('Unified VK user data:', unifiedUser);
              // dispatch(setUser(unifiedUser));
              createSession({user: unifiedUser, tokens: {access_token: data.access_token, expires_in: data.expires_in, refresh_token: data.refresh_token}})
              .unwrap()
              .then((res) => {
                // console.log(res);
                // router.push("/user");
              })
              .catch((err) => {
                console.log(err);
              });
              // handleVKAuth({id: unifiedUser.id, provider: unifiedUser.provider});
                // dispatch(setUser(userData.user));
                // router.push("/user");
              })
              // .catch(vkidOnError);
            // Обработка полученного результата
          }
        
          function vkidOnError(error: unknown) {
            // Обработка ошибки
          }
      } else {
        console.log("VKID SDK not found or container not ready");
      }
    };

    loadVKIDSDK();

    // return () => {
    //   if (vkContainerRef.current) {
    //     window.VKIDSDK.destroy();
    //   }
    // };
  }, []);

  return <div ref={vkContainerRef}></div>;
}
