import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// Ensure this component has a default export
export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile Screen</Text>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
    },
});