import React, { ChangeEvent, useEffect, useState } from "react";
import url from "../../url";
import axios, { AxiosResponse } from "axios";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { MdOutlinePendingActions } from "react-icons/md";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
interface User {
    email: string,
    fName: string,
    files: string,
    pan: string,
    type: string,
    reg: string,
    _id: string
}

const MDash: React.FC = () => {
    const [cookie, setCookie,removeCookie] = useCookies(['user']);
    const [filter, setFilter] = useState<string>('admin');
    const navigate = useNavigate();
    const [user, setData] = useState<User[]>([{
        email: '',
        fName: '',
        files: '',
        pan: '',
        type: '',
        reg: '',
        _id: ''
    }]);
    
    useEffect(() => {
        axios.get(`${url}allUser`).then((response: AxiosResponse) => {
            setData(response.data);
        });
    });

    async function handleAction(value: string, _id: string) {
        let data = {
            action: value,
            _id: _id
        }
        const response: AxiosResponse = await axios.post(`${url}action`, data);
    }
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const { value } = e.target;
        if (value === 'All') {
            setFilter('admin');
        } else if (value === 'Pending') {
            setFilter('pending');
        }
    }
    return (
        <div>
            <h1 className=' font-bold text-2xl'>Dashboard</h1>
            <p className=' mt-10 font-semibold '>All Users</p>
            <div>
                <select className=" rounded w-28 mt-5 mb-2" onChange={handleChange} >
                    <option>All</option>
                    <option>Pending</option>
                </select>
            </div>
            <div className="overflow-x-auto relative right-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Registration</th>
                            <th>PAN</th>
                            <th>Email</th>
                            <th>File</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.filter((element) => {
                            if (filter === 'admin') {
                                return element.type !== 'user' && element.type!=='main'
                            } else {
                                return element.type === filter.toLocaleLowerCase();
                            }
                        })
                            .map((element, index) => {
                                return <tr key={element._id}>
                                    <td>{index + 1}</td>
                                    <td className=" w-40">{element.fName}</td>
                                    <td>{element.reg}</td>
                                    <td>{element.pan}</td>
                                    <td>{element.email}</td>
                                    <td><a href={`/uploads/${element.files}`} download="" >Download</a></td>
                                    <td>{element.type}</td>
                                    <td className="flex gap-2">
                                        {element.type !== 'admin' ?
                                            <div className="flex gap-2" >
                                                <button className=' bg-custom text-white p-2 pl-3 pr-3 font-light' onClick={() => handleAction('accept', element._id)} ><FaCheck /></button>
                                                <button className=' bg-crimsonRed text-white p-2 pl-3 pr-3' onClick={() => handleAction('reject', element._id)} ><RxCross1 /></button>
                                            </div>
                                            :
                                            <div className="flex gap-2">
                                                <button className=' bg-crimsonRed text-white p-2 pl-3 pr-3' onClick={() => handleAction('reject', element._id)} ><RxCross1 /></button>
                                                <button className=' bg-black text-white p-2 pl-3 pr-3' onClick={() => handleAction('pending', element._id)} ><MdOutlinePendingActions /></button>
                                            </div>
                                        }

                                    </td>
                                </tr>
                            })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MDash;