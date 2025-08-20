'use client';

import { useState, useEffect, useRef } from "react";

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

  const handleVKLogin = () => {
    console.log('VK Login');
  }

  const handleMailruLogin = () => {
    console.log('Mailru Login');
  }

  useEffect(() => {
    // VK ID SDK is already loaded globally
    // Just initialize it when component mounts
    if (!isVKInitialized) {
      initializeVKID();
    }
  }, []);

  const initializeVKID = () => {
    // Check if VK ID SDK is available (loaded globally)
    if (typeof window !== 'undefined' && 'VKIDSDK' in window) {
      const VKID = (window as any).VKIDSDK;

      VKID.Config.init({
        app: 54063777,
        redirectUrl: 'https://tutors-52is.vercel.app/user',
        responseMode: VKID.ConfigResponseMode.Callback,
        source: VKID.ConfigSource.LOWCODE,
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

  const vkidOnSuccess = (data: any) => {
    console.log('VK ID Success:', data);
    // Handle successful authentication
    window.location.href = '/user';
  };

  const vkidOnError = (error: any) => {
    console.error('VK ID Error:', error);
  };

  return (
    <div>
      <div>
        <h2>
          Войти в аккаунт
        </h2>
        
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
    </div>
  );
}