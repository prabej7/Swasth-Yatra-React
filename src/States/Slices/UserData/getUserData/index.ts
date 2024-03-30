import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import User from "../../../../User";

const initialState: User = {
    doctors: [],
    eSewaName: '',
    eSewaNo: '',
    email: '',
    fName: '',
    files: '',
    img: '',
    pan: '',
    password: '',
    reg: '',
    type: '',
    username: '',
    __v: 0,
    _id: '',
    lat: 0,
    lon: 0,
    patinets:[{
        date:'string',
        doctor:'',
        name:'',
        receipt:'',
        __v:0,
        _id:'',
    }],
    appointments:[]
}

const getUserData = createSlice({
    initialState,
    name: 'getUserData',
    reducers: {
        setMainData: (state, action: PayloadAction<User>) => {
            const { doctors, eSewaName, eSewaNo, email, fName, files, img, pan, password, reg, type, username, __v, _id, lat, lon,patinets, appointments } = action.payload;
            state.doctors = doctors;
            state.eSewaName = eSewaName;
            state.eSewaNo = eSewaNo;
            state.email = email;
            state.fName = fName;
            state.files = files;
            state.img = img;
            state.pan = pan;
            state.password = password;
            state.reg = reg;
            state.type = type;
            state.username = username;
            state.__v = __v;
            state._id = _id;
            state.lat = lat;
            state.lon = lon;
            state.patinets = patinets;
            state.appointments = appointments;
        }
    }
});

export const { setMainData } = getUserData.actions;

export default getUserData.reducer;