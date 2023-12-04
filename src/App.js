import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Login from './Components/Login';
import MyEvents from './Components/My Events';
import logo from './Images/logo.png';
import Signup from './Components/Signup';
import Home from './Components/Home';
import FindEvents from './Components/Find Events';
import CreateEvent from './Components/Create Events';
import Profile from './Components/Profile';
import UserMatching from './Components/UserMatching';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <CSSReset /> 
      <div className="app">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/myevents" element={<MyEvents />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/findevents" element={<FindEvents />} />
            <Route path="/usermatching" element={<UserMatching />} />
          </Routes>

          <div className="topnav">
            <NavLink to="/" exact activeClassName="active">
              <img src={logo} 
              alt="Home" 
              style={{ width: '70px', height: '2%', marginRight: '0px' }}
              />
            </NavLink>
            <NavLink to="/findevents" activeClassName="active">
              Find Events
            </NavLink>
            <NavLink to="/myevents" activeClassName="active">
              My Events
            </NavLink>
            <NavLink to='/profile' activeClassName="active">
              Profile
            </NavLink>
            <NavLink to='/usermatching' activeClassName="active">
              Match With Users!
            </NavLink>
            <div style={{ marginLeft: 'auto' }}>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </div>
          </div>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;