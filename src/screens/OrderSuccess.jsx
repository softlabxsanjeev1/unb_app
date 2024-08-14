import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'

const OrderSuccess = ({ navigation }) => {
    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startBouncing();
    }, []);

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


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 1500);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Animated.Image
                source={require('../assets/images/done.png')}
                style={[styles.spalshLogo, { transform: [{ scale: bounceValue }] }]}
            />
            <Text style={styles.logo}>Order Succeessful</Text>
        </SafeAreaView>
    )
}

export default OrderSuccess


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        fontSize: 25,
        fontWeight: '800',
        color: '#cc0000',
    },
    spalshLogo: {
        objectFit: "contain",
        height: 150,
        width: 150,
        borderRadius: 200,
        marginBottom: 50
    }

})