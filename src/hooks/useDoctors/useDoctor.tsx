import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import url from "../../url";

function useDoctor(_id: string){
    useEffect(()=>{
        let data = {
            _id: _id
        };
        axios.post('http://localhost:5000/getUser',data)
    })
    return ""
}

export default useDoctor;