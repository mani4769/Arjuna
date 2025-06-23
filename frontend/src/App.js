import { Routes, Route } from 'react-router-dom';
import SignupPage from './pages/signuppaage/Signuppage';
import HomePage from './pages/homepage/Homepage';
import Livescore from './pages/livescore/livescore';
import Teams from './pages/teams/teams.js';
import ScheduleAlert from './pages/alert/alert.js';
import Registration from './pages/registration/registration.js';
import Schedulepage from './pages/schedules/SchedulePage.js';
import UserSchedulePage from './pages/userschedulepage/userschedule.js';
import AdminDashboard  from './pages/admindashboard/admindashboard.js';
import Admin from './pages/Adminlogin/admin.js';
import LiveScoreApp from './pages/livescoreapp/livescoreapp.js';
import Userfeedback from './pages/userfeedback/userfeedback.js';
import AdminFeedback from './pages/feedback/adminfeedback.js';
import Makeadmin   from './pages/makeadmin/makeadmin.js';
import Passwordpage from './pages/passwordpage/passwordpage.js';
import UserChart from './pages/Chart/chart.js';
import Sdashboard from './pages/superadmin/superadmin.js';
import MatchAlert from './pages/matchalert/matchalert.js';
import RegisterUmpire from './pages/umpireregister/Umpirerregister.js';
import RegisterScorer from './pages/scorerregister/Scorerregister.js';
import RegisterVenue from './pages/venueregister/venueregister.js';
import ScheduleMatch from  './pages/ScheduleMatch/schedulematch.js';

function MainApp() {
  return (
    <Routes>
      <Route path="/signupapge" element={<SignupPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/livescore" element={<Livescore />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/alert" element={<ScheduleAlert />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/schedule" element={<Schedulepage />} />
      <Route path="/userschedule" element={<UserSchedulePage />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/chart" element={<UserChart />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/livescoreapp" element={<LiveScoreApp />} />
      <Route path="/feedback" element={<Userfeedback />} />
      <Route path="/adminfeedback" element={<AdminFeedback />} />
      <Route path="/makeadmin" element={<Makeadmin />} />
      <Route path="/passwordpage" element={<Passwordpage />} />
      <Route path="/superadmin" element={<Sdashboard />} />
      <Route path="/matchalert" element={<MatchAlert />} />
      <Route path="/umpire" element={<RegisterUmpire />} />
      <Route path="/scorer" element={<RegisterScorer />} />
      <Route path="/venue" element={<RegisterVenue />} />
      <Route path="/schedulematch" element={<ScheduleMatch />} />
    </Routes>
  );
}

export default MainApp;
