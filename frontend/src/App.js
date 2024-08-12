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
import AdminDashboard  from './pages/admindashboard/admindashboard.js';
import Chart  from './pages/Chart/chart.js';
import Admin from './pages/Adminlogin/admin.js';
import livescoreapp from './pages/livescoreapp/livescoreapp.js';
import LiveScoreApp from './pages/livescoreapp/livescoreapp.js';
import Userfeedback from './pages/userfeedback/userfeedback.js';
import AdminFeedback from './pages/feedback/adminfeedback.js';
import Makeadmin   from './pages/makeadmin/makeadmin.js';
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
      (
        <Route
        path='/admindashboard'
        element={<AdminDashboard/>}
        />
      )
      (
        <Route
        path='/chart'
        element={<Chart/>}
        />
      )
      (
        <Route
        path='/admin'
        element={<Admin/>}
        />
      )
      (
        <Route
        path='/livescoreapp'
        element={<LiveScoreApp/>}
        />
      )
      (
        <Route
        path='/feedback'
        element={<Userfeedback/>}
        />
      )
      (
        <Route
        path='/adminfeedback'
        element={<AdminFeedback/>}
        />
      )
      (
        <Route
        path='/makeadmin'
        element={<Makeadmin/>}
        />
      )
      

      </Routes>
      
    // </Router>
  );
}

export default MainApp;
