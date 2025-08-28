"use client";

import { useEffect, useRef } from "react";

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

export default function VKIDWrapper() {
  const vkContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("VKIDWrapper mounted");

    const loadVKIDSDK = () => {
      console.log("Loading VKID SDK...");
      if (typeof window !== "undefined" && !("VKIDSDK" in window)) {
        // SDK not loaded yet, load it first
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js";
        script.async = true;
        script.onload = () => {
          console.log("VKID SDK loaded");
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

    const vkidOnError = (error: unknown) => {
      console.error("VK ID Error:", error);
    };

    const vkidOnSuccess = (data: VKAuthResult) => {
      console.log('VK Auth Success:', data);
      
      if (data.access_token) {
        console.log('Got VK access token:', data.access_token);
        
        // Set the access token to trigger the RTK Query
        // setAccessToken(data.access_token);
        
        // Store the token in localStorage for persistence
        // localStorage.setItem('vkToken', data.access_token);
        
        // Optionally redirect after successful authentication
        // setTimeout(() => {
        //   window.location.href = "/user";
        // }, 1000);
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
          redirectUrl: 'http://localhost/user',
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
            console.log(data);
            VKID.Auth.userInfo(data.access_token)
              .then((userInfo) => {
                console.log(userInfo);
                window.location.href = "/user";
              })
              // .catch(vkidOnError);
            // Обработка полученного результата
          }
        
          function vkidOnError(error) {
            // Обработка ошибки
          }
        
        
          // .on(VKID.WidgetEvents.ERROR, vkidOnError)
          // .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload: VKLoginPayload) {
          //   const code = payload.code;
          //   const deviceId = payload.device_id;

          //   console.log('VK ID Success - Code received:', code);
          //   console.log('Device ID:', deviceId);

          //   VKID.Auth.exchangeCode(code, deviceId)
          //     .then(vkidOnSuccess)
          //     .catch(vkidOnError);
          // });
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
