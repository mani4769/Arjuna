const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    regNo: String,
    email: String,
    
});

const User = mongoose.model('User', userSchema);


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


module.exports = User;
