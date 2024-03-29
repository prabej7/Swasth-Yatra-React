import { configureStore } from "@reduxjs/toolkit";
import UserData from "./Slices/UserData";
import getUserData from "./Slices/UserData/getUserData";
export const store = configureStore({
    reducer:{
       UserData:UserData ,
       getUserData: getUserData
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch