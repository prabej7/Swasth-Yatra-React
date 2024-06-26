import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import url from "../../url";
import { InputFiles } from "typescript";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Doctor {
    name: string;
    type: string;
}

interface Doc {
    name: string;
    type: string;
    img: string;
    _id: string;
    __v: number;
    attend: string;
}

interface User {
    _id: string;
    email: string;
    username: string;
    password: string;
    __v: number;
    doctors: Doc[];
}

interface Msg {
    text: string;
    color?: string;
}

const AddDoctors = () => {
    const allSelect = useRef<HTMLInputElement>(null);
    const [doctors, setDoctors] = useState<User>({
        _id: '',
        email: '',
        username: '',
        password: '',
        __v: 0,
        doctors: [],
    });
    const fileRef = useRef<HTMLInputElement>(null);
    const [msg, setMsg] = useState<Msg>({
        text: '',
        color: ''
    });
    const notify = (text: string) => toast.error(text);
    const [cookie, setCookie] = useCookies(['user']);
    const [doctor, setDoctor] = useState<Doctor>({
        name: '',
        type: ''
    });
    const [file, setFile] = useState<File>();
    const btn = useRef<HTMLButtonElement>(null);
    const [selected, setSelected] = useState<string[]>([]);
    function handleHold() {
        if (btn.current) {
            btn.current.style.transform = 'scale(0.85)';
        }
    }

    function handleRelease() {
        if (btn.current) {
            btn.current.style.transform = 'scale(1)';
        }
    }

    async function handleClick(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', doctor.name);
        formData.append('type', doctor.type);
        formData.append('_id', cookie.user._id);
        if (file) {
            formData.append('file', file);
        }
        if (doctor.name !== "" && doctor.type !== "" && file) {
            const response = await axios.post(`${url}addDoctor`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setDoctor({
                name: '',
                type: ''
            });
            if (fileRef.current) {
                fileRef.current.value = '';
            }
        } else {
            notify('Please fillup all fields');
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setDoctor(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
        }
    }

    useEffect(() => {
        if (cookie.user) {
            axios.post(`${url}getUser`, cookie.user)
                .then((response: AxiosResponse) => {
                    const { data, status } = response;
                    setDoctors(data);
                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching user data:', error);
                });
        }
    });
    

    async function handleDelete(_id: string) {
        let data = {
            user: cookie.user._id,
            _id: _id
        }
        const response: AxiosResponse = await axios.post(`${url}delete`, data);
    }

    function handleSelect() {
        if (allSelect.current) {
            const checkboxes = document.querySelectorAll<HTMLInputElement>('.checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = allSelect.current!.checked;
            });
            doctors.doctors.forEach((element)=>{
                setSelected(prev=>([
                    ...prev,
                    element._id
                ]))
            })
        }
    }

    function handleSel(_id: string) {
        setSelected(prev => ([
            ...prev,
            _id
        ]));
        

    }

    async function handlePresence(_id : string){
        try{
            let data = {
                hospital: cookie.user._id,
                doctor_id: _id
            }
            const response = await axios.post(`${url}updateTime`,data);
            console.log(response);
        }catch(err){
            console.log(err);
        }finally{

        }
    }

    return (
        <div>
            <h1 className=' font-bold text-2xl'>Doctors</h1>
            <p className=' mt-10 font-semibold '>Add Doctors</p>
            <form className="flex flex-row gap-5 mt-5" onSubmit={handleClick}>
                <input
                    type="text"
                    name="name"
                    className="input rounded"
                    placeholder="Doctor's name"
                    onChange={handleChange}
                    value={doctor.name}
                />
                <input
                    type="text"
                    name="type"
                    className="input rounded"
                    placeholder="Specialization"
                    onChange={handleChange}
                    value={doctor.type}
                    
                />
                <input type="file" ref={fileRef} className="file-input rounded file-input-bordered w-full max-w-xs" onChange={handleInputChange} />
                <button ref={btn} onMouseUp={handleRelease} onMouseDown={handleHold} className="btn rounded bg-black text-white transform hover:bg-black">Add</button>
            </form>
            <div className="display relative right-4 top-5">
                <div className="overflow-x-auto ">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" onClick={handleSelect} ref={allSelect} />
                                    </label>
                                </th>

                                <th>Name</th>
                                <th>Type</th>
                                <th>Presence</th>
                                <th>Actions</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.doctors.map((element) => {
                                return (
                                    <tr key={element._id}>
                                        <th>
                                            <label>
                                                <input onClick={() => handleSel(element._id)} type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`/uploads/${element.img}`} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{element.name}</div>
                                                    <div className="text-sm opacity-50">Birgunj</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{element.type}</td>
                                        <td><button onClick={()=>handlePresence(element._id)} >{element.attend}</button></td>
                                        <td>
                                            <button className=' bg-crimsonRed rounded text-white p-2 pl-3 pr-3' onClick={() => handleDelete(element._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        {/* foot */}
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Presence</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                    {selected.map((element)=>{
                        return <p>{element}</p>
                    })}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddDoctors;
