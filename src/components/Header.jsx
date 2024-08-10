import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
const { height, width } = Dimensions.get('window');

const Header = () => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/unlogo.png')} />
            <Text style={styles.logotxt}>Unique Bajar</Text>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Image style={styles.userIcon} source={require('../assets/images/user-icon.png')} />
                {/* <Text style={{ color: "#000000", fontWeight: "500" }}>{user.name}</Text> */}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: width,
        marginHorizontal: 0.5,
        backgroundColor: "#8fce00",
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    userIcon: {
        height: 26,
        width: 26,
        borderRadius: 50
    },
    logotxt: {
        fontSize: 20,
        fontWeight: "600"
    }
})