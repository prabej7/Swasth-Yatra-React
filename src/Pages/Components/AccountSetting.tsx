import axios, { AxiosResponse } from "axios";
import url from "../../url";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useCookies } from "react-cookie";

interface User {
    username: string,
    email: string,
    eSewaName: string,
    eSewaNo: string
}

const AccountSetting = () => {
    const [cookie, setCookie] = useCookies(['user']);
    const [res, setRes] = useState<boolean>(false);
    const [userData, setData] = useState<User>({
        username: '',
        email: '',
        eSewaName: '',
        eSewaNo: ''
    });

    const [temp, setTemp] = useState<User>({
        username: '',
        email: '',
        eSewaName: '',
        eSewaNo: ''
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));

    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let dataTOBeSent = {
            original: cookie.user.username,
            username: userData.username,
            email: userData.email,
            eSewaName: userData.eSewaName,
            eSewaNo: userData.eSewaNo
        }
        const response: AxiosResponse = await axios.post(`${url}update`,dataTOBeSent);
        if(response.status==200){
            setRes(true);
        }
    }

    useEffect(() => {
        if (cookie.user) {
            axios.post(`${url}getUser`,cookie.user).then((response: AxiosResponse)=>{
                const { data,status } = response;
                setCookie('user',data,{path:'/'});
                setData(cookie.user);
            });
            
        }
    },[res]);
    return (
        <div className="" >
            <h1 className=' font-bold text-2xl'>Account Settings</h1>
            <form className=" mt-10 flex" onSubmit={handleSubmit}>
                <div className="la flex flex-col gap-8 mt-4">
                    <label>Email  </label>
                    <label>Username  </label>
                    <label>eSewa Name  </label>
                    <label>eSewa No.  </label>
                </div>
                <div className="fo flex flex-col gap-2 ml-10">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="input"
                        onChange={handleChange}
                        value={userData.email}
                        id="email"
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="input"
                        onChange={handleChange}
                        value={userData.username}
                        id="username"
                    />

                    <input
                        type="text"
                        name="eSewaName"
                        placeholder="eSewa Name"
                        className="input"
                        onChange={handleChange}
                        value={userData.eSewaName}
                        id="eSewaName"
                    />

                    <input
                        type="text"
                        name="eSewaNo"
                        placeholder="eSewa No."
                        className="input"
                        onChange={handleChange}
                        value={userData.eSewaNo}
                        id="eSewaNo"
                    />
                    <button className="btn bg-black text-white hover:bg-black " >Update</button>
                </div>
            </form>
        </div>
    )
}

export default AccountSetting;