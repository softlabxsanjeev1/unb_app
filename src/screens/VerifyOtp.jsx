import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false)

    const otpVerify = async () => {
        const newOtp = Number(otp)
        try {
            setLoading(true);
            let activationToken = await AsyncStorage.getItem("activationToken")
            const { data } = await axios.post(
                "user/verify",
                { newOtp, activationToken }
            );
            setLoading(false)
            await AsyncStorage.clear();
            navigation.navigate('Login')
            // console.log("Login Data==> ", { userData });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 28, alignSelf: "center", marginBottom: 20 }}>Verify OTP</Text>
            <TextInput style={styles.inputStyle} placeholder={"Enter Password"}
                inputMode='numeric'
                value={otp}
                onChangeText={txt => setOtp(txt)}
            />
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    if (otp !== '') {
                        otpVerify()
                    } else {
                        alert("Please enter OTP")
                    }
                }}>
                <Text style={styles.btn}>Verify</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default VerifyOtp


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 100

    },
    inputStyle: {
        paddingLeft: 20,
        height: 50,
        alignSelf: "center",
        marginTop: 70,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '60%',
        paddingLeft: 18
    },
    loginBtn: {
        backgroundColor: '#9bdf00',
        width: "30%",
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    }
})