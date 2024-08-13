const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
/// Player and Team schemas
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

// teamSchema.index({ teamName: 1, teamCode: 1 }, { unique: true });

const Team = mongoose.model('Team', teamSchema);


// Define Schedule schema and model
const scheduleSchema = new mongoose.Schema({
  team1: { type: String, required: true },
  team2: { type: String, required: true },
  date: { type: String, required: true },
  stadium: { type: String, required: true },
  time: { type: String, required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);


// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Signup route
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

// Login route
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

// Register team route
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

// Fetch teams route
app.get('/api/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Fetch schedule route
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

// Set alert route
app.post('/api/alert', async (req, res) => {
  const { email, team1, team2, date, stadium, time, minutes } = req.body;
  console.log(req.body);

  try {
    // Calculate match date and time
    const matchDateTime = new Date(`${date}T${time}:00`);

    // Validate date and time
    if (isNaN(matchDateTime.getTime())) {
      return res.status(400).send({ message: 'Invalid date or time format' });
    }

    // Calculate alert time
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

// In-memory store for OTPs (consider using a database or caching layer in production)
const otpStore = {};




app.post('/adminlogin', async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Corrected password comparison logic
    const isMatch = admin.name === name && admin.password === password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a random OTP
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
    delete otpStore[email]; // Clear the OTP after verification
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
// server.js or app.js
app.get('/feedback', async (req, res) => {
  try {
      const feedbacks = await Feedback.find({});
      res.status(200).json(feedbacks);
  } catch (error) {
      res.status(500).send('Error retrieving feedback.');
  }
});

// Endpoint to add a new admin
app.post('/admin', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      // Check if admin already exists
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
    // Find the stored password
    const storedPassword = await AdminPassword.findOne();
    
    if (!storedPassword || storedPassword.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Password is correct, allow navigation to another page
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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
