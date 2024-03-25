import { configureStore } from "@reduxjs/toolkit";
import UserData from "./Slices/UserData";
export const store = configureStore({
    reducer:{
       UserData:UserData 
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch