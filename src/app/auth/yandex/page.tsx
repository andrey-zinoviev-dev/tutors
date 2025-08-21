'use client';

import { useSearchParams } from "next/navigation";

export default function YandexAuthPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get('access_token');
    console.log(code);
    return <div>YandexAuthPage</div>;
}