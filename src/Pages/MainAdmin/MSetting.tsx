import React, { useEffect, useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../Components/Nav-bar';
import { FaLeaf, FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5"
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../States/hooks';
import { setUserData } from '../../States/Slices/UserData';
import Table from '../Components/Table';
import MDash from './MDash';
import MSet from './MSet';
const MSetting = () => {
    
    const [page, setPage] = useState<string>('dash');
    const dispatch = useAppDispatch();
    const { username, email, _id } = useAppSelector((state) => {
        return state.UserData
    })
    const [cookie, setCookie, removeCookie] = useCookies(['user']);
    const navigate = useNavigate();
   
    

    function handleNavigate() {
        navigate('/hello');
    }

    const [click, setClick] = useState<boolean>(false);

    function hanldeClick() {
        setClick(!click);
    }

    function handleLogout() {
        removeCookie('user', { path: '/login' });
    }

    function handlePage(page: string) {
        setPage(page);
        navigate(`/${page}`);
    }
    return (
        <motion.div animate={{ x: click ? -320 : 0 }} style={{paddingLeft:click?'20px':''}} className="h-screen flex">
            <IoMenuSharp className='absolute z-10 cursor-pointer text-white text-3xl left-80 ml-5 top-10 ' style={{ color: click ? 'black' : 'black', display: click ? 'block' : 'none' }} onClick={hanldeClick} />
            <motion.div style={{ zIndex: 0 }} data-theme="black" className="menu h-screen w-80"
                animate={{ x: click ? -320 : 0 }}
            >
                <div className="admin">
                    <h1 className='font-semibold mt-10 text-xl text-left ml-10'>Hi, Admin{username.slice(0, 1).toUpperCase() + username.slice(1)}</h1>
                    <p className=' font-light text-left ml-10'>{email}</p>
                </div>
                <IoIosArrowBack className=' absolute left-72 top-72 text-2xl cursor-pointer' style={{ display: click ? 'none' : '' }} onClick={hanldeClick} />
                <div className="links text-left ml-10 mt-10 flex flex-col gap-5">
                    <div className="items cursor-pointer" onClick={() => handlePage('madmin')}>
                        <MdDashboard className='text-white text-xl' />
                        <span>Dashboard</span>
                    </div>
                    
                    <div className="items cursor-pointer" onClick={() => handlePage('madmin/setting')} >
                        <IoIosSettings className='text-white text-xl cursor-pointer' />
                        <span>Settings</span>
                    </div>
                    <div onClick={handleLogout} className="items cursor-pointer">
                        <IoLogOut className='text-white text-xl log' />
                        <span>Log out</span>
                    </div>
                </div>

            </motion.div>
            <div className=" text-left pt-10 pl-10">
                <MSet />
            </div>
        </motion.div>
    );
};

export default MSetting;
