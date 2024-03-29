import axios, { AxiosResponse } from "axios";
import url from "../../url";
import React, { useEffect } from "react";

const useAuth = (_id: string) =>{
    useEffect(()=>{
        let data = {
            _id: _id
        }
        axios.post(`${url}getUser`,data).then((response:AxiosResponse)=>{
            
        })
    })
    return ""
}

export default useAuth;