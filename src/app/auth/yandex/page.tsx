'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function YandexToken() {
    const searchParams = useSearchParams();
    const code = searchParams.get('access_token');
    console.log(code);
    return <div>YandexToken</div>;
}

export default function YandexAuthPage() {
    return <Suspense fallback={<div>Loading...</div>}>
        <YandexToken />
    </Suspense>;
}