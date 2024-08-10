import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList, Image, Pressable, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../redux/slices/CartSlice';
import { imagePath } from '../../App';
import clear from '../assets/images/clear.png'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Checkout = () => {
    const [state, setState] = useContext(AuthContext)
    const user = state.user;
    // console.log(user)
    const userId = user._id;
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addressLoading, setaddressLoading] = useState(false)
    const [userAddress, setUserAddress] = useState([])
    const [selectedAddress, setSelectedAddress] = useState()

    const navigation = useNavigation();
    const items = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch();


    const fetchUserAddress = async () => {
        try {
            setaddressLoading(true);
            const { data } = await axios.get("user/get-all-addresses", { userId });
            console.log(data)
            setaddressLoading(false);
            // setUserAddress(data);
            console.log(userAddress)
        } catch (error) {
            setaddressLoading(false);
            setVisible(false)
            Alert.alert("Error", "Unable to fetch addresses")
            console.log(error);
        }
    }

    useEffect(() => {
        setCartItems(items.data);
    }, [items]);
    // console.log(JSON.stringify(cartItems))
    const total = getTotal = () => {
        let total = 0;
        cartItems.map(item => {
            total = total + item.qty * item.price
        })
        return total.toFixed(0)
    }



    const handlePayment = () => {
        var options = {
            description: 'Purchase Our Unique Bazar Product',
            currency: 'INR',
            key: 'rzp_test_f0OZHGJrgtUxhn', // Your api key
            amount: (total() * 100),
            name: 'Unique Bazar',
            prefill: {
                email: 'sanjeev7056480@gmail.com',
                contact: '9191919191',
                name: 'Unique Bazar'
            },
            theme: { color: '#2986cc' }
        }
        RazorpayCheckout.open(options).then((data) => {
            alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            alert(`Error: ${error.code} | ${error.description}`);
        })
        alert("Your Redirecting to payment gateway");
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: "#7fb209", fontSize: 24, alignSelf: "center", fontWeight: "500", marginVertical: 10 }}>Purcahesed Items List</Text>
            <View style={styles.purchaseContainer}>
                <FlatList data={cartItems} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { navigation.navigate('Productdetail', { data: item }) }}
                            style={styles.productItem}>
                            <Image source={{ uri: `${imagePath}${item.image}` }} style={styles.itemImage} />
                            <View>
                                <View>
                                    <Text style={styles.name}>
                                        {item.name.length > 25
                                            ? item.name.substring(0, 25) + '...' : item.name}
                                    </Text>
                                </View>
                                <View style={styles.qtyview}>
                                    <Text style={styles.price}>{'Rs. ' + item.price}</Text>
                                    <Text style={styles.btnQtyText}>Qty : {item.qty}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                dispatch(removeItemFromCart(index))
                            }}>
                                <Image style={styles.clearImg} source={clear} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginHorizontal: 20 }}>
                <Text style={{ color: "#000000", fontSize: 17, fontWeight: "500" }}>Delivery address</Text>
                <Pressable onPress={() => navigation.navigate("Address")}>
                    <Text style={{ color: "#f44336", fontSize: 16, fontWeight: "500" }}> + Add New Address</Text>
                </Pressable>
            </View>
            <View style={styles.selectedAddressContainer}>
                <Text>Selected address detail</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, marginHorizontal: 20 }}>
                <Pressable style={styles.changeBtn}
                    onPress={() => setVisible(false)}
                >
                    <Text style={{ color: "#f3f6f4", fontSize: 15, fontWeight: "600" }}>Set Address</Text>
                </Pressable>
                <Pressable style={styles.changeBtn}
                    onPress={() => {
                        setVisible(true)
                        fetchUserAddress()
                    }}
                >
                    <Text style={{ color: "#f3f6f4", fontSize: 15, fontWeight: "600" }}
                    >Choose Address</Text>
                </Pressable>
            </View>

            {visible && (
                <View style={styles.addressContainer}>
                    <ScrollView horizontal>
                        { }
                    </ScrollView>
                </View>
            )}
            <View style={styles.container2}>
                <View style={styles.tab}>
                    <Text style={{ fontWeight: "500", fontSize: 18 }}>{`Qty : ${cartItems.length}`}</Text>
                    <Text style={{ fontWeight: "700", fontSize: 18 }}>{`Total : ${total()} Rs`}</Text>
                </View>
                <TouchableOpacity style={styles.checkout}
                    onPress={() => {
                        onPress = { handlePayment }
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 22, fontWeight: "600" }}>Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        color: "#000000",
        fontWeight: "500"
    },
    detailsection: {
        marginTop: 5,
        height: "auto",
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    smallbox: {
        paddingLeft: 15,
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 6,
        width: '38%',
        textAlignVertical: 'top',
        height: 38
    },
    mediumbox: {
        paddingLeft: 15,
        marginTop: 8,
        borderWidth: 1,
        borderRadius: 6,
        width: '55%',
        textAlignVertical: 'top',
        height: 38

    },
    inputStyle: {
        paddingLeft: 15,
        marginTop: 6,
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        textAlignVertical: 'top',
        height: 40
    },
    purchaseContainer: {
        height: 105,
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
        padding: 5,
        backgroundColor: "#cfe2f3",
        borderRadius: 10,
    },
    productItem: {
        width: Dimensions.get('window').width - 32,
        height: 55,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: "center",
        border: "#0000",
        borderWidth: 0.5,
        borderRadius: 10,
        justifyContent: "space-between",
        marginBottom: 5
    },
    itemImage: {
        width: 50,
        height: 90,
        borderRadius: 20,
        objectFit: "contain",
        marginVertical: 10,
        marginRight: -50
    },
    name: {
        fontSize: 16,
        color: "#000000",
        fontWeight: '500',

    },
    price: {
        color: '#8fce00',
        fontSize: 17,
        fontWeight: '800',

    },
    qtyview: {
        flexDirection: "row",
        alignItems: "center",
        gap: 30
    },

    btnQtyText: {
        fontSize: 15,
        fontWeight: "700"
    },

    clearImg: {
        height: 30,
        width: 23,
        tintColor: "#f44336",
        marginRight: 30,
    },
    container2: {
        position: "absolute",
        bottom: 0,
        height: 40,
        width: Dimensions.get('window').width,
        alignItems: "center",
        marginBottom: 110
    },
    tab: {
        width: '100%',
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    checkout: {
        width: "70%",
        height: '100%',
        backgroundColor: "#8fce00",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5
    },
    addressContainer: {
        height: 125,
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,

        padding: 5,
        backgroundColor: "#eeeeee",
        borderRadius: 10,
        marginTop: 10,
    },
    selectedAddressContainer: {
        marginTop: 10,
        height: 90,
        width: Dimensions.get('window').width - 30,
        marginLeft: 10,
        padding: 5,
        backgroundColor: "#f3f6f4",
        borderRadius: 10,
    },
    changeBtn: {
        height: 35,
        width: "40%",
        backgroundColor: "#1d87e7",
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"


    }
});
