import React, { useState } from 'react';

const RegisterScorer = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const handleRegisterScorer = async (e) => {
        e.preventDefault();
        console.log('Registering scorer with:', { name, email });
        try {
            const response = await fetch('http://localhost:5000/api/register-scorer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            const data = await response.json();
            console.log('Response from server:', data);
            setMessage(data.message);
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('Error registering scorer');
        }
    };

    return (
        <div>
            <h2>Register Scorer</h2>
            <form onSubmit={handleRegisterScorer}>
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
                <button type="submit">Register Scorer</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RegisterScorer;
