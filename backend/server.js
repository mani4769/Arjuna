const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Define User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// Define Team schema and model
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    runs: { type: Number, required: true },
    matches: { type: Number, required: true },
    wickets: { type: Number, required: true },
    teamName: { type: String, required: true },
    teamCode: { type: String, required: true }
});

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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send({ message: 'Failed to send email' });
      }
      res.send({ message: 'Login successful, email sent' });
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Register team route
app.post('/registerTeam', async (req, res) => {
  const { name, regNo, email, role, runs, matches, wickets, teamName, teamCode } = req.body;
  try {
    const teamExists = await Team.findOne({ regNo });
    if (teamExists) {
      return res.status(400).send({ message: 'Team member already registered' });
    }
    const newTeam = new Team({ name, regNo, email, role, runs, matches, wickets, teamName, teamCode });
    await newTeam.save();
    res.status(201).send({ message: 'Team member registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Update team route
app.put('/updateTeam/:email', async (req, res) => {
  const { email } = req.params;
  const { name, regNo, role, runs, matches, wickets, teamName, teamCode } = req.body;

  try {
    const teamMember = await Team.findOneAndUpdate(
      { email },
      { name, regNo, role, runs, matches, wickets, teamName, teamCode },
      { new: true }
    );

    if (!teamMember) {
      return res.status(404).send({ message: 'Team member not found' });
    }

    res.send({ message: 'Team member updated successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

// Delete team route
app.delete('/deleteTeam/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const teamMember = await Team.findOneAndDelete({ email });

    if (!teamMember) {
      return res.status(404).send({ message: 'Team member not found' });
    }

    res.send({ message: 'Team member deleted successfully' });
  } catch (error) {
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

// Create schedule route
app.post('/api/schedule', async (req, res) => {
  const { team1, team2, date, stadium, time } = req.body;

  // Basic validation to ensure teams are not the same
  if (team1 === team2) {
    return res.status(400).send({ message: 'Teams cannot be the same' });
  }

  try {
    const newSchedule = new Schedule({ team1, team2, date, stadium, time });
    await newSchedule.save();
    res.status(201).send({ message: 'Schedule created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.get('/api/schedule', async (req, res) => {
  try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to midnight

      const schedules = await Schedule.find({
          date: {
              $gte: currentDate.toISOString().split('T')[0] // Compare only the date part
          }
      }).exec();

      res.json(schedules);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.post('/api/sendAlert', async (req, res) => {
  const { email, schedule, alertTime } = req.body;

  const alertTimeDate = new Date(alertTime); // Convert the alertTime to a Date object



  const delay = alertTimeDate.getTime() - Date.now();

  if (delay > 0) {
      setTimeout(() => {
          const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: 'Match Alert',
              text: `Reminder: Your match between ${schedule.team1} and ${schedule.team2} at ${schedule.stadium} is scheduled for ${schedule.time}.`
          };

          transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  console.error('Error sending email:', error);
              } else {
                  console.log('Email sent: ' + info.response);
              }
          });
      }, delay);

      res.send({ message: 'Alert set successfully!' });
  } else {
      res.status(400).send({ message: 'Cannot set alert in the past' });
  }
});
// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
