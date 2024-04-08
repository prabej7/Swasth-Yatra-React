import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import url from "../url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Mobile from "./Components/Mobile";
const socket = io(`${url}`);

interface User {
    email: string,
    username: string,
    password: string,
    lat?: number,
    long?: number
}

const Register: React.FC = () => {
    const notify = (text:string) => toast.error(text);
    const [cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const [postion, setPosition] = useState({
        lat: 0,
        lon: 0
    });
    const [userData, setUserData] = useState<User>({
        username: '',
        email: '',
        password: '',
        long: 0,
        lat: 0
    });

    useEffect(() => {
        if (navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            }, (err) => {

            })
        }
    }, []);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value,
            lat: postion.lat,
            long: postion.lon
        }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(userData);

        const response: AxiosResponse = await axios.post(`${url}register`, userData);
        const { status, data } = response;
        if (status == 200) {
            setCookie('user', data, { path: '/' });
            navigate('/account-type');
        } else if (status == 201) {
            notify('User already exists.');
        }

        setUserData({
            username: '',
            email: '',
            password: '',
            lat: 0,
            long: 0
        });
    }
    return (
        <div className="register">
            <Mobile>
                <h1 className="font-bold text-2xl mb-5">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-56 gap-5">
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        onChange={handleChange}
                        value={userData.email}
                    />
                    <input
                        type="text"
                        name="username"
                        className="input "
                        placeholder="Username"
                        onChange={handleChange}
                        value={userData.username}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <button className="btn" type="submit">Register</button>
                    <p className=" text-xs" >Already have an account ?<Link to='/login' > Login</Link></p>
                </form>
            </Mobile>
            <ToastContainer />
        </div>
    )
}

export default Register;