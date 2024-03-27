import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Mobile from "../Components/Mobile";
import Menu from "../Components/Menu";
import { CiSearch } from "react-icons/ci";
// import L from "leaflet";
// import 'leaflet-routing-machine';
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import axios, { AxiosResponse } from "axios";
import useGetAll from "../../hooks/getAllData/useGetAll";
import User from "../../User";
import { Icon } from "leaflet";


interface Location {
    lat: number,
    lon: number
}

const Find: React.FC = () => {
    const [place, setPlace] = useState<string>('');
    const [location, setLocation] = useState({
        lat: 27.7097467,
        lon: 85.32473286318762

    });

    const [userData, setUserData] = useState<User[]>([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/allAdmin`).then((response:AxiosResponse)=>{
            const { data,status } = response;
            setUserData(data);
        });
        if(navigator){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },(err)=>{
                console.log(err);
            })
        }
    },[])

    function MyMapComponent() {
        const map = useMap();
        // L.Routing.control({
        //     waypoints: [
        //         L.latLng(location.lat, location.lon),
        //         L.latLng(28.04, 85.87)
        //     ]
        // }).addTo(map);
        map.setView([location.lat, location.lon], map.getZoom());
        return null;
    }

    const customeIcon = new Icon({
        iconSize:[38,38],
        iconUrl:'/uploads/4yUpVvelocation-pin.png',
    });
    
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const response: AxiosResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=1e02dc5e630c241114c0a27b793012d7`);
        console.log(response.data);
        setLocation({
            lat: response.data[0].lat,
            lon: response.data[0].lon
        });
        setPlace('');
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        setPlace(value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className=" absolute flex top-28 z-10 gap-2" style={{ left: '536px' }} >
                <input
                    className="input rounded"
                    placeholder="Search..."
                    onChange={handleChange}
                    value={place}
                />
                <button className="btn" ><CiSearch className=" text-xl" /></button>
            </form>
            <Mobile >
                <MapContainer center={[location.lat, location.lon]} zoom={13} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userData.map((user)=>{
                        return <Marker icon={customeIcon} position={[user.lat,user.lon]} >
                            <Popup>
                            {user.fName} <br /> {user.email}
                            </Popup>
                        </Marker>
                    })}
                    
                    <MyMapComponent />
                </MapContainer>

                <Menu />
            </Mobile>

        </div>
    )
}

export default Find;

