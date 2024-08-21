import React, { useState, useEffect } from 'react';
import './scorer.css'

const TodaysMatches = () => {
    const [matches, setMatches] = useState([]);
    const [otp, setOtp] = useState('');
    const [matchId, setMatchId] = useState(null);
    const [otpVerified, setOtpVerified] = useState(false);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await fetch('http://localhost:5000/todays-matches');
                if (!response.ok) throw new Error('Failed to fetch matches');
                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    // const sendOtp = async (id) => {
    //     try {
    //         const response = await fetch('http://localhost:5000/send-otp', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ matchId: id }),
    //         });
    //         if (!response.ok) throw new Error('Failed to send OTP');
    //         alert('OTP sent to scorer\'s email');
    //         setMatchId(id);
    //     } catch (error) {
    //         console.error('Error sending OTP:', error);
    //     }
    // };

    // const verifyOtp = async () => {
    //     try {
    //         const response = await fetch('http://localhost:5000/verify-otp', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ matchId, otp }),
    //         });
    //         if (!response.ok) throw new Error('Invalid OTP');
    //         alert('OTP verified successfully');
    //         setOtpVerified(true);
    //     } catch (error) {
    //         console.error('Error verifying OTP:', error);
    //         alert('Invalid OTP or OTP expired');
    //     }
    // };

    return (
        <div>
           
            <h1 style={{color:'red'}}>Today's Matches</h1>
            <div className='matchess' style={{marginLeft:'15vh'}}>
            <ul>
                {matches.map(match => (
                    <li key={match._id} style={{fontSize:'2vh'}}>
                        <strong>{match.team1} vs {match.team2}</strong> <br />
                        Scorer: {match.scorerName} <br />
                        Time: {new Date(match.dateTime).toLocaleTimeString()} <br />
                        <a href='/userscore'><button>Access score</button></a>
                    </li>
                ))}
            </ul>
          </div>
           
        </div>
    );
};

export default TodaysMatches;
