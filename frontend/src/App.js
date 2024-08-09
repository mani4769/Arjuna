import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/signuppaage/Signuppage';
import HomePage from './pages/homepage/Homepage';
import Livescore from './pages/livescore/livescore';
import Teams from './pages/teams/teams.js';
import ScheduleAlert from './pages/alert/alert.js';
import Registration from './pages/registration/registration.js';
import Schedulepage from './pages/schedules/SchedulePage.js';
import UserSchedulePage from './pages/userschedulepage/userschedule.js';

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  return (
   
    // <Router>
      <Routes>
        <Route
          path="/"
          element={<SignupPage setIsLoggedIn={setIsLoggedIn} setShowPopup={setShowPopup} />}
        />
        (
          <Route
            path="/homepage"
            element={<HomePage/>}
          />

        )
       (
        <Route
        path='/livescore'
        element={<Livescore/>}
        />
       )
       (
        <Route
        path='/teams'
        element={<Teams/>}
        />
       )
       (
        <Route
        path='/alert'
        element={<ScheduleAlert/>}
        />
      )
      (
        <Route
        path='/registration'
        element={<Registration/>}
        />
      )
      (
        <Route
        path='/schedule'
        element={<Schedulepage/>}
        />
      )
      (
        <Route
        path='/userschedule'
        element={<UserSchedulePage/>}
        />
      )

      </Routes>
      
    // </Router>
  );
}

export default MainApp;
