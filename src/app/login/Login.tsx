import { useState, useRef } from "react";
import styles from "./page.module.css";
// import Input from "../../components/Input/Input";
// import Form from "../../components/Form/Form";
// import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { signIn } from "@/auth";
import VKIDWrapper from "@/app/components/VKIDWrapper";
import YandexIDWrapper from "@/app/components/YandexIDWrapper";

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
  return (
    <div className={styles.oauthPopup}>
      <h2>Войти в аккаунт</h2>

      <YandexIDWrapper />
      <VKIDWrapper />
{/* 
      <form
        action={async () => {
          "use server";
          await signIn("yandex");
        }}
      >
        <button type="submit">Yandex</button>
      </form> */}

      {/* <VKIDWrapper /> */}

      {/* <form
        action={async () => {
          "use server";
          await signIn("vk");
        }}
      >
        <button type="submit">VK</button>
      </form> */}

      {/* <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <SubmitButton type="submit">Войти</SubmitButton>
        <div className={styles.or}>
          <span className={styles.orText}>или</span>
        </div>
        <div>
          <button onClick={handleYandexLogin}>Yandex</button>
        </div>
      </Form> */}

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
