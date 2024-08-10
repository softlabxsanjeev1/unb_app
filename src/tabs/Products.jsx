import { View, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, Dimensions, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import Category from '../components/Category'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const Products = () => {
    const [search, setSearch] = useState("");
    const [oldData, setOldData] = useState("");
    const [searchedList, setSearchedList] = useState(oldData);
    const navigation = useNavigation();

    // function to search item from list on the bases of title return partucar items those are match
    const filterData = txt => {
        let newData = oldData.filter(item => {
            return item.title.toLowerCase().match(txt.toLowerCase());
        });
        setSearchedList(newData);
    }
    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: "white" }}>
                <View style={styles.searchView}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={require('../assets/images/search.png')} style={styles.icon} />
                        <TextInput
                            value={search}
                            onChangeText={txt => {
                                setSearch(txt);
                                filterData(txt);
                            }}
                            placeholder='Serch items ....' style={styles.input} />
                    </View>
                    {search !== '' && (
                        <TouchableOpacity style={[styles.icon, { justifyContent: 'center', alignItems: 'center' },]}
                            onPress={() => {
                                setSearch('');
                                filterData('');
                            }}>
                            <Image source={require('../assets/images/clear.png')}
                                style={[styles.deleteIcon]}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <Category />
            <View style={{ height: width * 1.27, backgroundColor: "white" }}>
                <FlatList
                    data={searchedList}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Productdetail', { data: item }) }}
                            >
                                <View style={styles.card}>
                                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                                    <Text style={styles.cardTitle}>{item.name.length > 25
                                        ? item.name.substring(0, 25) + '...' : item.name}</Text>
                                    <Text style={styles.cardDesc}>{item.description.length > 30
                                        ? item.description.substring(0, 30) + '...' : item.description} ...more</Text>
                                    <Text style={styles.price}>{'Rs. ' + item.price}</Text>
                                    <View style={styles.BtnContainer}>
                                    </View>
                                </View>

                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

        </View>
    )
}

export default Products

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column"
    },
    searchView: {
        width: '90%',
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: "center",
        marginVertical: 10
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "center"
    },
    deleteIcon: {
        width: 20,
        height: 20,
        resizeMode: "center"
    },
    input: {
        width: '80%',
        marginLeft: 10,
    },
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
        marginLeft: 70,
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
        color: "black"
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
        color: "#ffffff",
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