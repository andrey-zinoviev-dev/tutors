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
        createSession: builder.mutation<{ success: boolean }, { id: string, provider: string }>({
            query: ({ id, provider }) => ({
                url: '/api/auth/session',
                method: 'POST',
                body: { id, provider },
            }),
        }), 
    }),
});

export const { useGetYandexAuthTokenQuery, useCreateSessionMutation } = apiSlice;
