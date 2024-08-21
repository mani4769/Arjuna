
import React, { useState } from 'react';
import './registration.css';
import axios from 'axios';

function Registration() {
    const [formTitle, setFormTitle] = useState('Register Player');
    const [submitButtonText, setSubmitButtonText] = useState('Register');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const action = submitButtonText;
        const formData = {
            name: event.target.name.value,
            regNo: event.target.registerId.value,
            email: event.target.email.value,
            role: event.target.roll.value,
            runs: event.target.runs.value,
            matches: event.target.matches.value,
            wickets: event.target.wickets.value,
            teamName: event.target.teamName.value,
            teamCode: event.target.teamCode.value
        };

        try {
            let response;
            if (action === 'Register') {
                response = await axios.post('http://localhost:5000/registerTeam', formData);
                alert(response.data.message);
            } else if (action === 'Update') {
                response = await axios.put(`http://localhost:5000/updateTeam/${formData.email}`, formData);
                alert(response.data.message);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error: ' + error.response?.data.message || error.message);
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
                alert('Error: ' + error.response?.data.message || error.message);
            }
        }
    };

    const resetForm = () => {
        document.getElementById('playerForm').reset();
        setFormTitle('Register Player');
        setSubmitButtonText('Register');
    };

    return (
        <div>
           
            <div id="formcContainerraj">
                <h2 id="formTitle"style={{fontFamily:'Cambria',fontSize:'5vh'}}>{formTitle}</h2>
                <form id="playerForm" onSubmit={handleFormSubmit}>
                    <label htmlFor="name" style={{marginRight:'70vh'}}>Name:</label>
                    <input type="text" id="namee" required />
                    <label htmlFor="registerId" style={{marginRight:'52vh',fontFamily:'monospace'}}>Register ID:</label>
                    <input type="text" id="RegisterId" required />
                    <label htmlFor="email"style={{marginRight:'70vh'}}>Email:</label>
                    <input type="email" id="emaill" required style={{marginLeft:'1vh'}}/>
                    <label htmlFor="roll"style={{marginRight:'70vh'}}>Role:</label>
                    <input type="text" placeholder='batsman or bowler or allrounder' id="roll" required />
                    <label htmlFor="runs"style={{marginRight:'47vh'}}>Number of Runs:</label>
                    <input type="text" id="runs" required />
                    <label htmlFor="matches"style={{marginRight:'46vh'}}>Number of matches:</label>
                    <input type="text" id="matches" required />
                    <label htmlFor="wickets"style={{marginRight:'46vh'}}>Number of wickets:</label>
                    <input type="text" id="wickets" required />
                    <label htmlFor="teamName"style={{marginRight:'52vh'}}>Team Name:</label>
                    <input type="text" id="teamName" required />
                    <label htmlFor="teamCode"style={{marginRight:'52vh'}}>Team Code:</label>
                    <select id="teamCode" required>
                        <option value="" disabled selected>Select Team Code</option>
                        <option value="TC001">TC001</option>
                        <option value="TC002">TC002</option>
                        <option value="TC003">TC003</option>
                        <option value="TC004">TC004</option>
                    </select>
                    <div className="Rbutton-containerraj">
                        <button type="submit" id="submitBtn" style={{color:'white',fontSize:'2.5vh',width:'20vh'}}>{submitButtonText}</button>
                        <button type="button" id="updateBtn" style={{color:'white',fontSize:'2.5vh',width:'20vh'}} onClick={() => setSubmitButtonText('Update')}>Update</button>
                        <button type="button" id="deleteBtn" style={{color:'white',fontSize:'2.5vh',width:'20vh'}} onClick={handleDeleteClick}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;