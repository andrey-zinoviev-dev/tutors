"use client";

import { useEffect, useRef, useState } from "react";
import { useGetYandexAuthTokenQuery } from "../../lib/features/apiSlice";
import { setUser } from "@/lib/features/userSlice";
// import { useAppDispatch } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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

interface YaUserInfo {
  default_email: string;
  id: string;
  client_id: number;
  login: string;
  psuid: string;
}

export default function YandexIDWrapper() {
    const yandexIDContainerRef = useRef<HTMLDivElement | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { data: userInfo, isLoading, error } = useGetYandexAuthTokenQuery({code: accessToken || ""}, {
        skip: !accessToken, // This prevents the query from running until accessToken exists
    });
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js";
        script.async = true;
        script.onload = () => {
            // console.log("YandexIDWrapper mounted");
            
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
                 .then((data: YaAuthData) => {
                  // console.log(data);
                  const { access_token } = data;
                  setAccessToken(access_token);
                 })
                 .catch((error: Error) => console.log('Обработка ошибки', error));
            }
        };
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (userInfo) {
          const userData = userInfo as unknown as YaUserInfo;

          const unifiedUser = {
            id: userData.id || '',
            email: userData.default_email || '',
            first_name: userData.login || '', // Use login as first name
            last_name: '', // Yandex doesn't provide last name
            provider: 'yandex' as const,
        };
        
        // console.log('Unified Yandex user data:', unifiedUser);
        dispatch(setUser(unifiedUser));
        router.push("/user");
        }
    }, [userInfo]);

    return (
        <div id="yandex-id-container" ref={yandexIDContainerRef}>
            {/* Button will be rendered here by Yandex SDK */}
        </div>
    );
}