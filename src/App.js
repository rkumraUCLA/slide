import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import Login from './Components/Login';
import MyEvents from './Components/My Events';
import logo from './Images/logo.png';
import Signup from './Components/Signup';
import About from './Components/About'
import Home from './Components/Home'
import FindEvents from './Components/Find Events';
import CreateEvent from './Components/Create Events';
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
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/findevents" element={<FindEvents />} />
          </Routes>

          <div className="topnav">

            <NavLink to="/" exact activeClassName="active">
              <img src={logo} 
              alt="Home" 
              style={{ width: '70px', height: '2%', marginRight: '0px' }}
              />
            </NavLink>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
            <NavLink to="/findevents" activeClassName="active">
              Find Events
            </NavLink>
            <NavLink to="/myevents" activeClassName="active">
              My Events
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
