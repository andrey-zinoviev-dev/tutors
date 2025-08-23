import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (builder) => ({
        getYandexAuthToken: builder.mutation<{ access_token: string }, { code: string }>({
            query: ({ code }) => ({
                url: 'https://oauth.yandex.ru',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${btoa(`${process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID}:${process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET}`)}`,
                },
                method: 'POST',
                body: { code },
            }),
        }),
    }),
});

export const { useGetYandexAuthTokenMutation } = apiSlice;
