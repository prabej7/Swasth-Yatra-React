import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react"
import url from "../../url";
import { useAppDispatch } from "../../States/hooks";
import { setMainData } from "../../States/Slices/UserData/getUserData";
function useLocation(_id: string) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (navigator) {
            navigator.geolocation.watchPosition((position) => {
                let data = {
                    _id: _id,
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                axios.post(`${url}updatePostion`, data).then((response: AxiosResponse) => {
                    dispatch(setMainData(response.data));
                }).then(err => {
                    console.log(err);
                })
            }, () => {

            })
        }

    })
    return ""
}

export default useLocation