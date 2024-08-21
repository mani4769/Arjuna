import React, { useState } from 'react';
import axios from 'axios';
import './makeadmin.css';

const AddAdminForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateEmail, setUpdateEmail] = useState('');

    const handleAddAdmin = async (event) => {
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
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error adding admin:', error);
            alert('Failed to add admin. Please try again.');
        }
    };

    const handleUpdatePassword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/admin/update-password`, {
                email: updateEmail,
                newPassword,
            });

            if (response.data.success) {
                alert('Password updated successfully!');
                setUpdateEmail('');
                setNewPassword('');
            } else {
                alert('Email not found. Please check the email and try again.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password. Please try again.');
        }
    };

    return (
        <div className="Aadmin-container" style={{marginTop:'10vh'}}>
            <div className="Aadd-admin-form">
                <h1>Add New Admin</h1>
                <form onSubmit={handleAddAdmin}>
                    <div className="Aform-item">
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
                    <div className="Aform-item">
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="Aform-item">
                        <label>
                            Password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit"  style={{borderRadius:'4vh',width:'37vh',marginLeft:'14vh'}}>Add Admin</button>
                </form>
            </div>

            <div className="Aupdate-password-form" style={{marginTop:'25vh',marginLeft:'10vh'}}>
                <h1>Update Admin Password</h1>
                <form onSubmit={handleUpdatePassword}>
                    <div className="Aform-item">
                        <label>
                            Email:
                            <input
                                type="email"
                                value={updateEmail}
                                onChange={(e) => setUpdateEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="Aform-item">
                        <label>
                            New Password:
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button type="submit" style={{borderRadius:'4vh',width:'37vh',marginLeft:'14vh'}}>Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default AddAdminForm;
