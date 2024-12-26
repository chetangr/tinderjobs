import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
    const [jobs, setJobs] = useState([]);
    const [index, setIndex] = useState(0);
    const [userId] = useState(1);
    const [interviewTime, setInterviewTime] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetchJobs();
        fetchRecommendations();

        socket.on('interview_scheduled', (data) => {
            if (data.user_id === userId) {
                alert(`Interview scheduled for Job ID: ${data.job_id} at ${data.interview_time}. 
                      Check your Google Calendar: ${data.calendar_link}`);
            }
        });

        return () => {
            socket.off('interview_scheduled');
        };
    }, []);

    const fetchJobs = () => {
        axios.get('http://localhost:5000/jobs')
            .then(response => setJobs(response.data))
            .catch(error => console.log(error));
    };

    const fetchRecommendations = () => {
        axios.get(`http://localhost:5000/recommend/ai/${userId}`)
            .then(response => setRecommendations(response.data))
            .catch(error => console.log(error));
    };

    const scheduleInterview = (job_id) => {
        axios.post('http://localhost:5000/interview/schedule', {
            job_id: job_id,
            user_id: userId,
            interview_time: interviewTime
        }).then(() => {
            alert('Interview scheduled and synced to Google Calendar!');
        });
    };

    return (
        <div className="App">
            {jobs.length > 0 ? (
                <div className="job-card">
                    <h2>{jobs[index][1]}</h2>
                    <p>{jobs[index][2]}</p>
                    <p>{jobs[index][3]}</p>
                    <input
                        type="datetime-local"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                    />
                    <button onClick={() => scheduleInterview(jobs[index][0])}>
                        Schedule Interview
                    </button>
                </div>
            ) : (
                <p>No jobs available</p>
            )}
        </div>
    );
}

export default App;