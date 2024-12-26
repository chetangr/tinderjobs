import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JobCard({ job }) {
    // Ensure skills is always an array
    const skills = Array.isArray(job.skills) ? job.skills : [job.skills || 'N/A'];

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{job.title}</Text>
            <Text>{job.company} - {job.location}</Text>
            <Text style={styles.skills}>Skills: {skills.join(', ')}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    skills: {
        fontStyle: 'italic',
        marginTop: 10,
    }
});