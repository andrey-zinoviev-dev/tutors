import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getYandexAuthToken: builder.query<{ access_token: string }, { code: string }>({
            query: ({ code }) => ({
                url: 'https://login.yandex.ru/info?',
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `OAuth ${code}`
                },
                method: 'GET',
                // body: { code },
            }),
        }),
        getVKAuthToken: builder.query<{ access_token: string }, { code: string }>({
            query: ({ code }) => ({
                url: 'https://id.vk.com/oauth2/user_info',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `OAuth ${code}`
                },
            }),
        }),
        createSession: builder.mutation<{ success: boolean }, { user: { id: string, provider: string }, tokens: { access_token: string, expires_in: number, refresh_token: string } }>({
            query: ({ user, tokens }) => ({
                url: '/api/auth/session',
                method: 'POST',
                body: { user, tokens },
            }),
        }), 
        decodeSession: builder.query<{id: string, provider: string}, void>({
            query: () => ({
                url: '/api/auth/session',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetYandexAuthTokenQuery, useCreateSessionMutation, useDecodeSessionQuery } = apiSlice;
