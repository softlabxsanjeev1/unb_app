import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { imagePath } from '../../App'
import axios from 'axios';


const Category = ({ data, setSearchedList }) => {
  const [slug, setSlug] = useState("")
  const [loading, setLoading] = useState(false)
  //    get products according to category
  const getCategoryData = async () => {
    // console.log(slug)
    try {
      setLoading(true)
      const { data } = await axios.get(`/user/category-product/${slug}`);
      // console.log(data)
      setLoading(false)
      setSearchedList(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryData()
  }, [slug])
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.container}>
      {data.map((item) => (
        <View key={item._id} >
          <TouchableOpacity style={styles.catContainer}
            onPress={() => {
              setSlug(item.slug)
              getCategoryData()
            }}

          >
            <Image source={{ uri: `${imagePath}${item.image}` }} style={styles.catIcon} />
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