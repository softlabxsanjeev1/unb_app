import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Hometab from '../tabs/Hometab';
import Products from '../tabs/Products';
import WishList from '../tabs/WishList';
import Cart from '../tabs/Cart';
import Account from '../tabs/Account';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const cartItems = useSelector(state => state.cart);
    const wishListItems = useSelector(state => state.wishlist)
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            {/* upper area from bottom tab  */}
            {
                selectedTab == 0 ? (
                    <Hometab />
                ) : selectedTab == 1 ? (
                    <Products />
                ) : selectedTab == 2 ? (
                    <WishList />
                ) : selectedTab == 3 ? (
                    <Cart />
                ) : (
                    <Account />
                )
            }
            <View style={styles.bottomTabView}>
                <TouchableOpacity
                    style={styles.bottomTab}
                    onPress={() => {
                        setSelectedTab(0)
                    }}>
                    <Image source={selectedTab == 0 ? require('../assets/images/homefill.png') : require('../assets/images/home.png')} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomTab}
                    onPress={() => {
                        setSelectedTab(1)
                    }}>
                    <Image source={selectedTab == 1 ? require('../assets/images/productfill.png') : require('../assets/images/product.png')} style={styles.bottomIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomTab}
                    onPress={() => {
                        setSelectedTab(2)
                    }}>
                    <Image source={selectedTab == 2 ? require('../assets/images/wishlistfill.png') : require('../assets/images/wishlist.png')} style={styles.bottomIcon} />
                    <View style={{
                        width: 22, height: 22, borderRadius: 10,
                        backgroundColor: "#ea2222", position: 'absolute', right: 10, top: 4,
                        justifyContent: "center", alignItems: "center"
                    }}>
                        <Text style={{ color: "#000" }}>{wishListItems.data.length}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomTab}
                    onPress={() => {
                        setSelectedTab(3)
                    }}>
                    <Image source={selectedTab == 3 ? require('../assets/images/cartfill.png') : require('../assets/images/cart.png')} style={styles.bottomIcon} />
                    <View style={{
                        width: 22, height: 22, borderRadius: 10,
                        backgroundColor: "#ea2222", position: 'absolute', right: 10, top: 4,
                        justifyContent: "center", alignItems: "center"
                    }}>
                        <Text style={{ color: "#000" }}>{<Text style={{ color: "#000" }}>{cartItems.data.length}</Text>}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomTab}
                    onPress={() => {
                        setSelectedTab(4)
                    }}>
                    <Image source={selectedTab == 4 ? require('../assets/images/userfill.png') : require('../assets/images/user.png')} style={styles.bottomIcon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomTabView: {
        flexDirection: "row",
        height: 55,
        width: '100%',
        backgroundColor: '#fff',
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    bottomIcon: {
        width: 27,
        height: 27,

    },
})