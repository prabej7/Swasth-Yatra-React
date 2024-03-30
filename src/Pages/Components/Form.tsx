import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import url from "../../url";
import concatenatedDate from "../../Date";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface PageProp {
    qr: string,
    MainUserData: {
        username: string
    },
    appoint: string,
    date: string,
    hospital: string,
    doctor_id: string,
    isForm: (isFormSubmitted: boolean) => void
}

const Form: React.FC<PageProp> = (props) => {
    const notify = () => toast.success("Form Submitted!",{
        autoClose: 3000,
    });
    const [formData, setFormData] = useState({
        username: props.MainUserData.username,
        doctorName: props.appoint,
        date: props.date,
        hospital: props.hospital,
        doctor_id: props.doctor_id
    });
    const [file, setFile] = useState<File>();
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        if (name == 'date') {

        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }



    const [isSubmitted, setSubmitted] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newForm = new FormData();
        const { username, doctorName, hospital, date, doctor_id } = formData;
        newForm.append('username', username);
        newForm.append('doctor', doctorName);
        newForm.append('hospital', hospital);
        newForm.append('doctor_id', doctor_id);
        newForm.append('date', date);
        if (file) {
            newForm.append('file', file);
        }
        const response: AxiosResponse = await axios.post(`${url}appointment`, newForm);
        setSubmitted(true);
        notify();
        setTimeout(() => {
            setSubmitted(false);
        }, 3000);
        props.isForm(true);
    }
    return (
        <div>
            {isSubmitted ?
                <div className="flex justify-center items-center h-56" >
                    <h1>Form Submitted !</h1>
                </div>
                :
                <form className="flex flex-col gap-3 overflow-auto" style={{ maxHeight: '288px' }} onSubmit={handleSubmit} >
                    <p className="text-left text-xs font-semibold">Doctor's Name:</p>
                    <input className="input rounded border-gray-200" name="doctorname" value={formData.doctorName} onChange={handleChange} />
                    <p className="text-left text-xs font-semibold">Patient's Name:</p>
                    <input className="input rounded border-gray-200" name="username" value={formData.username} onChange={handleChange} />
                    <p className="text-left text-xs font-semibold">Date:</p>
                    <div className="text-left mt-2">
                        <input type="date" name="date" value={formData.date} onChange={handleChange} />
                    </div>
                    <img src={props.qr} />
                    <p className="text-left text-xs font-semibold">Upload recript:</p>
                    <div>
                        <input type="file" onChange={(e) => {
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                            }
                        }} className="file-input file-input-bordered w-full max-w-xs" />
                    </div>
                    <button className="btn bg-gray-800 hover:bg-gray-900 text-white">Submit</button>
                </form>
            }
            <ToastContainer />

        </div>

    )
}

export default Form;