const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcrypt');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  });
  
  const User = mongoose.model('User', userSchema);

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  runs: { type: Number, required: true },
  matches: { type: Number, required: true },
  wickets: { type: Number, required: true },
  email : {type: String, required:true}
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: [true,"must have a team name"]},
  teamCode: { type: String, required: [true,"must have team code"]},
  players: [playerSchema]
});

//mani

const Team = mongoose.model('Team', teamSchema);



const scheduleSchema = new mongoose.Schema({
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  date: { type: String, required: true },
  stadium: { type: String, required: true },
  time: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


app.post('/signup', async (req, res) => {
  const { name, regNo, email } = req.body;
  try {
    const userExists = await User.findOne({ regNo });
    if (userExists) {
      return res.status(400).send({ message: 'User already exists' });
    }
    const newUser = new User({ name, regNo, email });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


app.post('/login', async (req, res) => {
  const { regNo } = req.body;
  try {
    const user = await User.findOne({ regNo });
    if (!user) {
      return res.status(400).send({ message: 'No user exists' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'SRKR CRICKET MANAGEMENT',
      text: `A login attempt for the team Arjunas website with your registration number: ${regNo} is successful. If this wasn't you, please ignore this email.`
    };

    transporter.sendMail(mailOptions)
      .then(info => {
        res.send({ message: 'Login successful, email sent' });
        console.log("Email sent:", info.response);
      })
      .catch(error => {
        console.error('Error sending email:', error);
        res.status(500).send({ message: 'Failed to send email' });
      });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


app.post('/registration', async (req, res) => {
  try {
      const { teamName, teamCode, name, role, runs, matches, wickets, email } = req.body;
      console.log(req.body,"hai")

      if (!teamName || !teamCode || !name || !role || !email || runs === undefined || matches === undefined || wickets === undefined) {
          return res.json({ message: 'Missing required fields' });
      }

      console.log('Received registration:', req.body);

      let team = await Team.findOne({teamName,teamCode});

      if (!team) {
          console.log('Creating new team:', teamName, teamCode);
          
          team = new Team({teamName,teamCode,players:[{name,role,email,runs,matches,wickets}]});
      } else {
          console.log('Adding player to existing team:', teamName, teamCode);
          team.players.push({ name, role, runs, matches, wickets , email});
      }

      await team.save();
      console.log('Team saved successfully');
      res.status(200).json({ message: 'Player registered successfully!' });
  } catch (error) {
      console.error('Error during registration:', error.message);
      res.status(500).json({ message: 'Server error', error:error.message});
  }
});

app.put('/updateTeam/:email', async (req, res) => {
  const { email } = req.params;
  const { name, regNo, role, runs, matches, wickets, teamName, teamCode } = req.body;

  try {
      const team = await Team.findOneAndUpdate(
          { "players.email": email },
          {
              $set: {
                  "players.$.name": name,
                  "players.$.regNo": regNo,
                  "players.$.role": role,
                  "players.$.runs": runs,
                  "players.$.matches": matches,
                  "players.$.wickets": wickets,
                  teamName,
                  teamCode
              }
          },
          { new: true }
      );

      if (!team) {
          return res.status(404).send({ message: 'Team member not found' });
      }

      res.send({ message: 'Team member updated successfully' });
  } catch (error) {
      console.error('Error updating team member:', error);
      res.status(500).send({ message: 'Server error' });
  }
});

app.delete('/deleteTeam/:email', async (req, res) => {
  const { email } = req.params;

  try {
      const team = await Team.findOneAndUpdate(
          { "players.email": email },
          { $pull: { players: { email: email } } },
          { new: true }
      );

      if (!team) {
          return res.status(404).send({ message: 'Team member not found' });
      }

      res.send({ message: 'Team member deleted successfully' });
  } catch (error) {
      console.error('Error deleting team member:', error);
      res.status(500).send({ message: 'Server error' });
  }
});


app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});


app.get('/api/schedule', async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.json(schedule);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/api/schedule', async (req, res) => {
  try {
    console.log('Incoming schedule data:', req.body);
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).send({ message: 'Schedule created successfully' });
  } catch (error) {
    console.error('Error creating schedule:', error.message);
    res.status(500).send({ message: 'Failed to create schedule' });
  }
});


app.post('/api/alert', async (req, res) => {
  const { email, team1, team2, date, stadium, time, minutes } = req.body;
  console.log(req.body);

  try {
   
    const matchDateTime = new Date(`${date}T${time}:00`);

    if (isNaN(matchDateTime.getTime())) {
      return res.status(400).send({ message: 'Invalid date or time format' });
    }

    const alertTime = matchDateTime.getTime() - minutes * 60000;

    if (alertTime < Date.now()) {
      return res.status(400).send({ message: 'Alert time is in the past' });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Upcoming Cricket Match Alert: ${team1} vs ${team2}`,
      text: `Dear User,\n\nThis is a reminder for the upcoming cricket match between ${team1} and ${team2} on ${date} at ${stadium}. The match starts at ${time}.\n\nThank you!`
    };

    setTimeout(async () => {
      try {
        await transporter.sendMail(mailOptions);
        console.log(`Alert sent to ${email}`);
      } catch (error) {
        console.error(`Failed to send alert to ${email}:`, error);
      }
    }, alertTime - Date.now());

    res.status(200).send({ message: 'Alert scheduled successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

const otpStore = {};




app.post('/adminlogin', async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }


    const isMatch = admin.name === name && admin.password === password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Your OTP for SRKR Cricket Management Login',
      text: `Hello ${name},\n\nYour OTP is: ${otp}. Please enter this OTP to complete your login.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'OTP sent to email' });
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/verifyotp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.json({ message: 'OTP verified, login successful' });
  } else {
    res.status(401).json({ message: 'Invalid OTP' });
  }
});
const FeedbackSchema = new mongoose.Schema({
  role: String,
  rating: Number,
  comments: String
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);
app.post('/feedback', async (req, res) => {
  try {
      const feedbackData = req.body;
      const feedback = new Feedback(feedbackData);
      await feedback.save();
      res.status(201).send('Feedback submitted successfully!');
  } catch (error) {
      res.status(500).send('Error submitting feedback.');
  }
});

app.get('/feedback', async (req, res) => {
  try {
      const feedbacks = await Feedback.find({});
      res.status(200).json(feedbacks);
  } catch (error) {
      res.status(500).send('Error retrieving feedback.');
  }
});


app.post('/admin', async (req, res) => {
  try {
      const { name, email, password } = req.body;


      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
          return res.status(400).json({ message: 'Admin already exists' });
      }

      const newAdmin = new Admin({ name, email, password });
      await newAdmin.save();

      res.status(201).json({ message: 'Admin added successfully' });  
  } catch (error) {
      console.error('Error adding admin:', error);
      res.status(500).json({ message: 'Failed to add admin' });
  }
});
const adminPasswordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});
const AdminPassword = mongoose.model('AdminPassword', adminPasswordSchema, 'adminpasswords');
app.post('/verifypassword', async (req, res) => {
  const { password } = req.body;

  try {

    const storedPassword = await AdminPassword.findOne();
    
    if (!storedPassword || storedPassword.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({ message: 'Password correct, proceed to the next page' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (error) {
    res.status(500).send({ message: 'Server error while fetching users' });
  }
});
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.get('/api/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

app.put('/admin/update-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
      const admin = await Admin.findOne({ email });

      if (admin) {
          admin.password = newPassword;
          await admin.save();
          res.json({ success: true });
      } else {
          res.json({ success: false });
      }
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ success: false });
  }
});
app.post('/api/get-player-emails', async (req, res) => {
  try {
      const { teamNames } = req.body;

      if (!teamNames || !Array.isArray(teamNames)) {
          return res.status(400).json({ message: 'Invalid team names provided' });
      }

      const teams = await Team.find({ teamName: { $in: teamNames } });

      if (!teams || teams.length === 0) {
          return res.status(404).json({ message: 'Teams not found' });
      }

      const emails = teams.reduce((acc, team) => {
          console.log('manikanta')
          const teamEmails = team.players.map(player => player.email);
          return acc.concat(teamEmails);
      }, []);

      res.status(200).json({ emails });
  } catch (error) {
      console.error('Error fetching player emails:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.post('/api/set-alert', async (req, res) => {
  console.log('hii')
  try {
    const { teamNames, dateTime, minutes } = req.body;

    if (!teamNames || !Array.isArray(teamNames) || !dateTime || !minutes) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const teams = await Team.find({ teamName: { $in: teamNames } });

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: 'Teams not found' });
    }

    const emails = teams.reduce((acc, team) => {
      const teamEmails = team.players.map(player => player.email);
      console.log(teamEmails)
      return acc.concat(teamEmails);
    }, []);

    const alertTime = new Date(new Date(dateTime) - minutes * 60000);

    cron.schedule(`${alertTime.getUTCMinutes()} ${alertTime.getUTCHours()} ${alertTime.getUTCDate()} ${alertTime.getUTCMonth() + 1} *`, () => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emails,
        subject: 'Match Alert',
        text: `A match is scheduled between ${teamNames.join(' and ')}. Get ready!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Emails sent:', info.response);
        }
      });
    });

    res.status(200).json({ message: 'Alert set successfully!' });
  } catch (error) {
    console.error('Error setting alert:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.post('/register-scorer', async (req, res) => {
  const { name, email } = req.body;
  try {
      const newScorer = new Scorer({ name, email });
      await newScorer.save();
      res.status(200).json({ message: 'Scorer registered successfully!' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to register scorer', error: error.message });
  }
});

// Register Umpire
app.post('/register-umpire', async (req, res) => {
  const { name, email } = req.body;
  try {
      const newUmpire = new Umpire({ name, email });
      await newUmpire.save();
      res.status(200).json({ message: 'Umpire registered successfully!' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to register umpire', error: error.message });
  }
});

// Register Venue
app.post('/register-venue', async (req, res) => {
  const { venueName } = req.body;
  try {
      const newVenue = new Venue({ venueName });
      await newVenue.save();
      res.status(200).json({ message: 'Venue registered successfully!' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to register venue', error: error.message });
  }
});

const scorerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// Umpire Schema
const umpireSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// Venue Schema
const venueSchema = new mongoose.Schema({
  venueName: { type: String, required: true, unique: true },
  lastUsed: { type: Date },
});
const Scorer = mongoose.model('Scorer', scorerSchema);
const Umpire = mongoose.model('Umpire', umpireSchema);
const Venue = mongoose.model('Venue', venueSchema);






const matchScheduleSchema = new mongoose.Schema({
  team1: String,
  team1Players: [String],
  team2: String,
  team2Players: [String],
  scorerName: String,
  umpireName: String,
  venueName: String,
  dateTime: Date,
});
const MatchSchedule = mongoose.model('MatchSchedule', matchScheduleSchema);
const venueAvailability = {}; // Example for checking venue availability
// API Endpoints
app.get('/teams', async (req, res) => {
  try {
      const teams = await Team.find({});
      res.status(200).json(teams);
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch teams', error: error.message });
  }
});

app.get('/scorers', async (req, res) => {
  try {
      const scorers = await Scorer.find({});
      res.status(200).json(scorers);
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch scorers', error: error.message });
  }
});

app.get('/umpires', async (req, res) => {
  try {
      const umpires = await Umpire.find({});
      res.status(200).json(umpires);
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch umpires', error: error.message });
  }
});

app.get('/venues', async (req, res) => {
  try {
      const venues = await Venue.find({});
      res.status(200).json(venues);
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch venues', error: error.message });
  }
});
// API Endpoint to fetch all teams
app.get('/teams', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error: error.message });
    }
});

// API Endpoint to fetch team details
app.get('/teams/:teamName', async (req, res) => {
    const { teamName } = req.params;
    try {
        const team = await Team.findOne({ teamName });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team details', error: error.message });
    }
});

// Dummy function to check venue availability
const checkVenueAvailability = (venueName) => {
    const lastBooked = venueAvailability[venueName];
    if (!lastBooked) return true;
    const now = new Date();
    return now > new Date(lastBooked.getTime() + 3 * 60 * 60 * 1000); // 3 hours
};

// API Endpoint to save match schedule and send email
app.post('/schedule-match', async (req, res) => {
  const { team1, team1Players, team2, team2Players, scorerName, umpireName, venueName, dateTime } = req.body;

  try {
      // Check if the venue is available
      if (!checkVenueAvailability(venueName)) {
          return res.status(400).json({ message: 'Venue is unavailable for the next 3 hours' });
      }

      // Check if the venue exists
      const venue = await Venue.findOne({ venueName });
      if (!venue) {
          return res.status(404).json({ message: 'Venue not found' });
      }

      // Check if teams exist
      const teams = await Team.find({ teamName: { $in: [team1, team2] } });
      if (teams.length !== 2) {
          return res.status(404).json({ message: 'One or more teams not found' });
      }

      // Get scorer and umpire
      const scorer = await Scorer.findOne({ name: scorerName });
      const umpire = await Umpire.findOne({ name: umpireName });
      if (!scorer || !umpire) {
          return res.status(404).json({ message: 'Scorer or umpire not found' });
      }

      // Prepare email data
      const playerEmails = [
          ...team1Players.map(player => `${player}@example.com`), // Assuming you have a method to get player emails
          ...team2Players.map(player => `${player}@example.com`), // Add emails of team2 players
          scorer.email,
          umpire.email
      ];
      const mailOptions = {
          from: 'your-email@gmail.com',
          to: playerEmails,
          subject: 'Match Scheduled',
          text: `A match has been scheduled on ${dateTime} at ${venueName}. \n\nTeam 1: ${team1}\nPlayers: ${team1Players.join(', ')}\n\nTeam 2: ${team2}\nPlayers: ${team2Players.join(', ')}\n\nScorer: ${scorerName}\nUmpire: ${umpireName}\nVenue: ${venueName}\nDate and Time: ${dateTime}`
      };

      // Send email
      try {
          await transporter.sendMail(mailOptions);
      } catch (emailError) {
          console.error('Error sending email:', emailError);
          return res.status(500).json({ message: 'Failed to send email', error: emailError.message });
      }

      // Save match schedule
      const matchSchedule = new MatchSchedule({
          team1,
          team1Players,
          team2,
          team2Players,
          scorerName,
          umpireName,
          venueName,
          dateTime
      });
      await matchSchedule.save();

      // Update venue availability
      venueAvailability[venueName] = new Date();

      res.status(200).json({ message: 'Match scheduled and email sent!' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to schedule match', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
