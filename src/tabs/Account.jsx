import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import userImage from '../assets/images/user-icon.png'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../context/authContext'

const Account = () => {
    const [state, setState] = useContext(AuthContext)
    const navigation = useNavigation()
    const user = state.user;
    // console.log(state.user)

    const userLogout = async () => {
        {
            try {
                await AsyncStorage.removeItem("token");
                Alert.alert("Success", "User logout successfully")
                navigation.navigate('Login')
            }
            catch (error) {
                Alert.alert("Error", "token not removed")
            }
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image source={userImage} style={styles.image} />
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.name}>
                        Hi
                        <Text style={{ color: "green" }}> {user.name} </Text>
                        🏆
                    </Text>
                    <Text>email : {user.email}</Text>
                    <Text>conatct : {user.phone}</Text>
                </View>
                <View style={styles.btnContainer}>
                    <Text style={styles.heading}>Account Setting</Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <Image source={require('../assets/images/edit.png')} style={styles.icon} />
                        <Text style={styles.btnText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate("Myorders")
                        }
                    >
                        <Image source={require('../assets/images/order.png')} style={styles.icon} />
                        <Text style={styles.btnText}>My Orders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <Image source={require('../assets/images/notification.png')} style={styles.icon} />
                        <Text style={styles.btnText}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate("Privacypolicy")
                        }
                    >
                        <Text style={[styles.btnText, { color: "blue", fontWeight: "600", fontSize: 20 }]}>Terms and conditions</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.checkout}
                    onPress={() => { userLogout() }}
                >
                    <Text style={{ color: "#fff", fontSize: 20 }}>Logout</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    image: {
        height: 100,
        width: "100%",
        resizeMode: "contain",
    },
    name: {
        marginTop: 10,
        fontSize: 20,
    },
    btnContainer: {
        padding: 10,
        backgroundColor: "#ffffff",
        margin: 10,
        marginVertical: 20,
        elevation: 5,
        borderRadius: 10,
        paddingBottom: 30,
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "lightgray",
    },
    btn: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        padding: 5,
    },
    btnText: {
        fontSize: 18,
        marginRight: 10,
        color: "blue",
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    checkout: {
        width: "45%",
        height: 45,
        backgroundColor: "#8fce00",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 90
    }
});

export default Account