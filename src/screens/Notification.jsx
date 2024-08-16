import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Notification = () => {
    return (
        <View style={styles.noItem}>
            <Image source={require('../assets/images/notfound.png')} style={styles.errorImg} />
            <Text style={{ fontSize: 17, fontWeight: "700", color: "#000000" }}>Now Item present of this category</Text>
        </View>
    )
}

export default Notification


const styles = StyleSheet.create({
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
})