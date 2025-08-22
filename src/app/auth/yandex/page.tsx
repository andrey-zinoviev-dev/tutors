'use client';

import { useEffect } from "react";

// Define the type for YaSendSuggestToken
// interface YandexSDK {
//   YaSendSuggestToken: (domain: string, options: { flag: boolean }) => void;
// }

// Extend Window interface to include Yandex SDK
declare global {
  interface Window {
    YaSendSuggestToken: (domain: string, options: { flag: boolean }) => void;
  }
}

export default function YandexAuthPage() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'YaSendSuggestToken' in window) {
            
            // Call YaSendSuggestToken with proper typing
            window.YaSendSuggestToken(
                'https://tutors-brown.vercel.app', // Your domain
                {
                    flag: true
                }
            );
        }
    }, []);
    
    return <div>YandexAuthPage</div>
}