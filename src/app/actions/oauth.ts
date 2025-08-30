'use server'

import { createSession } from "@/lib/sessions/sessions"
import { redirect } from "next/navigation"

export async function handleVKAuth({id, provider}: {id: string, provider: string}) {
    console.log('handleVKAuth', id, provider)
    // 1. Exchange code for access token
    // 2. Get user data from VK
    // 3. Find or create user in your DB
    // 4. Create session
    // await createSession({ id, provider })
    // // 5. Redirect
    // redirect('/user')
}

export async function handleYandexAuth(code: string) {
    // Same flow for Yandex
    // ...
}