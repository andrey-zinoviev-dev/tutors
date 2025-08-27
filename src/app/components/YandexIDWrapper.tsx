"use client";

import { useEffect, useRef } from "react";

interface YaAuthSuggest {
  init: (
    config: YaAuthConfig,
    origin: string,
    options: YaAuthOptions
  ) => Promise<YaAuthResult>;
}

interface YaAuthConfig {
  client_id: string;
  response_type: string;
  redirect_uri: string;
}

interface YaAuthOptions {
  view: string;
  parentId: string;
  buttonView: string;
  buttonTheme: string;
  buttonSize: string;
  buttonBorderRadius: number;
}

interface YaAuthResult {
  handler: () => Promise<YaAuthData>;
}

interface YaAuthData {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  picture?: string;
}

interface YaAuthWindow extends Window {
  YaAuthSuggest: YaAuthSuggest;
}

export default function YandexIDWrapper() {
    const yandexIDContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js";
        script.async = true;
        script.onload = () => {
            console.log("YandexIDWrapper mounted");
            
            if ('YaAuthSuggest' in window) {
                const YaAuthSuggest = (window as YaAuthWindow).YaAuthSuggest;
                
                YaAuthSuggest.init({
                    client_id: process.env.NEXT_PUBLIC_AUTH_YANDEX_ID || "",
                    response_type: 'token',
                    redirect_uri: 'http://localhost/suggest/token'
                }, 'http://localhost', {
                    view: 'button',
                    parentId: 'yandex-id-container',
                    buttonView: 'main',
                    buttonTheme: 'light',
                    buttonSize: 'm',
                    buttonBorderRadius: 0
                 })
                .then(({ handler }: YaAuthResult) => handler())
                 .then((data: YaAuthData) => console.log('Сообщение с токеном', data))
                 .catch((error: Error) => console.log('Обработка ошибки', error));
            }
        };
        document.head.appendChild(script);
    }, []);

    return (
        <div id="yandex-id-container" ref={yandexIDContainerRef}>
            {/* Button will be rendered here by Yandex SDK */}
        </div>
    );
}