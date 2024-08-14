import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeItemFromWishList } from '../redux/slices/WishlistSlice';
import clear from '../assets/images/clear.png'
import { imagePath } from '../../App';

const WishList = () => {
    const items = useSelector(state => state.wishlist);
    const [wiishlistItems, setWishlistItems] = useState(items.data)
    const navigation = useNavigation()
    const dispatch = useDispatch();

    useEffect(() => {
        setWishlistItems(items.data);
    }, [items]);

    return (
        <View style={styles.container}>
            <FlatList data={wiishlistItems}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { navigation.navigate('Productdetail', { data: item }) }}
                            style={styles.productItem}>
                            <Image source={{ uri: `${imagePath}${item.image}` }} style={styles.itemImage} />
                            <View style={{ marginTop: 10 }}>
                                <View style={{ width: 170 }}>
                                    <Text style={styles.name}>
                                        {item.name.length > 25
                                            ? item.name.substring(0, 25) + '...' : item.name}
                                    </Text>
                                    <Text style={styles.desc}>
                                        {item.description.length > 30
                                            ? item.description.substring(0, 40) + '...' : item.description} ...more
                                    </Text>
                                    <Text style={styles.price}>
                                        Rs. {item.price}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.clearImg}
                                onPress={() => {
                                    dispatch(removeItemFromWishList(index))

                                }}>
                                <Text style={{ color: "#000000", fontSize: 14, fontWeight: "500" }}>Remove</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )
                }} />
            {wiishlistItems.length < 1 && (
                <View style={styles.noItems}>
                    <Text>No Items in Wishlist</Text>
                </View>
            )}
        </View>
    )
}

export default WishList

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    productItem: {
        width: Dimensions.get('window').width - 10,
        height: "auto",
        marginTop: 3,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: "center",
        marginLeft: 2,
        border: "#0000",
        borderWidth: 0.5,
    },
    itemImage: {
        width: 65,
        height: 70,
        borderRadius: 20,
        padding: 10,
        objectFit: "contain"
    },
    name: {
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 20,
        marginBottom: 5,
        color: "#000000"
    },
    desc: {
        marginLeft: 20,
    },
    price: {
        color: '#8fce00',
        fontSize: 20,
        fontWeight: '800',
        marginLeft: 20,
        marginTop: 5,
        marginRight: 30
    },
    clearImg: {
        backgroundColor: "#f44336",
        height: 30,
        width: "22%",
        padding: 3,
        alignSelf: "center",
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginLeft: 22
    },
    noItems: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }

})