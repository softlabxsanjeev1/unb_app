import { View, Text, Dimensions, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const MyOrders = () => {
    const [state, setState] = useContext(AuthContext)
    const user = state.user;
    // console.log(user)
    // console.log(JSON.stringify(state.token))
    const userId = user._id;
    const [orders, setOrders] = useState([])


    const getAllOrders = async () => {
        try {
            const response = await axios.get(`user/get-my-order/${userId}`);
            // console.log(response.data.orders)
            setOrders(response.data.orders)
            // console.log(orders)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllOrders()
    }, []);
    return (
        <ScrollView style={{ padding: 5 }}>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <View key={order._id} style={styles.container}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 2, marginBottom: 5 }}>
                            <Text style={styles.txt3}>Order Placed : {order.createdAt.substring(0, 10)}</Text>
                            <Text style={{ fontSize: 15, fontWeight: "800", color: "#f44336" }}>{order.status}</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5 }}>
                                <Text style={styles.txt3}>Item Name</Text>
                                <Text style={styles.txt3}>Quantity</Text>
                                <Text style={styles.txt3}>Price</Text>
                            </View>
                            {order.products?.map((product) => (
                                <View key={product._id}>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={styles.txt2}>{product.name.substring(0, 10)}</Text>
                                        <Text style={styles.txt2}>{product.quantity}</Text>
                                        <Text style={styles.txt2}>{product.price}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View style={styles.addressContainer}>
                            <View style={{ flexDirection: "column" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ color: "#000000", fontSize: 17, fontWeight: "700", marginBottom: 5 }}>Delivery address</Text>
                                    <Image style={styles.locImage} source={require('../assets/images/location.png')} />
                                </View>
                                <Text style={styles.txt3}>{order.shippingAddress.name}</Text>
                                <Text style={styles.txt2}>{order.shippingAddress.phone}</Text>
                                <Text style={styles.txt2}>{order.shippingAddress.houseno} {order.shippingAddress.street} {order.shippingAddress.landmark} {order.shippingAddress.city}</Text>
                                <Text style={styles.txt2}>{order.shippingAddress.postalCode} {order.shippingAddress.statename} {order.shippingAddress.country}</Text>
                            </View>
                            <View style={styles.total}>
                                <Text style={styles.txt3}>Total</Text>
                                <Text style={styles.txt3}>Rs. {order.totalPrice}</Text>
                            </View>
                        </View>

                    </View>
                ))
            ) : (
                <Text>No item available</Text>
            )}
        </ScrollView>
    )
}

export default MyOrders

const styles = StyleSheet.create({

    container: {
        height: "auto",
        width: Dimensions.get('window').width - 10,
        border: "#0000",
        borderWidth: 0.5,
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: "#cfe2f3"
    },
    locImage: {
        height: 20,
        width: 20,
        borderRadius: 100,
        backgroundColor: "#eeeeee",
        marginLeft: 10
    },
    itemContainer: {
        backgroundColor: "#eeeeee",
        paddingVertical: 5,
        marginVertical: 3,
        borderRadius: 5,
        paddingHorizontal: 15

    },
    addressContainer: {
        border: "#f3f6f4",
        backgroundColor: "#eeeeee",
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    txt2: {
        fontSize: 14,
        color: "#000000",
        fontWeight: "500"
    },
    txt3: {
        color: "#000000",
        fontSize: 17,
        fontWeight: "700"
    },
    total: {
        flexDirection: "row",
        height: "auto",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#e46e65",
        paddingVertical: 5,
        marginVertical: 6,
        borderRadius: 5,
        paddingHorizontal: 15
    }

})