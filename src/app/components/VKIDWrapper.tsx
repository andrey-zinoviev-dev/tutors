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

    const initializeVKID = () => {
      console.log("Initializing VKID...");
      if (
        typeof window !== "undefined" &&
        "VKIDSDK" in window &&
        vkContainerRef.current
      ) {
        console.log("VKID SDK found, initializing...");
        const VKID = (window as Window & { VKIDSDK: VKIDSDK }).VKIDSDK;

        VKID.Config.init({
          app: parseInt(process.env.NEXT_PUBLIC_AUTH_VK_ID || "0"),
          redirectUrl: "https://tutors-brown.vercel.app//user",
          responseMode: "callback",
          source: "lowcode",
          scope: "email",
        });

        const oneTap = new VKID.OneTap();
        oneTap
          .render({
            container: vkContainerRef.current,
            showAlternativeLogin: true,
          })
          .on("error", (error: unknown) => console.error("VK ID Error:", error))
          .on("login_success", (data: unknown) => {
            console.log("VK ID Success:", data);
            window.location.href = "/user";
          });
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
