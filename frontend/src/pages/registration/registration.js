import React, { useState } from 'react';
import './registration.css';
import axios from 'axios';

function Registration() {
    const [formTitle, setFormTitle] = useState('Register Player');
    const [submitButtonText, setSubmitButtonText] = useState('Register');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            name: event.target.name.value,
            regNo: event.target.registerId.value,
            email: event.target.email.value,
            role: event.target.role.value,
            runs: Number(event.target.runs.value),
            matches: Number(event.target.matches.value),
            wickets: Number(event.target.wickets.value),
            teamName: event.target.teamName.value,
            teamCode: event.target.teamCode.value
        };

        try {
            let response;
            if (submitButtonText === 'Register') {
                response = await axios.post('http://localhost:5000/registration', formData);
                alert(response.data.message);
            } else if (submitButtonText === 'Update') {
                response = await axios.put(`http://localhost:5000/updateTeam/${formData.email}`, formData);
                alert(response.data.message);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDeleteClick = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this player?");
        if (confirmation) {
            try {
                const email = document.getElementById('email').value;
                const response = await axios.delete(`http://localhost:5000/deleteTeam/${email}`);
                alert(response.data.message);
                resetForm();
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Error: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const resetForm = () => {
        document.getElementById('playerForm').reset();
        setFormTitle('Register Player');
        setSubmitButtonText('Register');
    };

    return (
        <div className='npage-con'>
            <div className="top">
                <h1 style={{ padding: "0.5px", marginLeft: "6vh", marginTop: "auto" }}>TEAM REGISTRATIONS</h1>
            </div>
            
            <div id="formContainer">
                <h2 id="formTitle" style={{ fontFamily: 'Cambria', fontSize: '5vh' }}>{formTitle}</h2>
                <form id="playerForm" onSubmit={handleFormSubmit}>
                    <label htmlFor="name" style={{ marginRight: '70vh' }}>Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="registerId">Register ID:</label>
                    <input type="text" id="registerId" name="registerId" required />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required style={{ marginLeft: '1vh' }} />

                    <label htmlFor="role" style={{ marginRight: '70vh' }}>Role:</label>
                    <input type="text" id="role" name="role" placeholder='Batsman, Bowler, or All-rounder' required />

                    <label htmlFor="runs" style={{ marginRight: '47vh' }}>Number of Runs:</label>
                    <input type="text" id="runs" name="runs" required />

                    <label htmlFor="matches" >Number of Matches:</label>
                    <input type="text" id="matches" name="matches" required />

                    <label htmlFor="wickets">Number of Wickets:</label>
                    <input type="text" id="wickets" name="wickets" required />

                    <label htmlFor="teamName" style={{ marginRight: '52vh' }}>Team Name:</label>
                    <input type="text" id="teamName" name="teamName" required />

                    <label htmlFor="teamCode" style={{ marginRight: '52vh' }}>Team Code:</label>
                    <select id="teamCode" name="teamCode" required defaultValue="">
                        <option value="" disabled>Select Team Code</option>
                        <option value="TC001">TC001</option>
                        <option value="TC002">TC002</option>
                        <option value="TC003">TC003</option>
                        <option value="TC004">TC004</option>
                    </select>

                    <div className="Rbutton-container">
                        <button type="submit" id="submitBtn" style={{ color: 'white', fontSize: '2.5vh' }}>{submitButtonText}</button>
                        <button type="button" id="updateBtn" style={{ color: 'white', fontSize: '2.5vh' }} onClick={() => setSubmitButtonText('Update')}>Update</button>
                        <button type="button" id="deleteBtn" style={{ color: 'white', fontSize: '2.5vh' }} onClick={handleDeleteClick}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
