import React, { useEffect, useState } from "react";
import Admin from "../Admin";
import url from "../../url";
import { useCookies } from "react-cookie";
import useGetUser from "../../hooks/userData/useGetUser";
import { useAppDispatch, useAppSelector } from "../../States/hooks";
import axios, { AxiosResponse } from "axios";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import { setMainData } from "../../States/Slices/UserData/getUserData";
const Table: React.FC = () => {
    const [cookie, setCookie] = useCookies(['user']);
    const [render, setRender] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useGetUser(cookie.user._id);
    const userData = useAppSelector((state) => {
        return state.getUserData;
    });
    useEffect(()=>{
        axios.post(`${url}getUser`,cookie.user).then((response :AxiosResponse)=>{
            dispatch(setMainData(response.data));
        })
    });

    function handleDelete(_id: string){
        
        let data = {
            _id:_id,
            hos: cookie.user._id
        }
        axios.post(`${url}deletePatient`,data).then((response:AxiosResponse)=>{
            console.log(response);
            setRender(true);
        });
        setRender(true);
    }
    return (
        <div className="">
            <h1 className=' font-bold text-2xl'>Dashboard</h1>
            <p className=' mt-10 font-semibold '>New Patients</p>

            <div className="overflow-x-auto relative right-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Phone No.</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Receipt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.patinets?.map((element,index:number) => {
                            return <tr>
                                <th>{index+1}</th>
                                <td>{element.name}</td>
                                <td>9812312345</td>
                                <td>{element.doctor}</td>
                                <td>{element.date}</td>
                                <td><a href={`/uploads/${element.receipt}`} download='' >Download</a></td>
                                <td><button className=' bg-crimsonRed text-white p-2 pl-3 pr-3' onClick={()=>handleDelete(element._id)} >Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default Table;