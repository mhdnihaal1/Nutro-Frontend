import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import agentSlice from "./slices/agentSlice";
import adminSlice from './slices/adminSlice'

const store = configureStore({
    reducer: {
        auth: authSlice, 
        agentAuth: agentSlice,
        adminAuth:adminSlice,

    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;