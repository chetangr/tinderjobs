import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function JobCard({ job }) {
    const skills = Array.isArray(job.skills) ? job.skills : [job.skills || 'N/A'];

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: job.image || 'https://via.placeholder.com/300' }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{job.title}</Text>
                <Text style={styles.company}>{job.company} - {job.location}</Text>
                <Text style={styles.skills}>Skills: {skills.join(', ')}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '85%',
        height: 450,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: '65%',
    },
    infoContainer: {
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    company: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    skills: {
        fontSize: 16,
        color: '#888',
    }
});