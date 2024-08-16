import { View, Text, TouchableOpacity, Dimensions, StyleSheet, FlatList, Image, Pressable, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart, removeItemFromCart } from '../redux/slices/CartSlice';
import { imagePath } from '../../App';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { addAddress } from '../redux/slices/AddressSlice';

const Checkout = () => {
    const [state, setState] = useContext(AuthContext)
    const addData = useSelector(state => state.address);
    const user = state.user;
    // console.log(user)
    // console.log(JSON.stringify(state.token))
    const userId = user._id;
    // console.log(userId)
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userAddresses, setUserAddresses] = useState([])
    const [deliveryAddress, setDeliveryAddress] = useState("")
    const [prevAddress, setPrevAddress] = useState(addData.data)
    // console.log(deliveryAddress.name)
    // console.log(deliveryAddress)

    const navigation = useNavigation();
    const items = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState([])
    const dispatch = useDispatch();
    const fetchUserAddress = async () => {
        try {
            const response = await axios.get(`user/get-addresses/${userId}`);
            // console.log(response.data.addresses)
            setUserAddresses(response.data.addresses);
            // console.log(userAddresses)
        } catch (error) {
            setVisible(false)
            Alert.alert("Error", "Unable to fetch addresses")
            console.log(error);
        }
    }

    useEffect(() => {
        setCartItems(items.data);
        setDeliveryAddress(addData?.data)
    }, [items]);
    // console.log(JSON.stringify(cartItems))
    const total = getTotal = () => {
        let total = 0;
        cartItems.map(item => {
            total = total + item.qty * item.price
        })
        return total.toFixed(0)
    }

    const handlePlaceOrder = async () => {
        setLoading(true)
        console.log("order palces")
        try {
            const orderData = {
                userId: userId,
                cartItems: cartItems,
                shippingAddress: deliveryAddress,
                totalPrice: total(),
            }

            const { data } = await axios.post("user/place-order", orderData)
            if (data) {
                await dispatch(cleanCart())
                Alert.alert("Success", "Order placed")
                navigation.navigate("Ordersuccess")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            Alert.alert("Error", "Error in order place")
        }

    }


    const handlePayment = async () => {
        if (deliveryAddress !== '' && cartItems !== '') {
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
            RazorpayCheckout.open(options).then(() => {
                // await setPaymentId(data.razorpay_payment_id)
                handlePlaceOrder()
                setLoading(false)
                // Alert.alert("Success", "Order placed success fully");
            }).catch((error) => {
                Alert.alert(`Error: ${error.code} | ${error.description}`);
            })
            Alert.alert("Your Redirecting to payment gateway");

        } else {
            Alert.alert("Error", "Please enter all credentials")
        }
    }

    return (
        <View style={styles.container}>
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
                                    <Text style={styles.btnQtyText}>Qty : {item.qty}</Text>
                                    <Text style={styles.price}>{'Rs. ' + item.price * item.qty}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.clearImg}
                                onPress={() => {
                                    dispatch(removeItemFromCart(index))
                                }}>
                                <Text style={{ color: "#f3f6f4", fontSize: 12, fontWeight: "700" }}>Remove</Text>
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
                <Text style={{ color: "#000000", fontSize: 17, marginBottom: 2, fontWeight: "700" }}>{deliveryAddress.name}</Text>
                <Text style={{ color: "#000000", fontSize: 13 }}>Phone no - {deliveryAddress.phone}</Text>
                <Text style={{ color: "#000000", fontSize: 13 }}>House no : {deliveryAddress.houseno} {deliveryAddress.street}</Text>
                <Text style={{ color: "#000000", fontSize: 13 }}>Near : {deliveryAddress.landmark}, {deliveryAddress.city}</Text>
                <Text style={{ color: "#000000", fontSize: 13 }}>{deliveryAddress.statename}  {deliveryAddress.postalCode}  {deliveryAddress.country}</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 5, marginVertical: 10, }}>
                    <Pressable
                        style={styles.clearBtn}
                        onPress={() => {
                            setDeliveryAddress("")
                        }
                        }
                    >
                        <Text style={{ color: "#f3f6f4", fontSize: 13, fontWeight: "600" }}>Clear</Text>
                    </Pressable>
                    <Pressable style={styles.changeBtn}
                        onPress={() => {
                            setVisible(!visible)
                            fetchUserAddress()
                        }}
                    >
                        <Text style={{ color: "#f3f6f4", fontSize: 13, fontWeight: "600" }}
                        >New address</Text>
                    </Pressable>
                </View>
            </View>
            {visible && (
                <View style={styles.addressContainer}>
                    <FlatList
                        data={userAddresses}
                        renderItem={({ item }) => {
                            return (
                                <View
                                    style={[styles.addresscard,
                                    { borderColor: deliveryAddress === item ? "#ea2f22" : "#bcbcbc" },
                                    { borderWidth: deliveryAddress === item ? 1.5 : 0.5 }
                                    ]}>
                                    <Pressable onPress={() => {
                                        setDeliveryAddress(item)
                                        dispatch(addAddress(item))
                                    }} key={item._id}>
                                        <Text style={styles.name}>{item?.name}</Text>
                                        <Text style={styles.phoneStyle}>{item?.phone}</Text>
                                        <Text style={styles.commontxt}>{item?.houseno}</Text>
                                        <Text style={styles.commontxt}>Near : {item?.landmark}</Text>
                                        <Text style={styles.commontxt}>{item?.street}, {item?.city}</Text>
                                        <Text style={styles.commontxt}>{item?.postalCode} ,{item?.statename}, {item?.country}</Text>
                                    </Pressable>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                        horizontal
                    />
                </View>
            )}
            <View style={styles.container2}>
                <Text style={{ fontWeight: "500", fontSize: 16, color: "#444444", alignSelf: "flex-start", marginBottom: 5 }}>{`Shipping to : ${user.name}`}</Text>
                <View style={styles.tab}>
                    <Text style={{ fontWeight: "700", fontSize: 14, color: "#000000" }}>Items Quantity</Text>
                    <Text style={{ fontWeight: "500", fontSize: 13, color: "#000000", marginRight: 10 }}>{`${cartItems.length}`}</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: "#000000", width: "101%" }}></View>
                <View style={styles.tab}>
                    <Text style={{ fontWeight: "700", fontSize: 14, color: "#000000" }}>Delivery Charges</Text>
                    <Text style={{ fontWeight: "500", fontSize: 13, color: "#000000" }}>{`0 Rs`}</Text>
                </View>
                <View style={{ borderWidth: 1, borderColor: "#000000", width: "101%" }}></View>
                <View style={styles.tab}>
                    <Text style={{ fontWeight: "700", fontSize: 14, color: "#000000" }}>Grand Total</Text>
                    <Text style={{ fontWeight: "700", fontSize: 13, color: "#000000" }}>{`${total()} Rs`}</Text>
                </View>
                <Pressable style={styles.checkout}
                    onPress={handlePayment}>
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>{loading ? "Please wait ...." : "Place order"}</Text>
                </Pressable>
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
    purchaseContainer: {
        height: 110,
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
        padding: 5,
        backgroundColor: "#eeeeee",
        borderRadius: 10,
    },
    productItem: {
        width: Dimensions.get('window').width - 32,
        height: 45,
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
        width: 35,
        height: 80,
        borderRadius: 20,
        objectFit: "contain",
        marginVertical: 10,
        marginRight: -40,
        marginLeft: 5
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
        backgroundColor: "#f44336",
        height: 30,
        width: "20%",
        padding: 3,
        alignSelf: "center",
        marginRight: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    container2: {
        position: "absolute",
        bottom: 0,
        height: "auto",
        width: Dimensions.get('window').width - 5,
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#eeeeee",
        marginLeft: 1,
        paddingBottom: 30,
        paddingTop: 5
    },
    tab: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    checkout: {
        width: "80%",
        height: 40,
        backgroundColor: "#8fce00",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5,
        marginTop: 5
    },
    addressContainer: {
        height: 140,
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
        padding: 5,
        backgroundColor: "#eeeeee",
        borderRadius: 10,
        marginTop: 10,
    },
    selectedAddressContainer: {
        marginTop: 5,
        height: "auto",
        width: Dimensions.get('window').width - 30,
        marginLeft: 10,
        padding: 5,
        backgroundColor: "#f3f6f4",
        borderRadius: 10,
        zIndex: 9
    },
    changeBtn: {
        height: 28,
        width: "40%",
        backgroundColor: "#1d87e7",
        alignSelf: "center",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    clearBtn: {
        backgroundColor: "#f44336",
        height: 28,
        width: "42%",
        padding: 3,
        alignSelf: "center",
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    addresscard: {
        height: 120,
        width: "auto",
        border: "#0000",
        borderWidth: 0.5,
        marginVertical: 5,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000000"

    },
    phoneStyle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#000000"
    },
    commontxt: {
        fontSize: 13,
        fontWeight: "400",
        color: "#000000"

    }
});
