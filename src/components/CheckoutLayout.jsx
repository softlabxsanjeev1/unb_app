import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CheckoutLayout = ({ total, items }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                <Text style={{ fontWeight: "500", fontSize: 16 }}>{`No of Items : ${items.length}`}</Text>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>{`Sub Price : ${total} Rs`}</Text>
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={styles.checkout}
                    onPress={() => {
                        navigation.navigate("Checkout")
                    }}
                >
                    <Text style={{ color: "#fff" }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        height: 70,
        width: Dimensions.get('window').width,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 5
    },
    tab: {
        width: '60%',
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingStart: 20,
        marginLeft: 20
    },
    checkout: {
        width: "70%",
        height: '60%',
        backgroundColor: "#8fce00",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 5
    }
})


export default CheckoutLayout