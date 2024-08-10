import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from '../redux/slices/CartSlice';
import clear from '../assets/images/clear.png'
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
    // console.log(JSON.stringify(cartItems))
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
                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: 305 }}>
                                    <View>
                                        <Text style={styles.name}>
                                            {item.name.length > 25
                                                ? item.name.substring(0, 25) + '...' : item.name}
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        dispatch(removeItemFromCart(index))
                                    }}>
                                        <Image style={styles.clearImg} source={clear} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.qtyview}>
                                    <Text style={styles.price}>{'Rs. ' + item.price}</Text>
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
        width: Dimensions.get('window').width - 7,
        height: 100,
        marginTop: 3,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: "center",
        border: "#0000",
        borderWidth: 0.5,
        marginLeft: 3,
        borderRadius: 8
    },
    itemImage: {
        width: 60,
        height: 90,
        borderRadius: 20,
        padding: 10,
        objectFit: "contain"
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 20,
        marginBottom: 7,
        color: "#000000"
    },
    price: {
        color: '#8fce00',
        fontSize: 20,
        fontWeight: '800',
        marginLeft: 20,
        marginTop: 5,
        marginRight: 30
    },
    qtyview: {
        flexDirection: "row",
        alignItems: "center"
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 10,
    },
    btnQty: {
        backgroundColor: "lightgray",
        width: 40,
        alignItems: "center",
        marginHorizontal: 10,
    },
    btnQtyText: {
        fontSize: 20,
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
    clearImg: {
        height: 25,
        width: 25,
        tintColor: "#f43e31",
        marginTop: 6,
        marginRight: 25
    },
    noItems: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }

})