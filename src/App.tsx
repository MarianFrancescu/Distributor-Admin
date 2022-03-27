import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import MyNavbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <MyNavbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
