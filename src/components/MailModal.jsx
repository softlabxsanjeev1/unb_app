import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const MailModal = ({ mailModalVisible, setMailModalvesible }) => {
    const [mailId, setMailId] = useState();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    const sendEmail = async () => {
        try {
            let email = await JSON.stringify(mailId)
            // console.log(email)
            setLoading(true);
            const response = await axios.post(
                "user/forgot-password",
                { email }
            );
            // console.log(response.data.email)
            await AsyncStorage.setItem('email', JSON.stringify(response.data.email));
            setLoading(false)
            navigation.navigate('Verifyotp')
            setMailModalvesible(false)
            // console.log(AsyncStorage.getItem("email"))
            // console.log("Login Data==> ", { userData });
        } catch (error) {
            alert(error.response);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={mailModalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setMailModalvesible(!mailModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
                        <Text style={styles.modalText}>Enter Mail To Send OTP</Text>
                        <TextInput
                            style={styles.inputBox}
                            value={mailId}
                            inputMode="text"
                            onChangeText={(text) => {
                                setMailId(text);
                            }}
                            placeholder="Enter mail Id"
                        />
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                if (mailId !== '') {
                                    sendEmail()
                                } else {
                                    Alert.alert("Please enter email")
                                }
                            }}
                        >
                            <Text style={styles.textStyle}>
                                {loading ? "Please Wait" : "Send"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },
    modalView: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    inputBox: {
        borderWidth: 1,
        height: 35,
        paddingLeft: 10,
        borderRadius: 3,
        marginBottom: 20,
        width: "80%",
        alignSelf: "center"
    },
    btnContainer: {
        flexDirection: "row",
    },

    button: {
        height: 35,
        width: "40%",
        backgroundColor: "#a4e50f",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 10
    },
    modalText: {
        marginBottom: 25,
        textAlign: "center",
        fontSize: 19,
        fontWeight: "700",
        color: "#000000"
    },
    textStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000000"
    }
});


export default MailModal