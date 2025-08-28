import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { apiSlice } from "./features/apiSlice";

export function createStore() {
    return configureStore({
        reducer: {
            user: userReducer,
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
    });
}

export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];