import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Dashboard from './components/dashboard/dashboard';
import Disciplines from './components/disciplines/disciplines';
import Institutions from './components/institutions/institutions';
import Login from './components/login/login';
import MyNavbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import Students from './components/students/students';
import Discipline from './components/discipline/discipline';
import InstitutionEdit from './components/institution-edit/institution-edit';
import Student from './components/student/student';

export type GlobalContext = {
  isLoggedUser: boolean, 
  setUserStatus: (u: boolean) => void
};

export const MyContext = React.createContext<GlobalContext>({isLoggedUser: false, setUserStatus: () => {}});

function App() {

  const [isLoggedUser, setUserStatus] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className='App'>
      <MyContext.Provider value={{isLoggedUser, setUserStatus}}>
        <BrowserRouter>
          <MyNavbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Sidebar className="sidebar" menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div className='app-container'>
            <Routes>
                <Route path='/' element={<Dashboard/>}></Route>
                <Route path='/dashboard' element={<Dashboard/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/students' element={<Students/>}></Route>
                <Route path='/student/:userID' element={<Student/>}></Route>
                <Route path='/disciplines' element={<Disciplines/>}></Route>
                <Route path='/discipline/:disciplineID' element={<Discipline/>}></Route>
                <Route path='/institutions' element={<Institutions/>}></Route>
                <Route path='/institution/:studyInstitution' element={<InstitutionEdit />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </MyContext.Provider>
    </div>
  );
}

export default App;
