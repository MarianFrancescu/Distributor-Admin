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

export type GlobalContext = {
  isLoggedUser: boolean, 
  setUserStatus: (u: boolean) => void
};

export const MyContext = React.createContext<GlobalContext>({isLoggedUser: false, setUserStatus: () => {}});

function App() {

  // const [isLoggedUser, setUserStatus] = useState(() => {
  //   const token = localStorage.getItem('admin-token');
  //   return token !== null ? true : false;
  // });
  const [isLoggedUser, setUserStatus] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className='App'>
      <MyContext.Provider value={{isLoggedUser, setUserStatus}}>
    <BrowserRouter>
      <MyNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Sidebar className="sidebar" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/students' element={<Students/>}></Route>
          <Route path='/disciplines' element={<Disciplines/>}></Route>
          <Route path='/institutions' element={<Institutions/>}></Route>
      </Routes>
    </BrowserRouter>
    </MyContext.Provider>
    </div>
  );
}

export default App;
