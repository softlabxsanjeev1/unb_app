import { View, Text, StyleSheet, Dimensions, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/authContext'
import axios from 'axios'

// name: String,
//     phone: String,
//         houseNo: String,
//             street: String,
//                 landmark: String,
//                     city: String,
//                         country: String,
//                             postalCode: String

const Address = () => {
    const [state, setState] = useContext(AuthContext)
    const user = state.user;
    // console.log(user)
    const userId = user._id;
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState("")
    const [houseno, setHouseNo] = useState("")
    const [street, setStreet] = useState("")
    const [landmark, setLandmark] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("India")
    const navigation = useNavigation()


    // console.log(userId)

    const handleAddress = async () => {
        const address = {
            name,
            phone,
            houseno,
            street,
            landmark,
            city,
            country,
            postalCode
        }
        try {
            setLoading(true);
            const { data } = await axios.post(
                "user/add-address",
                { userId, address }
            );
            // console.log(data)
            setCountry("")
            setName("")
            setPhone("")
            setHouseNo("")
            setStreet("")
            setLandmark("")
            setCity("")
            setPostalCode("")
            Alert.alert("Success", "Address add successfully")
            setLoading(false)
            navigation.navigate('Checkout')
            // console.log("Login Data==> ", { userData });
        } catch (error) {
            Alert.alert("Error", error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.header}>
                <Text style={{ color: "#000000", fontSize: 18, fontWeight: "700" }}>Address New Address</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.lable}>Country Name</Text>
                    <TextInput style={styles.inputBox}
                        value={country}
                        onChangeText={(txt) => { setCountry(txt) }}
                        inputMode='text'
                        placeholder='Country name' />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.lable}>Full Name (First name/ Last name)</Text>
                    <TextInput style={styles.inputBox}
                        value={name}
                        onChangeText={(txt) => { setName(txt) }}
                        inputMode='text'
                        placeholder='Your full name name' />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.lable}>Mobile number</Text>
                    <TextInput style={styles.inputBox}
                        value={phone}
                        onChangeText={(txt) => { setPhone(txt) }}
                        inputMode='tel'
                        placeholder='Mobile no' />
                </View><View style={styles.rowContainer}>
                    <Text style={styles.lable}>Flat,House No, Building,Company</Text>
                    <TextInput style={styles.inputBox}
                        value={houseno}
                        onChangeText={(txt) => { setHouseNo(txt) }}
                        inputMode='text'
                        placeholder='House no' />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.lable}>Area, Street, sector, village</Text>
                    <TextInput style={styles.inputBox}
                        value={street}
                        onChangeText={(txt) => { setStreet(txt) }}
                        inputMode='text'
                        placeholder='Area , street,Locality' />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.lable}>Landmark</Text>
                    <TextInput style={styles.inputBox}
                        value={landmark}
                        onChangeText={(txt) => { setLandmark(txt) }}
                        inputMode='text'
                        placeholder='eg. near GV public school' />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.lable}>City</Text>
                    <TextInput style={styles.inputBox}
                        value={city}
                        onChangeText={(txt) => { setCity(txt) }}
                        inputMode='text'
                        placeholder='eg. Bahadurgarh' />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.lable}>Pincode</Text>
                    <TextInput style={styles.inputBox}
                        value={postalCode}
                        onChangeText={(txt) => { setPostalCode(txt) }}
                        inputMode='numeric'
                        placeholder='Enter Pincode' />
                </View>
                <Pressable style={styles.btn}
                    onPress={() => {
                        if (name !== '' && phone !== '' && houseno !== ''
                            && street !== '' && landmark !== '' && postalCode !== '') {
                            handleAddress()
                        } else {
                            Alert.alert("Please enter all credentials")
                        }
                    }
                    }
                >
                    <Text style={{ color: "#000000", fontSize: 19, fontWeight: "600" }}>{loading ? "Please Wait ...." : "Add Address"
                    }</Text>
                </Pressable>
            </View>

        </ScrollView>
    )
}

export default Address


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#a4e50f",
        height: 40,
        width: Dimensions.get('window').width,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
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
    btn: {
        height: 40,
        width: "50%",
        backgroundColor: "#a4e50f",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 20,
    }
})