import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startBouncing();
    }, []);


    useEffect(() => {
        setTimeout(() => {
            checkLogIn()
        }, 1500);
    }, []);

    const checkLogIn = async () => {
        const user = await AsyncStorage.getItem('token');
        if (user !== null) {
            navigation.navigate('Home')
        } else {
            navigation.navigate('Login')
        }
    }

    const startBouncing = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceValue, {
                    toValue: 1.1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(bounceValue, {
                    toValue: 1.0,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Animated.Image
                source={require('../assets/unlogo.png')}
                style={[styles.spalshLogo, { transform: [{ scale: bounceValue }] }]}
            />
            <Text style={styles.logo}>Unique Bajar</Text>
            <Text>Powered by RVBM Universe Pvt Ltd.</Text>
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        fontSize: 40,
        fontWeight: '800',
        color: 'red',
    },
    spalshLogo: {
        objectFit: "contain",
        height: 250,
        width: 250,
        borderRadius: 200,
        marginBottom: 50
    }

})