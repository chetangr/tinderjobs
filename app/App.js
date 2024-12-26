import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-deck-swiper';
import Slider from 'react-slick';
import JobCard from './src/components/JobCard';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './src/screens/ProfileScreen';
import 'slick-carousel/slick/slick.css';

// Home Screen Component
function HomeScreen({ navigation }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const swiperRef = useRef(null);
    const { width } = useWindowDimensions();

    // Fetch Jobs
    useEffect(() => {
        axios.get('http://localhost:8000/jobs')
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

    // Slick Carousel Settings (Desktop)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '100px',
        autoplay: true,
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Swipe for Jobs</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.settingsIcon}
                >
                    <Text style={styles.settingsText}>⚙️</Text>
                </TouchableOpacity>
            </View>

            {/* Conditional Rendering for Desktop/Mobile */}
            <View style={styles.swiperContainer}>
                {loading ? (
                    <Text>Loading Jobs...</Text>
                ) : (
                    <>
                        {width > 900 ? (
                            // Carousel for Desktop
                            // <Slider {...settings}>
                            //     {jobs.map((job, index) => (
                            //         <JobCard key={index} job={job} />
                            //     ))}
                            // </Slider>
<View style={styles.swiperContainer}>
    <Slider {...settings}>
        <div>
            <h3 style={{ textAlign: 'center' }}>Slide 1</h3>
        </div>
        <div>
            <h3 style={{ textAlign: 'center' }}>Slide 2</h3>
        </div>
        <div>
            <h3 style={{ textAlign: 'center' }}>Slide 3</h3>
        </div>
    </Slider>
</View>
                        ) : (
                            // Tinder-Style Swipe for Mobile
                            <Swiper
                                ref={swiperRef}
                                cards={jobs}
                                renderCard={(job) => <JobCard job={job} />}
                                stackSize={3}
                                verticalSwipe={false}
                                backgroundColor={'transparent'}
                            />
                        )}
                    </>
                )}
            </View>

            {/* Swipe/Carousel Buttons */}
            {width <= 900 && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.rejectButton]}
                        onPress={() => swiperRef.current?.swipeLeft()}
                    >
                        <Text style={styles.buttonText}>❌ Skip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.applyButton]}
                        onPress={() => swiperRef.current?.swipeRight()}
                    >
                        <Text style={styles.buttonText}>✔️ Apply</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Bottom Navigation */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <Text>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text>💼</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Text>💬</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text>👤</Text>
                </TouchableOpacity>
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
const slickStyles = {
    sliderContainer: {
        margin: 'auto',
        width: '85%',
    },
    arrow: {
        fontSize: '24px',
        color: '#333',
    },
    dots: {
        bottom: '-30px',
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 90,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    rejectButton: {
        backgroundColor: '#ff5757',
    },
    applyButton: {
        backgroundColor: '#4caf50',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    navItem: {
        padding: 10,
    },
});