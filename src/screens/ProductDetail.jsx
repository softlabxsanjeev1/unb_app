import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addItemToWishList } from "../redux/slices/WishlistSlice";
import { addItemToCart } from "../redux/slices/CartSlice";
import { imagePath } from "../../App";


const ProductDetail = () => {
    const [qty, setQty] = useState(1);
    const [modalVisible, setModalVisible] = useState(false)
    const [selected, setSelected] = useState(0)

    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Handle function for + -
    const handleAddQty = () => {
        if (qty === 10) return alert("you cant add more than 10 quantity");
        setQty((prev) => prev + 1);
    };

    const goBack = () => {
        navigation.navigate("Home")
    }
    const handleRemoveQty = () => {
        if (qty <= 1) return;
        setQty((prev) => prev - 1);
    };
    return (
        <ScrollView style={{ backgroundColor: "#ffffff" }}>
            <Image source={{ uri: `${imagePath}${route.params.data.image}` }} style={styles.image} />
            <TouchableOpacity style={styles.wishlistBtn}
                onPress={() => {
                    dispatch(addItemToWishList(route.params.data));
                    setSelected(!selected)
                    console.log("item added to wishlist")
                }}>
                <Image source={selected == 1 ? require('../assets/images/wishlistfill.png') : require('../assets/images/wishlist.png')}
                    style={styles.wishlistIcon} />
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.name}>{route.params.data.name}</Text>
                <Text style={styles.price}>Price : &#x20B9;{route.params.data.price} Rs.</Text>
                <Text style={styles.desc}>{route.params.data.description}</Text>
                <Text style={styles.rating}>Rating : {3}</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.btnCart}
                        // onPress={() => }
                        onPress={() => {
                            dispatch(
                                addItemToCart({
                                    id: route.params.data._id,
                                    name: route.params.data.name,
                                    productId: route.params.data.productId,
                                    image: route.params.data.image,
                                    description: route.params.data.description,
                                    price: route.params.data.price,
                                    qty: qty,
                                    rating: route.params.data.rating,
                                }),
                            );
                            // alert(`${qty} items added to cart`)
                            goBack()
                        }}
                    // disabled={pDetails?.quantity <= 0}
                    >
                        <Text style={styles.btnCartText}>
                            Add To Cart
                            {/* {pDetails?.quantity > 0 ? "ADD TO CART" : "OUT OF STOCK"} */}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
                            <Text style={styles.btnQtyText}>-</Text>
                        </TouchableOpacity>
                        <Text>{qty}</Text>
                        <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
                            <Text style={styles.btnQtyText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* <Text>Similar Products</Text> */}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    image: {
        height: 300,
        width: "100%",
        resizeMode: "contain",
        marginVertical: 10,
    },
    container: {
        marginVertical: 15,
        marginHorizontal: 5,
    },
    wishlistBtn: {
        position: "absolute",
        right: 20,
        top: 30,
        backgroundColor: '#f3f6f4',
        justifyContent: "center",
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    wishlistIcon: {
        width: 28,
        height: 28,
    },
    name: {
        fontSize: 25,
        textAlign: "left",
        color: "#000000",
        fontWeight: "600"
    },
    desc: {
        fontSize: 15,
        textTransform: "capitalize",
        textAlign: "justify",
        marginVertical: 10,
    },
    price: {
        fontSize: 24,
        color: "#cc0000",
        fontWeight: "700",
        marginTop: 10
    },
    rating: {
        fontSize: 15,
        color: "#000000",
        fontWeight: "700",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 10,
    },
    btnCart: {
        width: 180,
        backgroundColor: "#95d406",
        // marginVertical: 10,
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
    },
    btnCartText: {
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    btnQty: {
        backgroundColor: "#efe4e4",
        width: 40,
        alignItems: "center",
        marginHorizontal: 10,
    },
    btnQtyText: {
        fontSize: 20,
    },
});

export default ProductDetail