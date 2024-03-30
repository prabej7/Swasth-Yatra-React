import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import AdminDoctors from './Pages/AdminDoctors';
import AdminSetting from './Pages/AdminSetting';
import AdminPatients from './Pages/AdminPatients';
import Home from './Pages/UserPage/Home';
import Account from './Pages/UserPage/Account';
import Ask from './Pages/Ask';
import Pending from './Pages/Pending';
import MAdmin from './Pages/MainAdmin/MAdmin';
import MSetting from './Pages/MainAdmin/MSetting';
import Find from './Pages/UserPage/Find';
import VideoCall from './Pages/UserPage/VideoCalling';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Register />} path='/register' />
        <Route element={<Admin />} path='/admin' />
        <Route element={<Login />} path='/login' />
        <Route element={<AdminDoctors />} path='/admin/doctors' />
        <Route element={<AdminSetting />} path='/admin/setting' />
        <Route element={<AdminPatients />} path='/admin/patients' />
        <Route element={<Home />} path='/' />
        <Route element={<Account />} path='/account' />
        <Route element={<Ask label='' />} path='/account-type' />
        <Route element={<Pending />} path='/pending' />
        <Route element={<MAdmin />} path='/madmin' />
        <Route element={<MSetting />} path='/madmin/setting' />
        <Route element={<Find />} path='/account/find' />
        <Route element={<VideoCall />}  path='/video' />
      </Routes>
    </div>
  );
}

export default App;
