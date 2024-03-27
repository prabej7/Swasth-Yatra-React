import { useEffect, useState } from "react"
import User from "../../User"
import axios, { AxiosResponse } from "axios";
import url from "../../url";
export default function useGetUser(_id: string){
    const [userData, setUserData] = useState<User>();
    
    useEffect(()=>{
        let data = {
            _id: _id
        }
        axios.post(`${url}getUser`,data).then((response:AxiosResponse)=>{
            setUserData(response.data);
        }).catch((err)=>{
            console.log('Erro');
        })
    },[_id]);

    return userData
    
}

