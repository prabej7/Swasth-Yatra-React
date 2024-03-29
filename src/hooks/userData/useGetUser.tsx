import { useEffect, useState } from "react"
import User from "../../User"
import axios, { AxiosResponse } from "axios";
import url from "../../url";
import { useAppDispatch } from "../../States/hooks";
import { setMainData } from "../../States/Slices/UserData/getUserData";
export default function useGetUser(_id: string){
    const [userData, setUserData] = useState<User>();
    const dispatch = useAppDispatch();
    useEffect(()=>{
        let data = {
            _id: _id
        }
        axios.post(`${url}getUser`,data).then((response:AxiosResponse)=>{
            dispatch(setMainData(response.data));
            setUserData(response.data);
        }).catch((err)=>{
            console.log('Erro');
        })
    },[_id]);

    return userData
    
}

