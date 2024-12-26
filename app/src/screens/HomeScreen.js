import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import JobCard from '../components/JobCard';

export default function HomeScreen() {
    const [jobs, setJobs] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const userId = 1;  // Simulated user ID for recommendations

    // Fetch all jobs and recommendations when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8000/jobs')
            .then(res => setJobs(res.data))
            .catch(err => console.error("Error fetching jobs:", err));

        axios.get(`http://localhost:8000/recommendations/${userId}`)
            .then(res => setRecommendedJobs(res.data))
            .catch(err => console.error("Error fetching recommendations:", err));
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>All Jobs</Text>
            {jobs.length > 0 ? (
                jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))
            ) : (
                <Text>No jobs available</Text>
            )}

            <Text style={styles.header}>Recommended for You</Text>
            {recommendedJobs.length > 0 ? (
                recommendedJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))
            ) : (
                <Text>No recommendations found.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 15
    }
});