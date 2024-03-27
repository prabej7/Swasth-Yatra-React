import React, { useEffect, useState } from "react";
import User from "../../User";
import url from "../../url";
import axios, { AxiosResponse } from "axios";
const useGetAll = () =>{
    const [data, setData] = useState<User[]>([]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/allAdmin`).then((response:AxiosResponse)=>{
            const { data,status } = response;
            setData(data);
        });
    });
    return(
        data
    )
}

export default useGetAll;