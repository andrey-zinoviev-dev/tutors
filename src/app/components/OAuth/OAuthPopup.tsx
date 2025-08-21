'use client';

import { useState, useEffect, useRef } from "react";
import styles from './page.module.css';
import Input from "../Input/Input";
import Form from "../Form/Form";
import SubmitButton from "../SubmitButton/SubmitButton";

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
  render: (options: { container: HTMLElement; showAlternativeLogin: boolean }) => VKIDOneTap;
  on: (event: string, callback: (data: unknown) => void) => VKIDOneTap;
}

export default function OAuthPopup() {
  //test variable
  let isVKInitialized = false;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const vkContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  }

  // const handleVKLogin = () => {
  //   console.log('VK Login');
  // }

  // const handleMailruLogin = () => {
  //   console.log('Mailru Login');
  // }

  useEffect(() => {
    // VK ID SDK is already loaded globally
    // Just initialize it when component mounts
    // if (!isVKInitialized) {
    //   initializeVKID();
    // }
    const loadVKIDSDK = () => {
      if (typeof window !== 'undefined' && !('VKIDSDK' in window)) {
        
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
        script.async = true;
        script.onload = () => {
          initializeVKID();
        };
        // script.onerror = (error) => {
        //   console.error('❌ Failed to load VK ID SDK:', error);
        // };
        
        document.head.appendChild(script);
      } else {
        initializeVKID();
      }
    };

    loadVKIDSDK();
  }, []);

  const initializeVKID = () => {
    // Check if VK ID SDK is available (loaded globally)
    if (typeof window !== 'undefined' && 'VKIDSDK' in window) {
      const VKID = (window as Window & { VKIDSDK: VKIDSDK }).VKIDSDK;

      VKID.Config.init({
        app: 54063777,
        redirectUrl: 'https://tutors-52is.vercel.app/user',
        responseMode: 'callback',
        source: 'lowcode',
        scope: 'email',
      });

      if (vkContainerRef.current) {
        const oneTap = new VKID.OneTap();

        oneTap.render({
          container: vkContainerRef.current,
          showAlternativeLogin: true
        })
        .on(VKID.WidgetEvents.ERROR, vkidOnError)
        .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, vkidOnSuccess);
      }
      isVKInitialized = true;
    } 
    // else {
    //   // SDK not loaded yet, wait a bit and try again
    //   setTimeout(initializeVKID, 100);
    // }
  };

  const vkidOnSuccess = (data: unknown) => {
    console.log('VK ID Success:', data);
    // Handle successful authentication
    window.location.href = '/user';
  };

  const vkidOnError = (error: unknown) => {
    console.error('VK ID Error:', error);
  };

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
        {/* VK ID Widget Container */}
        <div ref={vkContainerRef}>
          {/* VK ID will render here */}
        </div>

        {/* Alternative Login Methods */}
        {/* <div>
          <button
            onClick={handleVKLogin}
          >
            Войти через VK (Альтернативный)
          </button>

          <button
            onClick={handleMailruLogin}
          >
            Войти через Mail.ru
          </button>
        </div> */}

        <div>
          <p>
            Нажимая кнопку, вы принимаете условия использования
          </p>
        </div>
      </div>
  );
}