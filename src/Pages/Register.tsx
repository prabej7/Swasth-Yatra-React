import React, { ChangeEvent, FormEvent, useState } from "react";
import { io } from "socket.io-client";
import url from "../url";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const socket = io(`${url}`);
interface User{
    email: string,
    username: string,
    password: string
}

const Register: React.FC = () => {
    const [cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const [userData, setUserData] = useState<User>({
        username:'',
        email:'',
        password:''
    });
    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const { name,value } = e.target;
        setUserData(prev=>({
            ...prev,
            [name]:value
        }));
    }

    async function handleSubmit(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(userData);

        const response: AxiosResponse = await axios.post(`${url}register`,userData);
        const {status,data } = response;
        if(status==200){
            setCookie('user',data,{path:'/'});
            navigate('/account');
        }

        setUserData({
            username:'',
            email:'',
            password:''
        });
    }
    return (
        <div className="register">
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
            </form>
        </div>
    )
}

export default Register;