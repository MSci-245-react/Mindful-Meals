import React from 'react';
import Review from './Review';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import RecipeFinder from '../RecipeFinder';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavigationBar from '../NavigationBar';

function App() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/RecipeFinder" element={<RecipeFinder />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
