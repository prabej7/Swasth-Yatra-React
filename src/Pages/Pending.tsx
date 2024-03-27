import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Mobile from "./Components/Mobile";
import axios, { AxiosResponse } from "axios";
import url from "../url";
import { useCookies } from "react-cookie";

interface Data {
    name: string,
    reg: string,
    pan: string
}

const Pending: React.FC = () => {
    const [cookie, setCookie] = useCookies(['user']);
    const [status, setStatus] = useState<Number>(0);
    const inputFile = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<Data>({
        name: '',
        reg: '',
        pan: ''
    });

    const [file, setFile] = useState<File>();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('reg', data.reg);
        formData.append('pan', data.pan);
        if (cookie.user) {
            formData.append('_id', cookie.user._id);
        }
        if (file) {
            formData.append('file', file);
        }

        if (data.name !== "" && data.pan !== "" && data.reg !== "" && file) {
            const response: AxiosResponse = await axios.post(`${url}ask`, formData);
            const { data, status } = response;
            setStatus(status);
        }

        if (inputFile.current) {
            inputFile.current.value = "";
        }
        setData({
            name: '',
            pan: '',
            reg: ''
        });
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    return (
        <div>
            <Mobile>
                {status !== 200 ?
                    <form className="flex flex-col gap-2" onSubmit={handleSubmit} >
                        <input
                            className="input rounded"
                            name="name"
                            onChange={handleChange}
                            placeholder="Hospitals Name"
                            value={data.name}
                        />
                        <input
                            className="input rounded"
                            name="reg"
                            onChange={handleChange}
                            placeholder="Registeration No."
                            value={data.reg}
                        />
                        <input
                            className="input rounded"
                            name="pan"
                            onChange={handleChange}
                            placeholder="PAN"
                            value={data.pan}
                        />
                        <p className=" text-xs text-left mt-4" >Upload a legal document below : </p>
                        <input
                            type="file"
                            ref={inputFile}
                            onChange={handleFile}
                            className="file-input file-input-bordered w-60 rounded max-w-xs"
                        />
                        <button className="btn  mt-4">Submit</button>
                    </form>
                    : <div>
                        <p>Your request has been sent !</p>
                        <p>It may take upto 24hr.</p>
                    </div>}

            </Mobile>

        </div>
    )
}

export default Pending;