import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';
import JobCard from './src/components/JobCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './src/screens/ProfileScreen';

// Home Screen with Job Swiper
function HomeScreen({ navigation }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch jobs and process skills using useEffect
    useEffect(() => {
        axios.get('http://localhost:8000/jobs')  // Replace with your actual endpoint
            .then((res) => {
                const processedJobs = res.data.map(job => ({
                    ...job,
                    skills: Array.isArray(job.skills) ? job.skills : [job.skills || 'N/A']
                }));
                setJobs(processedJobs);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching jobs:", err);
                setJobs([]);
                setLoading(false);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Swipe for Jobs</Text>
                
                {/* Settings Icon */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.settingsIcon}
                >
                    <Text style={styles.settingsText}>⚙️</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.swiperContainer}>
                {loading ? (
                    <Text>Loading Jobs...</Text>
                ) : jobs.length > 0 ? (
                    <Swiper
                        cards={jobs}
                        renderCard={(job) => <JobCard job={job} />}
                        stackSize={3}
                        verticalSwipe={false}
                        onSwipedRight={(index) => console.log("Applied to", jobs[index]?.title)}
                        onSwipedLeft={(index) => console.log("Skipped", jobs[index]?.title)}
                        backgroundColor={'#f4f4f4'}
                    />
                ) : (
                    <Text>No Jobs Available</Text>
                )}
            </View>
        </SafeAreaView>
    );
}

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{ title: 'Profile' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    settingsIcon: {
        padding: 10,
    },
    settingsText: {
        fontSize: 28,
    },
    swiperContainer: {
        width: '90%',
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
    },
});