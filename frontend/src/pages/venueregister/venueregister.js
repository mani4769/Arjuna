import React, { useState } from 'react';

const RegisterVenue = () => {
    const [venueName, setVenueName] = useState('');
    const [message, setMessage] = useState('');

    const handleRegisterVenue = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://arjuna-six.vercel.app/api/register-venue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ venueName }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error registering venue');
        }//mani
    };

    return (
        <div>
            <h2>Register Venue</h2>
            <form onSubmit={handleRegisterVenue}>
                <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Venue Name"
                    required
                />
                <button type="submit">Register Venue</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterVenue;
