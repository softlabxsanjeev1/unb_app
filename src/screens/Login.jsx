import { View, Text, SafeAreaView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    // custom hook
    const [state, setState] = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const userLogin = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                "user/login",
                { email, password }
            );
            // alert("Login succesfully")
            setState(data);
            // console.log(data.token)
            // console.log(data.user)
            await AsyncStorage.setItem('token', JSON.stringify(data));
            navigation.navigate('Home')
            // console.log("Login Data==> ", { userData });
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/unlogo.png')} style={styles.img} />
            <Text style={{ fontWeight: "bold", fontSize: 22, alignSelf: "center", marginBottom: 20 }}>Unique Bajar</Text>
            <TextInput style={styles.inputStyle} placeholder={'Enter Email Id'}
                value={email}
                inputMode='email'
                onChangeText={txt => setEmail(txt)}
            />
            <TextInput style={styles.inputStyle} placeholder={"Enter Password"}
                value={password}
                secureTextEntry={true}
                onChangeText={txt => setPassword(txt)}
            />
            <TouchableOpacity style={styles.loginBtn}
                onPress={() => {
                    if (email !== '' && password !== '') {
                        userLogin()
                    } else {
                        alert("Please enter all credentials")
                    }
                }}>
                <Text style={styles.btn}>
                    {loading ? "Please Wait ...." : "Login"
                    }
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 18, alignItems: "center" }}>
                <Text style={{ fontSize: 16 }}>New user</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Register')
                }}>
                    <Text style={{ color: "red", fontSize: 20, marginLeft: 15, textDecorationLine: "underline" }}>Create Account</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Login
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        height: 130,
        width: 130,
        borderRadius: 100,
        marginTop: "15%",
        marginBottom: "10%"
    },
    inputStyle: {
        paddingLeft: 20,
        height: 50,
        alignSelf: "center",
        marginTop: 30,
        borderWidth: 0.5,
        borderRadius: 10,
        width: '80%',
        paddingLeft: 18
    },
    loginBtn: {
        backgroundColor: '#9bdf00',
        width: "60%",
        height: 40,
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