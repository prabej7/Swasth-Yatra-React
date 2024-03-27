import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import url from "../../url";
import User from "../../User";
const Profile = () => {
    const [userData, setUserData] = useState<User>({
        doctors: [],
        eSewaName: '',
        eSewaNo: '',
        email: '',
        fName: '',
        files: '',
        img: '',
        pan: '',
        password: '',
        reg: '',
        type: '',
        username: '',
        __v: 0,
        _id: '',
        lat:0,
        lon:0
    });
    const [cookie, setCookie] = useCookies(['user']);
    const [isHover, setHover] = useState(false);
    const [isSelected, setSelected] = useState<boolean>(false);
    const [fileName, setFileName] = useState<File>();
    const fileRef = useRef<HTMLInputElement>(null);
    const [IsformSubmitted, setFormSubmited] = useState<boolean>(false);
    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setSelected(true);
            setFileName(e.target.files[0]);

        }
    }

    function handleFileClick() {
        if (fileRef.current && !isSelected) {
            fileRef.current.click();
        }
    }

    async function handleSubmit() {
        const formData = new FormData();
        if (fileName) {
            formData.append('file', fileName);
            formData.append('_id', cookie.user._id);
            const response = await axios.post(`${url}uploadPic`, formData);
            if (response.status == 200) {
                setFormSubmited(true);
            }
        }
    }

    useEffect(() => {
        let data = {
            _id: cookie.user._id,
        }
        axios.post(`${url}getUser`, data).then((response: AxiosResponse) => {
            setUserData(response.data);
        })
    }, [IsformSubmitted]);
    return (
        <div className="profile flex justify-center items-center h-96">
            <div className="avatar cursor-pointer flex flex-col">
                {isHover || isSelected ?
                    <div className="w-72 rounded-full" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={handleFileClick} >
                        <div className=" absolute rounded-full w-72 bg-customBlack h-72 flex justify-center items-center" >
                            {isSelected ?
                                <div className="flex flex-col">
                                    <h1 className="text-white" >{fileName ? fileName.name : 'Please select a ppicture.'}</h1>
                                    <button onClick={handleSubmit} className="btn mt-2">Upload</button>
                                </div>

                                :
                                <h1 className="text-white"  >Upload a profile picture.</h1>
                            }

                            <input
                                type="file"
                                className=" hidden"
                                ref={fileRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        <img src={`/uploads/`+userData.img} />
                    </div>
                    :
                    <div className="w-72 rounded-full" onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>

                        <img src={`/uploads/`+userData.img} />
                    </div>

                }

            </div>
        </div>
    );
};

export default Profile;
