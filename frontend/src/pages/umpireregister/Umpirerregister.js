import React, { useState } from 'react';

const RegisterUmpire = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleRegisterUmpire = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register-umpire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Error registering umpire');
        }
    };

    return (
        <div>
            <h2>Register Umpire</h2>
            <form onSubmit={handleRegisterUmpire}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <button type="submit">Register Umpire</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterUmpire;
//commr