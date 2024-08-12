import React, { useState } from 'react';
import axios from 'axios';
import './makeadmin.css'; 

const AddAdminForm = () => {
    const [name, setName] = useState('');
    const [email, setRegno] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const adminData = {
            name,
            email,
            password,
        };

        try {
            await axios.post('http://localhost:5000/admin', adminData);
            alert('Admin added successfully!');
            setName('');
            setRegno('');
            setPassword('');
        } catch (error) {
            console.error('Error adding admin:', error);
            alert('Failed to add admin. Please try again.');
        }
    };

    return (
        <div className="add-admin-form">
            <h1>Add New Admin</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-item">
                    <label>
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setRegno(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-item">
                    <label style={{}}>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Add Admin</button>
            </form>
        </div>
    );
};

export default AddAdminForm;
