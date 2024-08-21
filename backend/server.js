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

// CORS configuration
const corsConfig = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(express.json());
//com
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schemas and models
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
  email: { type: String, required: true }
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: [true, "must have a team name"] },
  teamCode: { type: String, required: [true, "must have team code"] },
  players: [playerSchema]
});
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

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const Admin = mongoose.model('Admin', adminSchema);

const otpStore = {};

const feedbackSchema = new mongoose.Schema({
  role: String,
  rating: Number,
  comments: String
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

const scorerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});
const Scorer = mongoose.model('Scorer', scorerSchema);

const umpireSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});
const Umpire = mongoose.model('Umpire', umpireSchema);

const venueSchema = new mongoose.Schema({
  venueName: { type: String, required: true, unique: true },
  lastUsed: { type: Date }
});
const Venue = mongoose.model('Venue', venueSchema);

const matchScheduleSchema = new mongoose.Schema({
  team1: String,
  team1Players: [String],
  team2: String,
  team2Players: [String],
  scorerName: String,
  umpireName: String,
  venueName: String,
  dateTime: Date
});
const MatchSchedule = mongoose.model('MatchSchedule', matchScheduleSchema);

const venueAvailability = {}; // Example for checking venue availability

// API Endpoints
app.get("/", (req, res) => {
  res.send("Welcome to the API");
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

    await transporter.sendMail(mailOptions);
    res.send({ message: 'Login successful, email sent' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/registration', async (req, res) => {
  try {
    const { teamName, teamCode, name, role, runs, matches, wickets, email } = req.body;

    if (!teamName || !teamCode || !name || !role || !email || runs === undefined || matches === undefined || wickets === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let team = await Team.findOne({ teamName, teamCode });

    if (!team) {
      team = new Team({ teamName, teamCode, players: [{ name, role, email, runs, matches, wickets }] });
    } else {
      team.players.push({ name, role, runs, matches, wickets, email });
    }

    await team.save();
    res.status(200).json({ message: 'Player registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
    res.status(500).send({ message: 'Server error' });
  }
});

app.delete('/deleteTeam/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const team = await Team.findOneAndUpdate(
      { "players.email": email },
      { $pull: { players: { email } } },
      { new: true }
    );

    if (!team) {
      return res.status(404).send({ message: 'Team member not found' });
    }

    res.send({ message: 'Team member deleted successfully' });
  } catch (error) {
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
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res.status(201).send({ message: 'Schedule created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create schedule' });
  }
});

app.post('/api/alert', async (req, res) => {
  const { email, team1, team2, date, stadium, time, minutes } = req.body;

  try {
    const matchDateTime = new Date(`${date}T${time}:00`);

    if (isNaN(matchDateTime.getTime())) {
      return res.status(400).send({ message: 'Invalid date or time format' });
    }

    cron.schedule(`${matchDateTime.getUTCMinutes() - minutes} ${matchDateTime.getUTCHours()} ${matchDateTime.getUTCDate()} ${matchDateTime.getUTCMonth() + 1} *`, async () => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Match Alert',
        text: `Reminder: Your match between ${team1} and ${team2} is scheduled at ${stadium} on ${date} at ${time}.`
      };
      
      await transporter.sendMail(mailOptions);
    });

    res.status(200).send({ message: 'Alert scheduled successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to schedule alert' });
  }
});

app.post('/verifypassword', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).send({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    res.send({ message: 'Password verified' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/feedback', async (req, res) => {
  const { role, rating, comments } = req.body;

  try {
    const feedback = new Feedback({ role, rating, comments });
    await feedback.save();
    res.status(201).send({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to submit feedback' });
  }
});

app.post('/api/scorers', async (req, res) => {
  const { name, email } = req.body;

  try {
    const newScorer = new Scorer({ name, email });
    await newScorer.save();
    res.status(201).send({ message: 'Scorer added successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add scorer' });
  }
});

app.post('/api/umpires', async (req, res) => {
  const { name, email } = req.body;

  try {
    const newUmpire = new Umpire({ name, email });
    await newUmpire.save();
    res.status(201).send({ message: 'Umpire added successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add umpire' });
  }
});

app.post('/api/venues', async (req, res) => {
  const { venueName } = req.body;

  try {
    const newVenue = new Venue({ venueName });
    await newVenue.save();
    res.status(201).send({ message: 'Venue added successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add venue' });
  }
});

app.post('/api/match-schedule', async (req, res) => {
  const { team1, team1Players, team2, team2Players, scorerName, umpireName, venueName, dateTime } = req.body;

  try {
    const newMatchSchedule = new MatchSchedule({ team1, team1Players, team2, team2Players, scorerName, umpireName, venueName, dateTime });
    await newMatchSchedule.save();
    res.status(201).send({ message: 'Match schedule created successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create match schedule' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});