import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from '../redux/slices/CartSlice';
import CheckoutLayout from '../components/CheckoutLayout';
import { imagePath } from '../../App';

const Cart = () => {
    const items = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState([])
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(items.data);
    }, [items]);
    console.log(JSON.stringify(cartItems))
    const getTotal = () => {
        let total = 0;
        cartItems.map(item => {
            total = total + item.qty * item.price
        })
        return total.toFixed(0)
    }
    return (
        <SafeAreaView>
            <View style={{ height: 616 }}>
                <FlatList data={cartItems} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { navigation.navigate('Productdetail', { data: item }) }}
                            style={styles.productItem}>
                            <Image source={{ uri: `${imagePath}${item.image}` }} style={styles.itemImage} />
                            <View style={{ paddingLeft: 15, paddingTop: 5 }}>
                                <View style={{ flexDirection: "row", }}>
                                    <Text style={styles.name}>
                                        {item.name.length > 25
                                            ? item.name.substring(0, 25) + '...' : item.name}
                                    </Text>
                                    <Text style={{ color: "#000000", fontSize: 16, marginLeft: 60, marginTop: 2 }}>Added Qty : {item.qty}</Text>
                                </View>
                                <Text style={styles.price}>{'Rs. ' + item.price}</Text>
                                <View style={styles.qtyview}>
                                    <View style={styles.btnContainer}>
                                        <TouchableOpacity style={styles.btnQty}
                                            onPress={() => {
                                                if (item.qty > 1) {
                                                    dispatch(reduceItemFromCart(item));
                                                } else {
                                                    dispatch(removeItemFromCart(index));
                                                }
                                            }}
                                        >
                                            <Text style={styles.btnQtyText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.qty}>{item.qty}</Text>
                                        <TouchableOpacity style={styles.btnQty}
                                            onPress={() => {
                                                dispatch(addItemToCart(item));
                                            }}>
                                            <Text style={styles.btnQtyText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.clearBtn}
                                        onPress={() => {
                                            dispatch(removeItemFromCart(index))
                                        }}>
                                        <Text style={{ color: "#f3f6f4", fontSize: 15, fontWeight: "600" }}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
                <View style={{ width: '95%', height: 1, alignSelf: "center", backgroundColor: "#6e6e6e" }}></View>
            </View>

            {cartItems.length < 1 && (
                <View style={styles.noItems}>
                    <Text>No Items in Cart</Text>
                </View>
            )}
            {cartItems.length > 0 && (
                <CheckoutLayout items={cartItems} total={getTotal()} />
            )}
        </SafeAreaView>
    )
}

export default Cart


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productItem: {
        width: Dimensions.get('window').width - 12,
        height: "auto",
        marginTop: 3,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: "center",
        border: "#0000",
        borderWidth: 0.5,
        marginLeft: 5,
        borderRadius: 8
    },
    itemImage: {
        width: 80,
        height: 110,
        borderRadius: 20,
        padding: 10,
        objectFit: "contain"
    },
    name: {
        fontSize: 20,
        fontWeight: '700',

        color: "#000000",
    },
    price: {
        color: '#8fce00',
        fontSize: 18,
        fontWeight: '800',
    },
    qtyview: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: -10,
        marginTop: -8
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    btnQty: {
        backgroundColor: "lightgray",
        width: 30,
        alignItems: "center",
        marginHorizontal: 13,
    },
    btnQtyText: {
        fontSize: 19,
        fontWeight: "600",
        color: "#000000"
    },
    qty: {
        fontSize: 19,
        fontWeight: "800",
        color: "#000000"
    },
    grandTotal: {
        borderWidth: 1,
        borderColor: "lightgray",
        backgroundColor: "#ffffff",
        padding: 5,
        margin: 5,
    },
    btnCheckout: {
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        backgroundColor: "#8fce00",
        width: "70%",
        borderRadius: 20,
        marginLeft: 50
    },
    btnCheckoutText: {
        color: "#eeeeee",
        fontWeight: "bold",
        fontSize: 18,
    },
    noItems: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    clearBtn: {
        backgroundColor: "#f44336",
        height: 35,
        width: "35%",
        padding: 3,
        alignSelf: "center",
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginLeft: 28
    }

})