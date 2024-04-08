import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Mobile from "../Components/Mobile";
import Menu from "../Components/Menu";
import { CiSearch } from "react-icons/ci";
import { useMapEvents } from "react-leaflet";
import { FaUserDoctor } from "react-icons/fa6";
import L from "leaflet";
import 'leaflet-routing-machine';
import { FaRoute } from "react-icons/fa";
import Form from "../Components/Form";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import axios, { AxiosResponse } from "axios";
import useGetAll from "../../hooks/getAllData/useGetAll";
import User from "../../User";
import { Icon } from "leaflet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from "react-cookie";
import useGetUser from "../../hooks/userData/useGetUser";
import { useAppSelector } from "../../States/hooks";
import useLocation from "../../hooks/loaction/useLocation";
import useDoctor from "../../hooks/useDoctors/useDoctor";
import { motion } from "framer-motion";
import { LuCalendarPlus } from "react-icons/lu";
const qrCode = require('qrcode');

interface Location {
    lat: number,
    lon: number
}

const Find: React.FC = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const [qr, setQr] = useState<string>('');
    useGetUser(cookie.user._id);
    const MainUserData = useAppSelector((state) => {
        return state.getUserData;
    });
    const navigate = useNavigate();
    const notify = (text: string) => toast.error(text);
    const [place, setPlace] = useState<string>('');
    const [location, setLocation] = useState({
        lat: 27.7097467,
        lon: 85.32473286318762
    });

    useLocation(cookie.user._id);
    const [zoomLevel, setZoomLevel] = useState<number>(13);
    const [userLocation, setUserLocation] = useState({
        lat: MainUserData.lat,
        lon: MainUserData.lon
    });

    const [userData, setUserData] = useState<User[]>([]);
    const currentDate = new Date(); // Get the current date

    // Extract individual date components
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0, so add 1 and pad with zero if necessary
    const day = currentDate.getDate().toString().padStart(2, '0'); // Pad with zero if necessary

    // Concatenate year, month, and day into a single string
    const concatenatedDate = `${year}-${month}-${day}`;
    const [date, setDate] = useState<string>(concatenatedDate);
    const [hosLoction, setHostLocation] = useState<Location>({
        lat: 0,
        lon: 0
    });
    
    useEffect(() => {
        axios.get(`http://localhost:5000/allAdmin`).then((response: AxiosResponse) => {
            const { data, status } = response;
            setUserData(data);
        });
        if (navigator) {
            navigator.geolocation.watchPosition((position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
                setUserLocation({
                    lat: MainUserData.lat,
                    lon: MainUserData.lon
                });
            }, (err) => {
                console.log(err);
            })
        }

    }, [])

    function MyMapComponent() {
        const map = useMap();
        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(MainUserData.lat, MainUserData.lon),
                L.latLng(hosLoction.lat, hosLoction.lon)
            ],
            routeWhileDragging: true,
            show: false

        });
        routingControl.addTo(map);
        map.setView([location.lat, location.lon], map.getZoom(), {
            animate: true,
            duration: 1,
            easeLinearity: 0.25
        });
        return null;
    }
    const [Zoom, setZoom] = useState(9);



    const customeIcon = new Icon({
        iconSize: [38, 38],
        iconUrl: '/uploads/hospital.png',
    });

    const userIcon = new Icon({
        iconSize: [38, 38],
        iconUrl: '/uploads/pin-map.png',
    });

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            const response: AxiosResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=1e02dc5e630c241114c0a27b793012d7`);
            setLocation({
                lat: response.data[0].lat,
                lon: response.data[0].lon
            });
            setPlace('');

        } catch (err) {
            notify('Invalid city name!');
        }

    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setPlace(value);
    }
    const [doctors, setDoctors] = useState([{
        name: '',
        img: '',
        attend: '',
        type: '',
        _id: ''
    }]);
    const [display, setDisplay] = useState<string>('');
    const [click, setClick] = useState<boolean>(false);
    const [selected, setSelected] = useState({
        name: '',
        _id: ''
    });
    const [doc, setDoc] = useState<string>('');
    function handlePopup(_id: string){

    }
    async function handleClick(_id: string) {
        setClick(true);
        setSelected({
            name: '',
            _id: ''
        });
        setDoctors([]);
        const user = userData.filter((user) => {
            return user._id == _id
        });
        setSelected({
            name: user[0].fName,
            _id: user[0]._id
        });
        user[0].doctors.map((element) => {
            setDoctors(prev => ([...prev, element]));
        });
        qrCode.toDataURL(`{"eSewa_id":"${user[0].eSewaName}","name":"${user[0].eSewaNo}"}`, function (err: Error, url: string) {
            setQr(url);
        })
    }
    const [form, setForm] = useState<boolean>(false);
    const [appoint, setAppoont] = useState<string>('');

    function handleAppointment(Name: string, _id: string) {
        setDoc(_id);
        setAppoont(Name);
        setForm(true);
    }

    function handleDirection(postion: Location) {
        setHostLocation({
            lat: postion.lat,
            lon: postion.lon
        });
    }

    function handleDoctors(){
        setClick(true);
    }
    return (
        <div>

            <Mobile >
                <div className="form-container absolute top-10 left-3 w-full z-50 ">
                    <form onSubmit={handleSubmit} className=" flex top-28 z-10 gap-2" style={{ left: '536px' }} >
                        <input
                            className="input rounded"
                            placeholder="Search..."
                            onChange={handleChange}
                            value={place}
                        />
                        <button className="btn" ><CiSearch className=" text-xl" /></button>
                    </form>
                </div>
                <motion.div className="flex absolute z-50 card w-72 bg-base-100 shadow-xl h-96 rounded" style={{ display: display }} animate={{ y: click ? '0px' : '500px' }}  >
                    <div className="card-body">

                        <div className=" flex justify-around items-center gap-1 mb-5">
                            <div className="head">
                                <h1 className="font-bold text-xl" >{selected?.name}</h1>
                            </div>

                            <div className="btn1">
                                <button className="btn btn-square btn-sm" onClick={() => {
                                    setClick(false);
                                    setSelected({name:'',_id:''});
                                    setForm(false);

                                }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                        </div>
                        {form ?
                            <div className="" >
                                <Form isForm={(isTrue) => {
                                    if (isTrue) {
                                        setTimeout(() => {
                                            setClick(false);
                                            setForm(false);
                                            setAppoont('');
                                        }, 3000);
                                    }
                                }} date={date} hospital={selected._id} appoint={appoint} MainUserData={{ username: MainUserData.username }} qr={qr} doctor_id={doc} />

                            </div>
                            :
                            <div className="overflow-hidden">

                                {doctors.map((doctor, index) => (
                                    <motion.div key={index} className="flex items-center mb-4 " animate={{ y: form ? '500px' : '0px' }} >

                                        <img className="rounded-full mr-2" src={`/uploads/${doctor.img}`} alt={doctor.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        <div className="text-left min-w-32  break-words" style={{ minWidth: '130px' }} >
                                            <h1 className="font-medium " >{doctor.name}</h1>
                                            <p className=" text-sm" >{doctor.type}</p>
                                        </div>
                                        <button className=" bg-crimsonRed rounded text-white h-10 w-44 flex justify-center items-center" onClick={() => handleAppointment(doctor.name, doctor._id)} ><LuCalendarPlus className="text-xl" /></button>
                                    </motion.div>
                                ))}
                            </div>
                        }


                    </div>
                </motion.div>
                <div className="map-container relative h-full" >
                    <MapContainer center={[location.lat, location.lon]} zoom={zoomLevel} >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={userIcon} position={[MainUserData.lat, MainUserData.lon]} >
                            <Popup>
                                <h1>You</h1>
                            </Popup>
                        </Marker>
                        {userData.map((user) => {
                            return <div  ><Marker icon={customeIcon} position={[user.lat, user.lon]} >
                                <Popup >
                                    <div >

                                        <img className="rounded mb-5 mt-5" src={`/uploads/${user.img}`} />
                                        <h1 className="font-bold text-xl -mb-5 " >{user.fName}</h1>
                                        <p className="text-xs" >{user.email}</p>
                                        <div className="flex gap-3" >
                                            <div className=" flex justify-evenly items-center left-60 top-72 cursor-pointer  bg-black px-3 py-3  rounded-full"
                                                onClick={() => handleDirection({ lat: user.lat, lon: user.lon })}  >
                                                <FaRoute className=" text-white text-xl" />
                                            </div>
                                            <div className=" flex justify-evenly items-center left-60 top-72 cursor-pointer  bg-black px-3 py-3  rounded-full"
                                                onClick={() =>handleDoctors()}>
                                                <FaUserDoctor className=" text-white text-xl" onClick={() => handleClick(user._id)} />
                                            </div>
                                        </div>

                                    </div>

                                </Popup>
                            </Marker></div>
                        })}

                        <MyMapComponent />
                    </MapContainer>
                </div>
         
                    <Menu />
  

            </Mobile>
            <ToastContainer />
        </div>
    )
}

export default Find;

