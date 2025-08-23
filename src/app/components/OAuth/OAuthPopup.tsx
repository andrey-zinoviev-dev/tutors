'use client';

import { useState, useEffect, useRef } from "react";
import styles from './page.module.css';
import Input from "../Input/Input";
import Form from "../Form/Form";
import SubmitButton from "../SubmitButton/SubmitButton";

// interface VKIDSDK {
//   Config: {
//     init: (config: VKIDConfig) => void;
//     ResponseMode: {
//       Callback: string;
//     };
//     Source: {
//       LOWCODE: string;
//     };
//   };
//   OneTap: new () => VKIDOneTap;
//   WidgetEvents: {
//     ERROR: string;
//   };
//   OneTapInternalEvents: {
//     LOGIN_SUCCESS: string;
//   };
// }

// interface VKIDConfig {
//   app: number;
//   redirectUrl: string;
//   responseMode: string;
//   source: string;
//   scope: string;
// }

// interface VKIDOneTap {
//   render: (options: { container: HTMLElement; showAlternativeLogin: boolean }) => VKIDOneTap;
//   on: (event: string, callback: (data: unknown) => void) => VKIDOneTap;
// }

// // Yandex ID interfaces
// interface YaAuthSuggest {
//   init: (oauthQueryParams: YandexOAuthParams, tokenPageOrigin: string, options: YandexWidgetOptions) => Promise<YandexAuthResult>;
// }

// interface YandexOAuthParams {
//   client_id: string;
//   response_type: 'token' | 'code';
//   redirect_uri: string;
//   scope: string;
//   state?: string;
// }

// interface YandexWidgetOptions {
//   view: 'button';
//   parentId: string;
//   buttonSize: 's' | 'm' | 'l';
//   buttonView: 'main' | 'secondary';
//   buttonTheme: 'light' | 'dark';
//   buttonBorderRadius: string;
//   buttonIcon: 'ya' | 'none';
// }

// interface YandexAuthResult {
//   handler: () => Promise<YandexAuthData>;
// }

// interface YandexAuthData {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
//   state?: string;
//   user_id?: string;
//   email?: string;
//   real_name?: string;
//   display_name?: string;
//   avatar?: string;
// }

export default function OAuthPopup() {
  //test variable
  let isVKInitialized = false;
  let isYandexInitialized = false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const vkContainerRef = useRef<HTMLDivElement>(null);
  const yandexContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  }

  // const handleVKLogin = () => {
  //   console.log('VK Login');
  //   const clientId = process.env.NEXT_PUBLIC_VK_CLIENT_ID;
  //   const redirectUri = process.env.NEXT_PUBLIC_VK_REDIRECT_URI || '';
  //   const state = process.env.NEXT_PUBLIC_VK_STATE || '';
  //   const oauthUrl = `https://oauth.vk.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email&response_type=code&state=${state}`;
    
  //   console.log('Redirecting to Yandex OAuth:', oauthUrl);
  //   window.location.href = oauthUrl;
  // }

  const handleYandexLogin = () => {
    console.log('Yandex Login');
    // const clientId = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID;
    // const redirectUri = process.env.NEXT_PUBLIC_YANDEX_REDIRECT_URI || 'http://localhost:3000/auth/yandex';
    // const state = process.env.NEXT_PUBLIC_YANDEX_STATE || '';
    // const oauthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&scope=login:email&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
  
    // console.log('Redirecting to Yandex OAuth:', oauthUrl);
    // window.location.href = oauthUrl;
  }

  // const handleMailruLogin = () => {
  //   console.log('Mailru Login');
  // }

  // useEffect(() => {
  //   // VK ID SDK is already loaded globally
  //   // Just initialize it when component mounts
  //   // if (!isVKInitialized) {
  //   //   initializeVKID();
  //   // }
  //   const loadVKIDSDK = () => {
  //     if (typeof window !== 'undefined' && !('VKIDSDK' in window)) {
        
  //       const script = document.createElement('script');
  //       script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
  //       script.async = true;
  //       script.onload = () => {
  //         initializeVKID();
  //       };
  //       // script.onerror = (error) => {
  //       //   console.error('❌ Failed to load VK ID SDK:', error);
  //       // };
        
  //       document.head.appendChild(script);
  //     } else {
  //       initializeVKID();
  //     }
  //   };

  //   const loadYandexIDSDK = () => {
  //     if (typeof window !== 'undefined' && !('YaAuthSuggest' in window)) {
  //       const script = document.createElement('script');
  //       script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js';
        
  //       script.async = true;
  //       document.head.appendChild(script);
  //       script.onload = () => {
  //         initializeYandexID();
  //       };
  //     };
  //   };

  //   loadVKIDSDK();
  //   loadYandexIDSDK();
  // }, []);

  // const initializeVKID = () => {
  //   // Check if VK ID SDK is available (loaded globally)
  //   if (typeof window !== 'undefined' && 'VKIDSDK' in window) {
  //     const VKID = (window as Window & { VKIDSDK: VKIDSDK }).VKIDSDK;

  //     VKID.Config.init({
  //       app: 54063777,
  //       redirectUrl: 'https://tutors-brown.vercel.app/user',
  //       responseMode: 'callback',
  //       source: 'lowcode',
  //       scope: 'email',
  //     });

  //     if (vkContainerRef.current) {
  //       const oneTap = new VKID.OneTap();

  //       oneTap.render({
  //         container: vkContainerRef.current,
  //         showAlternativeLogin: true
  //       })
  //       .on(VKID.WidgetEvents.ERROR, vkidOnError)
  //       .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, vkidOnSuccess);
  //     }
  //     isVKInitialized = true;
  //   } 
  //   // else {
  //   //   // SDK not loaded yet, wait a bit and try again
  //   //   setTimeout(initializeVKID, 100);
  //   // }
  // };

  // const vkidOnSuccess = (data: unknown) => {
  //   console.log('VK ID Success:', data);
  //   // Handle successful authentication
  //   window.location.href = '/user';
  // };

  // const vkidOnError = (error: unknown) => {
  //   console.error('VK ID Error:', error);
  // };

  // const initializeYandexID = () => {
  //   if (typeof window !== 'undefined' && 'YaAuthSuggest' in window && yandexContainerRef.current) {
  //     const YaAuthSuggest = (window as Window & { YaAuthSuggest: YaAuthSuggest }).YaAuthSuggest;
  //     // OAuth query parameters
  //     const oauthQueryParams: YandexOAuthParams = {
  //       client_id: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID || '', // Replace with your actual Yandex client ID
  //       response_type: 'token',
  //       redirect_uri: 'https://tutors-brown.vercel.app/auth/yandex',
  //       scope: 'login:email'
  //     };

  //     // Token page origin (your app's domain)
  //     // const tokenPageOrigin = 'https://tutors-brown.vercel.app';
  //     const tokenPageOrigin = 'https://tutors-brown.vercel.app';

  //     // Widget options
  //     const widgetOptions: YandexWidgetOptions = {
  //       view: "button",
  //       parentId: yandexContainerRef.current.id,
  //       buttonSize: 'm',
  //       buttonView: 'main',
  //       buttonTheme: 'light',
  //       buttonBorderRadius: "0",
  //       buttonIcon: 'ya',
  //     };

  //     // Initialize Yandex ID widget
  //     YaAuthSuggest.init(oauthQueryParams, tokenPageOrigin, widgetOptions)
  //       .then(({handler}) => {
  //         console.log('Yandex ID widget initialized successfully');
  //         // Store the handler for later use if needed
  //         return handler();
  //       })
  //       .then(data => {
  //         console.log('Yandex ID Success - Token received:', data);
  //         yandexOnSuccess(data);
  //       })
  //       .catch(error => {
  //         console.log('Yandex ID Error:', error);
  //         yandexOnError(error);
  //       });
      
  //     isYandexInitialized = true;
  //   }
  // };

  // const yandexOnSuccess = (data: YandexAuthData) => {
  //   console.log('Yandex ID Success:', data);
  //   // Handle successful authentication
  //   // You can access the access token from data.access_token
  //   if (data.access_token) {
  //     // Store the token or send it to your backend
  //     console.log('Access token:', data.access_token);
  //   }
  //   window.location.href = '/user';
  // };

  // const yandexOnError = (error: unknown) => {
  //   console.error('Yandex ID Error:', error);
  // };

  return (
      <div className={styles.oauthPopup}>
        <h2>
          Войти в аккаунт
        </h2>

        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <SubmitButton type="submit">Войти</SubmitButton>
        </Form>
        <div className={styles.or}>
          <span className={styles.orText}>или</span>
        </div>
        <div>
          <button onClick={handleYandexLogin}>Yandex</button>
        </div>
        {/* <div ref={vkContainerRef}>
        </div> */}
        {/* <div 
            ref={yandexContainerRef} 
            id="yandexButtonContainer"
            className={styles.oauthProvider}
          >
          </div> */}

        {/* <div>
          <p>
            Нажимая кнопку, вы принимаете условия использования
          </p>
        </div> */}
      </div>
  );
}