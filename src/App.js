// App.js
import { Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import {useLogout} from './hooks/useLogout'
import { useAuthContext } from './hooks/useAuthContext';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Login from './Components/Login';
import MyEvents from './Components/My Events';
import EventDetails from './Components/EventDetails';
import logo from './Images/logo2.png';
import Signup from './Components/Signup';
import Home from './Components/Home';
import FindEvents from './Components/Find Events';
import CreateEvent from './Components/Create Events';
import Profile from './Components/Profile';
import UserMatching from './Components/UserMatching';
import SignupConfirm from './Components/SignupConfirm';
import Leaderboard from './Components/Leaderboard';
import FindUsers from './Components/FindUsers';
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';

import './App.css';


function App() {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogout = () => {
    logout()
  }

  const handleProfile = () => {
    window.location.href="http://localhost:3000/profile";
  }

    useEffect(() => {
    setShouldRedirect(true);
  }, []);
  

  return (
    <ChakraProvider>
      <CSSReset />
      <div className="app">
        <Router>
          <Routes>
            <Route path="/login" element={user ? <Navigate to ="/myevents"></Navigate>: <Login />} />
            <Route path="/myevents" element={user ? <MyEvents />: <Navigate to ="/login"></Navigate>} />
            <Route path="/signupconfirmed" element={user ? <SignupConfirm />: shouldRedirect ? <Navigate to ="/login" /> : null} />
            <Route path="/signup" element={user ? <Navigate to ="/findevents"></Navigate> : <Signup />} />
            <Route path="/findusers" element={user ? <FindUsers /> : shouldRedirect ? <Navigate to ="/login" /> : null} />
            <Route path="/create-event" element={user ? <CreateEvent />: <Navigate to ="/login"></Navigate>} />
            <Route path="/leaderboard" element={user ? <Leaderboard /> : shouldRedirect ? <Navigate to ="/login" /> : null} />
            <Route path="/profile" element={user ? <Profile />: shouldRedirect ? <Navigate to ="/login"/>: null} />
            <Route path="/findevents" element={user ? <FindEvents /> : shouldRedirect ? <Navigate to="/login" /> : null}/>
            <Route path="/usermatching" element={user ? <UserMatching />: shouldRedirect ? <Navigate to ="/login" /> : null} />
            <Route path="/event/:eventId" element={user ? <EventDetails />: shouldRedirect ? <Navigate to ="/login" /> : null} />
            <Route path="/" element={<Home />} />
          </Routes>
          <div className="topnav">
            <NavLink to="/" exact activeClassName="active">
              <img
                src={logo}
                alt="Home"
                style={{width: '69px', height: '2%', marginRight: '0px'}}
              />
            </NavLink>
            <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
            </NavLink>
            <NavLink to= "/findusers" activeClassName="active">
              Find Users
            </NavLink>
            <NavLink to="/findevents" activeClassName="active">
              Find Events
            </NavLink>
            {user &&(
              <div>
                <NavLink to="/myevents" activeClassName="active">
                  My Events
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
            <div style={{ position: 'absolute', right: '0'}}>
              <Menu>
                <MenuButton as={Button} bgColor="transparent" _hover={{bgColor: 'transparent'}} _active={{bgColor: 'transparent'}}>
                <Avatar size="lg" src={"/pfp1.png"} name="Default Profile" />
                </MenuButton>
                <MenuList >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
            )}
          </div>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
