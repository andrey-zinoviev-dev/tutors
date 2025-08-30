import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    user: {
        id: string;
        email: string;
        first_name: string;
        last_name: string;
        provider: 'vk' | 'yandex';
    } | null;
}

export type UnifiedUser = UserState['user'];

const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState['user']>) => {
            console.log(action.payload);
            state.user = action.payload;
            // return state;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;