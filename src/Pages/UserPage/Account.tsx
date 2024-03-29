import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../States/hooks";
import { setMainData } from "../../States/Slices/UserData/getUserData";
import Mobile from "../Components/Mobile";
import axios, { AxiosResponse } from "axios";
import url from "../../url";
import useGetUser from "../../hooks/userData/useGetUser";
import User from "../../User";
import Menu from "../Components/Menu";

interface Doctor {
    name: string,
    type: string,
    img: string,
    attend: string,
    _id: string
}

const Account: React.FC = () => {

    const dispatch = useAppDispatch();
    const MainUserData = useAppSelector((state) => {
        return state.getUserData;
    });
    const [cookie, setCookie, removeCookie] = useCookies(['user']);

    const navigate = useNavigate();
    useGetUser(cookie.user._id);
    useEffect(() => {
        if (cookie.user) {
            const { type } = cookie.user;
            if(type=='admin'){
                navigate('/admin');
            }else if(type=='main'){
                navigate('/main');
            }
        } else {
            navigate('/login');
        }

    })


    return (
        <div >
            {cookie.user && cookie.user.type === 'pending' ?
                <div className=" h-screen flex flex-col justify-center items-center">
                    <span className="loading loading-dots loading-lg"></span>
                    <h1>Your account is in requests.</h1>
                    <h1>It may take 24hrs. Please have patience.</h1>
                </div>
                :
                <Mobile>
                    <div className=" w-screen h-screen flex  items-center flex-col ">
                        <div className=" bg-base-200  text-left rounded h-20 w-72 pt-5 mt-16 flex pb-5 gap-5 mb-5 ">
                            <div className="avatar online w-10 h-10 ml-5">
                                <div className="  rounded-full">
                                    <img src={`/uploads/${MainUserData.img}`} />
                                </div>
                            </div>
                            <div className="user">
                                <h1>Hi, {MainUserData.username}</h1>
                                <h1 className="text-xs" >{MainUserData.email}</h1>
                            </div>
                        </div>
                        <div className="flex justify-center w-screen pr-10 overflow-y-auto overflow-x-hidden h-80">
                            {MainUserData !== undefined && MainUserData.doctors.length > 0 ?
                                <div className=" overflow-auto" >
                                    <h1 className="text-left mb-5 font-semibold mr-16">Your appointments : </h1>
                                    {MainUserData.doctors.map((doctor: Doctor, index: number) => {
                                        return <div key={doctor._id} className="flex flex-col gap-3 overflow-auto" >

                                            <div className="docs flex gap-5">
                                                <h1>{index + 1}. </h1>
                                                <div className="avatar w-20 h-20">
                                                    <div className="  rounded-full">
                                                        <img src={`/uploads/${doctor?.img}`} />
                                                    </div>
                                                </div>
                                                <div className=" text-left flex flex-col justify-center">
                                                    <h1 className=" text-sm" >{doctor.name}</h1>
                                                    <h1 className="text-xs" >{doctor.type}</h1>
                                                    <h1 className="text-xs" >{doctor.attend}</h1>
                                                </div>
                                            </div>

                                        </div>
                                    })}
                                </div>
                                :
                                <div>
                                    <h1 className=" opacity-75" >No appointments.</h1>
                                </div>
                            }

                        </div>
                        <Menu />
                    </div>

                </Mobile>
            }

        </div>
    )
}

export default Account;