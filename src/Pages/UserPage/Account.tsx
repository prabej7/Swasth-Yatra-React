import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../States/hooks";
import UserData, { setUserData } from "../../States/Slices/UserData";
import Mobile from "../Components/Mobile";
import axios from "axios";
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
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const { username, email, _id } = useAppSelector((state) => {
        return state.UserData;
    });
    const dispatch = useAppDispatch();
    const userData = useGetUser(cookie.user._id);
    const navigate = useNavigate();
    useEffect(() => {
        if (!(cookie && cookie.user)) {
            navigate('/login');
        } else {
            dispatch(setUserData(cookie.user));
            let data = {
                _id: cookie.user._id,
            }
            axios.post(`${url}getUser`, data).then((response) => {
                setCookie('user', response.data, { path: '/' });
            })
            if (cookie.user && cookie.user.type === 'admin') {
                navigate('/admin');
            } else if (cookie.user.type === 'user') {
                navigate('/account');
            } else if (cookie.user.type === 'main') {
                navigate('/madmin');
            }
        }

    }, []);


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
                                    <img src={`/uploads/${userData?.img}`} />
                                </div>
                            </div>
                            <div className="user">
                                <h1>Hi, {userData?.username}</h1>
                                <h1 className="text-xs" >{userData?.email}</h1>
                            </div>

                        </div>
                        <div className="flex justify-center w-screen pr-10 overflow-y-auto overflow-x-hidden h-80">
                            {userData !== undefined && userData.doctors.length > 0 ?
                                <div className=" overflow-auto" >
                                    <h1 className="text-left mb-5 font-semibold mr-16">Your appointments : </h1>
                                    {userData.doctors.map((doctor: Doctor, index: number) => {
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