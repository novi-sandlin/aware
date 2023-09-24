import React from 'react';
import { useState, useEffect } from 'react';
import Home from './pages/index.jsx';
import Navbar from './components/Navbar.jsx';
import Homepage from './pages/Homepage.jsx';
import Calendar from './pages/Calendar.jsx';
import Politicians from './pages/Politicians.jsx';
import News from './pages/News.jsx';
import Bills from './pages/Bills.jsx';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoutes, TeacherRoutes, StudentRoutes } from './utils/ProtectedRoutes.jsx';
import Map from './pages/PoliticianLanding.jsx';
import Elections from './pages/Elections.jsx';
import PolyLanding from './pages/PolyLanding.jsx';
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Profile from './pages/Profile.jsx'
import MockElections from './pages/MockElections.jsx';


function App() {

  const [loggedIn, isLoggedIn] = useState(true);
  const [role, setRole] = useState('teacher');

  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
        <Route element={<ProtectedRoutes login={loggedIn}/>}>  

          <Route element={<TeacherRoutes role={role} />}>
            <Route path="/Mock" element={<MockElections/> } exact/>
          </Route>
          <Route element={<StudentRoutes role={role} />}>
            <Route path="/" element={<Homepage />} exact/>
            <Route path="/Calendar" element={<Calendar />} exact/>
            <Route path="/Bills" element={<Bills />} exact/>
            <Route path="/Elections" element={<Elections />} exact/>
            <Route path="/Politicians" element={<Politicians />} exact/>
            <Route path="/Bills" element={<Bills />} exact/>
            <Route path="/Map" element={<Map />} exact/>
            <Route path="/News" element={<News />} exact/>
            <Route path="/Overview" element={<PolyLanding/>} exact/>
            <Route path="/Profile" element={<Profile/>} exact/>
          </Route>
        </Route>
        <Route path="/Login" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App
