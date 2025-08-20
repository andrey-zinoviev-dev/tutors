import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

export function createStore() {
    return configureStore({
        reducer: {
            user: userReducer,
        },
    });
}

export type AppStore = ReturnType<typeof createStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];