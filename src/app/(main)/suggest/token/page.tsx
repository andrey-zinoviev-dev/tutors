"use client";
import { useEffect } from "react";

interface YaSendSuggestToken {
  (origin: string, options: YaSendSuggestTokenOptions): Promise<YaSendSuggestTokenData>;
}

interface YaSendSuggestTokenOptions {
  flag: boolean;
}

interface YaSendSuggestTokenData {
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

interface YaSendSuggestTokenWindow extends Window {
  YaSendSuggestToken: YaSendSuggestToken;
}

export default function TokenPage() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js";
        script.async = true;
        script.onload = () => {
            if ('YaSendSuggestToken' in window) {
                const YaSendSuggestToken = (window as YaSendSuggestTokenWindow).YaSendSuggestToken;
                
                YaSendSuggestToken("http://localhost", {
                    flag: true,
                })
                 .then((data: YaSendSuggestTokenData) => console.log('Token message: ', data))
                 .catch((error: Error) => console.log('Error: ', error));
            }
        };
        document.head.appendChild(script);
    }, []);

    return <div>TokenPage</div>;
}