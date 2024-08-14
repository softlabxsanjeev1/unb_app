import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

// name  password  phone   gender  age 

const Profile = () => {
    const [state, setState] = useContext(AuthContext)
    const user = state.user;
    const userId = user._id
    console.log(userId)

    // console.log(state.user)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")


    const navigation = useNavigation()

    const updateDetail = async () => {
        console.log("clicked")
        try {
            setLoading(true);
            const response = await axios.put(
                `user/update-profile/${userId}`,
                { name, password, phone, gender, age }
            );
            setName("")
            setPhone("")
            setPassword("")
            setAge("")
            setGender("")
            setPhone("")
            // console.log(response.data)
            Alert.alert("Success", "Profile Updated successfully || Please logout to get Updated details")
            setLoading(false)
            navigation.navigate('Home')
            // console.log("Login Data==> ", { userData });
        } catch (error) {
            Alert.alert("Error", error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        setName(user.name),
            setPhone(user.phone)
        setPassword(user.password)
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image source={require('../assets/images/user-icon.png')} style={styles.image} />
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.name}>
                        Hi
                        <Text style={{ color: "green" }}> {user.name} </Text>
                        🏆
                    </Text>
                    <Text>email : {user.email}</Text>
                    <Text>conatct : {user.phone}</Text>
                    {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 }}>
                        <Text>email : {user.age}</Text>
                        <Text>conatct : {user.gender}</Text>
                    </View> */}
                </View>
                <View style={styles.dataContainer}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.lable}>New Name</Text>
                        <TextInput style={styles.inputBox}
                            value={name}
                            onChangeText={(txt) => { setName(txt) }}
                            inputMode='text'
                            placeholder={name} />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.lable}>New Password</Text>
                        <TextInput style={styles.inputBox}
                            value={password}
                            onChangeText={(txt) => { setPassword(txt) }}
                            inputMode='text'
                            placeholder="Enter new pasword" />
                    </View><View style={styles.rowContainer}>
                        <Text style={styles.lable}>Phone no</Text>
                        <TextInput style={styles.inputBox}
                            value={phone}
                            onChangeText={(txt) => { setPhone(txt) }}
                            inputMode='tel'
                            placeholder='new Phone no' />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.lable}>Gender</Text>
                        <TextInput style={styles.inputBox}
                            value={gender}
                            onChangeText={(txt) => { setGender(txt) }}
                            inputMode='text'
                            placeholder='Male / Female / Others' />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.lable}>Age</Text>
                        <TextInput style={styles.inputBox}
                            value={age}
                            onChangeText={(txt) => { setAge(txt) }}
                            inputMode='text'
                            placeholder='Enter age no' />
                    </View>
                </View>
                <TouchableOpacity style={styles.checkout}
                    onPress={updateDetail}
                >
                    <Text style={{ color: "#fff", fontSize: 20 }}>
                        {loading ? "Please wait ..." : "Update"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    },
    dataContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    rowContainer: {
        flexDirection: "column",
        gap: 5,
        marginBottom: 10
    },
    lable: {
        fontSize: 15,
        fontWeight: "500",
        color: "#000000"
    },
    inputBox: {
        borderWidth: 0.3,
        height: 35,
        paddingLeft: 10,
        borderRadius: 3
    },
});


export default Profile