import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { categoriesData } from '../data/CategoriesData'

const Category = () => {
  const navigation = useNavigation()
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.container}>
      {categoriesData.map((item) => (
        <View key={item._id} >
          <TouchableOpacity style={styles.catContainer}
            // onPress={() => navigation.navigate(item.path)}
            onPress={() => navigation.navigate('about')}
          >
            <Image source={item.icon} style={styles.catIcon} />
            <Text style={styles.catTitle} >{item.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

export default Category


const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  catContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  catIcon: {
    height: 36,
    width: 38,
    borderRadius: 50,
  },
  catTitle: {
    fontSize: 12,
  }
})