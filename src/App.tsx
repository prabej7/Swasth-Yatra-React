import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router';
import Register from './Pages/Register';
import Home from './Pages/UserPage/Home';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import Menu from './Pages/Components/Menus';
import Table from './Pages/Components/Table';
import AdminDoctors from './Pages/AdminDoctors';
import AdminSetting from './Pages/AdminSetting';
import AdminPatients from './Pages/AdminPatients';

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
      </Routes>
    </div>
  );
}

export default App;
