import { View, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from '../components/Category'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { imagePath } from '../../App';
const { height, width } = Dimensions.get('window');

const Products = () => {
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showCat, setShowCat] = useState(false)
    const [searchedList, setSearchedList] = useState([]);
    const navigation = useNavigation();

    // get all categopries 
    const getAllCategories = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/category/get-category`);
            // console.log(data)
            setLoading(false);
            setCategories(data.category);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    // get products on the bases of keywords 
    const getSearchproducts = async () => {
        console.log(search)
        try {
            setLoading(true);
            let products = await axios.get(`/user/search-keyword/${search}`);
            // console.log(products.data)
            setLoading(false);
            setSearchedList(products.data.products);
            console.log(searchedList)
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (search != "") {
            getSearchproducts()
        } else {
            setSearchedList("")
        }
    }, [search]);
    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                <View style={styles.searchView}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={require('../assets/images/search.png')} style={styles.icon} />
                        <TextInput
                            value={search}
                            onChangeText={txt => { setSearch(txt) }}
                            placeholder='Serch items ....' style={styles.input} />
                    </View>
                    {search !== '' && (
                        <TouchableOpacity style={[styles.icon, { justifyContent: 'center', alignItems: 'center' },]}
                            onPress={() => {
                                setSearch('');
                                setSearchedList("")
                            }}>
                            <Image source={require('../assets/images/clear.png')}
                                style={[styles.deleteIcon]}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <Pressable style={styles.btnContainer}
                    onPress={() => {
                        setShowCat(!showCat)
                        getAllCategories()
                    }}>
                    <Text style={{ fontWeight: "900", color: "#4ca0ec", fontSize: 16 }}>Category</Text>
                    <Image source={require('../assets/images/down.png')} style={styles.dropdown} />
                </Pressable>
            </View>
            <View style={{ height: "auto" }}>
                {showCat && (
                    <Category data={categories} setSearchedList={setSearchedList} />
                )}
                <View style={{ borderWidth: 0.3, borderColor: "#000000", width: "100%" }}></View>
            </View>
            <View style={styles.productContainer}>
                {searchedList.length > 0 ? (<FlatList
                    data={searchedList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Productdetail', { data: item }) }}
                            >
                                <View style={styles.card}>
                                    <Image source={{ uri: `${imagePath}${item.image}` }} style={styles.cardImage} />
                                    <View style={{ flexDirection: "column" }}>
                                        <Text style={styles.cardname}>{item.name.length > 25
                                            ? item.name.substring(0, 25) + '...' : item.name}</Text>
                                        <Text style={styles.cardDesc}>{item.description.length > 30
                                            ? item.description.substring(0, 60) + '...' : item.description} ...more</Text>
                                        <Text style={styles.price}>{'Rs. ' + item.price}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />) : (<View style={styles.noItem}>
                    <Image source={require('../assets/images/notfound.png')} style={styles.errorImg} />
                    <Text style={{ fontSize: 17, fontWeight: "700", color: "#000000" }}>Now Item present of this category</Text>
                </View>)
                }

            </View>
        </View>
    )
}

export default Products

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        width: Dimensions.get('window').width - 3,
        height: Dimensions.get('window').height,
        backgroundColor: "#f3f6f4",
    },
    btnContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 6,
        borderRadius: 20
    },
    dropdown: {
        height: 25,
        width: 25,
    },
    searchView: {
        width: Dimensions.get('window').width - 110,
        height: 42,
        borderRadius: 20,
        borderWidth: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        alignItems: "center",
        marginVertical: 7,
        marginLeft: 15,
        marginRight: 10
    },
    productContainer: {
        width: Dimensions.get('window').width - 5,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#f3f6f4",
        justifyContent: "center"
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: "center"
    },
    deleteIcon: {
        width: 20,
        height: 20,
        resizeMode: "center",
        tintColor: "#e97870"
    },
    input: {
        width: '62%',
        marginLeft: 9,
    },
    noItem: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40%"
    },
    errorImg: {
        height: 50,
        width: 55,
        marginBottom: 20
    },
    card: {
        borderWidth: 1,
        borderColor: "lightgray",
        marginVertical: 3,
        marginHorizontal: 3,
        width: "auto",
        padding: 5,
        backgroundColor: "#ffffff",
        flexDirection: "row"
    },
    cardImage: {
        height: 75,
        width: 70,
        marginBottom: 7,
        resizeMode: "contain",
        marginRight: 10
    },
    cardname: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 3,
        color: "black"
    },
    cardDesc: {
        fontSize: 12,
        textAlign: "left",
    },
    price: {
        fontSize: 17,
        fontWeight: "700",
        marginTop: 5,
        color: "red"
    }

})