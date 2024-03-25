import React, { ChangeEvent, FormEvent, useState } from "react";
import { io } from "socket.io-client";
import url from "../url";
import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../States/hooks";
import { setUserData } from "../States/Slices/UserData";
const socket = io(`${url}`);
interface User {
    username: string,
    password: string
}

interface Msg{
    text: string,
    color?: string
}

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const [msg, setMsg] = useState<Msg>({
        text:'',
        color:''
    });
    const [cookie, setCookie] = useCookies(['user']);
    const navigate = useNavigate();
    const [userData, setUser] = useState<User>({
        username: '',
        password: ''
    });
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const response: AxiosResponse = await axios.post(`${url}login`, userData);
            const { status, data } = response;
            if(status==201){
                setMsg({
                    text:'Incorrect password',
                    color:'crimson'
                });
            }else if(status==200){
                setMsg({
                    text:'Logging in...',
                    color:'green'
                });
                setCookie('user',data,{path:'/'});
                let dataToBeSent ={
                    username: data.username,
                    email: data.email,
                    _id: data._id
                }
                dispatch(setUserData(dataToBeSent));
                navigate('/admin');
            }
        } catch (err) {
            setMsg({
                text:'User not found!',
                color:'crimson'
            });
        }

        // if(status==200){
        //     setCookie('user',data,{path:'/'});
        //     navigate('/admin');
        // }
        // setUserData({
        //     username:'',
        //     password:''
        // });
    }
    return (
        <div className="register">
            <form onSubmit={handleSubmit} className="flex flex-col w-56 gap-5">
                <p style={{color:msg.color}}>{msg.text}</p>
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
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;