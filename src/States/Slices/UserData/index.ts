import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface initialStateSchema{
    username: string,
    _id: string,
    email: string
}

const initialState:initialStateSchema = {
    username:'',
    _id:'',
    email:''
};

export const userDataSlice = createSlice({
    name:'userData',
    initialState,
    reducers:{
        setUserData: (state, action:PayloadAction<initialStateSchema>)=>{
            const { username,email,_id } = action.payload;
            state.username = username;
            state.email = email;
            state._id = _id;
        }
    }
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;