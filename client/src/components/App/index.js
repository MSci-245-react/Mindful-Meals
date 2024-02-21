import React from 'react';
import Review from './Review';
import SignUp from '../SignUp';
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
