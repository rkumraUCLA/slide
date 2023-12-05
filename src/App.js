// App.js
import React from 'react';
import {useLogout} from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Login from './Components/Login';
import MyEvents from './Components/My Events';
import EventDetails from './Components/EventDetails';
import logo from './Images/logo.png';
import Signup from './Components/Signup';
import Home from './Components/Home';
import FindEvents from './Components/Find Events';
import CreateEvent from './Components/Create Events';
import Profile from './Components/Profile';
import UserMatching from './Components/UserMatching';
import SignupConfirm from './Components/SignupConfirm';

import './App.css';

function App() {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  return (
    <ChakraProvider>
      <CSSReset />
      <div className="app">
        <Router>
          <Routes>
            <Route path="/login" element={user ? <Navigate to ="/myevents"></Navigate>: <Login />} />
            <Route path="/myevents" element={user ? <MyEvents />: <Navigate to ="/login"></Navigate>} />
            <Route path="/signupconfirmed" element={user ? <SignupConfirm />: <Navigate to ="/login"></Navigate>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-event" element={user ? <CreateEvent />: <Navigate to ="/login"></Navigate>} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={user ? <Profile />: <Navigate to ="/login"></Navigate>} />
            <Route path="/findevents" element={user ? <FindEvents />: <Navigate to ="/login"></Navigate>} />
            <Route path="/usermatching" element={user ? <UserMatching />: <Navigate to ="/login"></Navigate>} />
            <Route path="/event/:eventId" element={user ? <EventDetails />: <Navigate to ="/login"></Navigate>} />
          </Routes>
          <div className="topnav">
            <NavLink to="/" exact activeClassName="active">
              <img
                src={logo}
                alt="Home"
                style={{ width: '70px', height: '2%', marginRight: '0px' }}
              />
            </NavLink>
            <NavLink to="/findevents" activeClassName="active">
              Find Events
            </NavLink>
            {user &&(
              <div>
                <NavLink to="/myevents" activeClassName="active">
                  My Events
                </NavLink>
                <NavLink to="/profile" activeClassName="active">
                  Profile
                </NavLink>
              </div>
            )}
            {!user &&(
              <div style={{ marginLeft: 'auto' }}>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </div>
            )}
            {user && (
              <div style={{ marginLeft: 'auto' }}>
                <button onClick={handleLogout} style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}>
                  Logout    
                </button>
              </div>
            )}
          </div>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
