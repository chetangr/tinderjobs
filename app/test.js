import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-deck-swiper';
import JobCard from './src/components/JobCard';
import { useWindowDimensions } from 'react-native';

export default function App({ navigation }) {
    const [jobs, setJobs] = useState([]);
    const swiper = useRef(null);
    const { width } = useWindowDimensions();

    useEffect(() => {
        axios.get('http://localhost:8000/jobs')
            .then(res => setJobs(res.data))
            .catch(err => {
                console.error("Error fetching jobs:", err);
                setJobs([]);
            });
    }, []);

    const cardSize = width > 900 ? 500 : '90%';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Swipe for Jobs</Text>
                
                {/* Settings Icon */}
                <TouchableOpacity
                    onPress={() => {
                        console.log("Navigating to Profile");
                        navigation.navigate('Profile');  // Navigate to Profile screen
                    }}
                    style={styles.settingsIcon}
                >
                    <Text style={styles.settingsText}>⚙️</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.swiperContainer, { width: cardSize, height: cardSize * 1.2 }]}>
                {jobs.length > 0 ? (
                    <Swiper
                        ref={swiper}
                        cards={jobs}
                        renderCard={(job) => <JobCard job={job} />}
                        stackSize={3}
                        backgroundColor={'#f4f4f4'}
                        verticalSwipe={false}
                    />
                ) : (
                    <Text style={styles.noJobs}>No Jobs Available</Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <Text
                    style={styles.reject}
                    onPress={() => swiper.current?.swipeLeft()}
                >
                    ❌ Skip
                </Text>
                <Text
                    style={styles.apply}
                    onPress={() => swiper.current?.swipeRight()}
                >
                    ✔️ Apply
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
        padding: 20,
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
});