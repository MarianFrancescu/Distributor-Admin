import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Disciplines from './components/disciplines/disciplines';
import Institutions from './components/institutions/institutions';
import Login from './components/login/login';
import MyNavbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import Students from './components/students/students';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className='App'>
    <BrowserRouter>
      <MyNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/students' element={<Students/>}></Route>
        <Route path='/disciplines' element={<Disciplines/>}></Route>
        <Route path='/institutions' element={<Institutions/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
