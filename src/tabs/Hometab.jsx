import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from '../components/Category'
import Banner from '../components/Banner'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { imagePath } from '../../App'
const { height, width } = Dimensions.get('window');

const Hometab = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const colums = 2
    // console.log(products)


    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/admin/get-all-product`);
            // console.log(data)
            setLoading(false);
            setProduct(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };


    useEffect(() => {
        getAllProducts()
    }, []);


    return (
        <SafeAreaView>
            <Category />
            <ScrollView style={{ height: width * 1.47, backgroundColor: "#ffffff" }}>
                <View>
                    <Banner />
                </View>
                <View style={[styles.container]}>
                    <FlatList numColumns={colums}
                        data={product}
                        scrollEnabled
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.card}>
                                    <Image source={{ uri: `${imagePath}${item.image}` }} style={styles.cardImage} />
                                    <Text style={styles.cardTitle}>{item.name.length > 25
                                        ? item.name.substring(0, 25) + '...' : item.name}</Text>
                                    <Text style={styles.cardDesc}>{item.description.length > 30
                                        ? item.description.substring(0, 30) + '...' : item.description} ...more</Text>
                                    <Text style={styles.price}>{'Rs. ' + item.price}</Text>
                                    <View style={styles.BtnContainer}>
                                        <TouchableOpacity
                                            style={styles.btn}
                                            onPress={() => { navigation.navigate('Productdetail', { data: item }) }}
                                        >
                                            <Text style={styles.btnText}>Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>)
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Hometab

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: width,
        flexWrap: "wrap",
        backgroundColor: "#f3f6f4",
        justifyContent: "center"
    },
    card: {
        borderWidth: 1,
        borderColor: "lightgray",
        marginVertical: 2,
        marginHorizontal: 5,
        width: "46%",
        padding: 5,
        backgroundColor: "#ffffff",
        justifyContent: "center",
    },
    cardImage: {
        height: 81,
        width: "92%",
        marginBottom: 7,
        resizeMode: "contain"
    },
    cardTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 3,
        color: "#000000"
    },
    cardDesc: {
        fontSize: 11,
        textAlign: "left",
    },
    BtnContainer: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#8fce00",
        height: 25,
        width: "98%",
        borderRadius: 5,
        justifyContent: "center",
    },
    btnText: {
        color: "#f3f6f4",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
    },
    price: {
        fontSize: 17,
        fontWeight: "700",
        marginTop: 5,
        color: "red"
    }
})