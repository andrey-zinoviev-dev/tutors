'use client';

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Extend Window interface to include Yandex SDK
// declare global {
//   interface Window {
//     YaSendSuggestToken: (domain: string, options: { flag: boolean }) => void;
//   }
// }

function GetYandexCode() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    return <div>{code}</div>;
};

export default function YandexAuthPage() {



    
    // const [isSDKLoaded, setIsSDKLoaded] = useState(false);
    
    // useEffect(() => {
    //     const loadYandexSDK = () => {
    //         if (typeof window !== 'undefined' && !('YaSendSuggestToken' in window)) {
    //             const script = document.createElement('script');
    //             script.src = 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js';
    //             script.async = true;
    //             script.onload = () => {
    //                 console.log('Yandex SDK loaded successfully');
    //                 setIsSDKLoaded(true);
                    
    //                 // Call YaSendSuggestToken after SDK is loaded
    //                 if (window.YaSendSuggestToken) {
    //                     window.YaSendSuggestToken(
    //                         'https://tutors-brown.vercel.app',
    //                         { flag: true }
    //                     );
    //                 }
    //             };
    //             script.onerror = (error) => {
    //                 console.error('Failed to load Yandex SDK:', error);
    //             };
                
    //             document.head.appendChild(script);
    //         } else {
    //             // SDK already available
    //             setIsSDKLoaded(true);
    //             if (window.YaSendSuggestToken) {
    //                 window.YaSendSuggestToken(
    //                     'https://tutors-brown.vercel.app',
    //                     { flag: true }
    //                 );
    //             }
    //         }
    //     };
        
    //     loadYandexSDK();
    // }, []);
    
    return (
            <div>
                <h1>Yandex Auth Page</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <GetYandexCode />
                </Suspense>

                {/* {isSDKLoaded ? 'Processing Yandex authentication...' : 'Loading Yandex SDK...'} */}
            </div>
    );
}