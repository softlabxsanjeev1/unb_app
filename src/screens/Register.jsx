import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TextInput, Image, } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VerifyModal from '../components/VerifyModal';

const Register = ({ navigation }) => {
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false)
    const [verifymodalVisible, setVerifyModalvesible] = useState(false)

    // btn function
    const saveUser = async () => {
        try {
            setLoading(true)
            await AsyncStorage.removeItem("userdata");
            const { data } = await axios.post("/user/register",
                { name, email, password, phone }
            );
            // console.log(data.userdata.email)
            await AsyncStorage.setItem("userdata", JSON.stringify(data.userdata.email));
            // let asyncStoreData = await AsyncStorage.getItem("userdata");
            // console.log(asyncStoreData)
            setLoading(false)
            setVerifyModalvesible(true)
            // console.log("REgister Data==> ", { name, email, password, phone, address, answer });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false)
            console.log(error);

        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {verifymodalVisible && (
                    <VerifyModal
                        verifymodalVisible={verifymodalVisible}
                        setVerifyModalvesible={setVerifyModalvesible} />
                )}
                <Image source={require('../assets/unlogo.png')} style={styles.img} />
                <Text style={{ fontWeight: "bold", fontSize: 22, alignSelf: "center", color: "green", marginBottom: 20 }}>Unique Bajar</Text>
                <TextInput placeholder='Enter Name' style={styles.inputStyle}
                    value={name} onChangeText={text => setName(text)}
                />
                <TextInput placeholder='Enter 10 digit phone no ' inputMode='tel' style={styles.inputStyle}
                    value={phone} onChangeText={text => setPhone(text)}
                />
                <TextInput placeholder='Enter email' inputMode='email' style={styles.inputStyle}
                    value={email} onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder='Enter Password'
                    secureTextEntry={true}
                    style={styles.inputStyle}
                    value={password} onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => {
                        if (email !== '' && password !== '' && name !== '' && phone !== '' && phone.length > 9) {
                            saveUser()
                        } else {
                            alert("Please enter all credentials")
                        }
                    }}>
                    <Text style={styles.btn}>
                        {loading ? "Please Wait ...." : "Create Account"}
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 15, alignItems: "center" }}>
                    <Text style={{ fontSize: 16 }}>Already have an account</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Login')
                    }}>
                        <Text style={{ color: "red", fontSize: 20, marginLeft: 10, textDecorationLine: "underline" }}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register


const styles = StyleSheet.create({
    inputStyle: {
        width: '80%',
        height: 45,
        borderRadius: 10,
        borderWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 15,
        alignSelf: "center",
        marginTop: 5
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 100,
        marginTop: "15%",
        alignSelf: "center"
    },
    loginBtn: {
        backgroundColor: '#9bdf00',
        width: "60%",
        height: 45,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
    },

    serachInput: {
        width: "20%",
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "gray",
        alignSelf: "center",
        marginTop: 20,
        placeholder: 15,
    },
    countryItem: {
        width: "20%",
        height: 50,
        borderBottomWidth: 0.2,
        borderBottomColor: "black",
        alignSelf: "center",
        justifyContent: "center"
    }
})