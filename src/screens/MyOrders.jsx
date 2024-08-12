import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const MyOrders = () => {
    const [state, setState] = useContext(AuthContext)
    const user = state.user;
    // console.log(user)
    // console.log(JSON.stringify(state.token))
    const userId = user._id;
    const [orders, setOrders] = useState([])


    const getAllOrders = async (userId) => {
        try {
            const { data } = await axios.get("user/get-my-order",
                {
                    method: 'post',
                    data: userId
                });
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllOrders()
    }, []);
    return (
        <View>
            <Text>MyOrders</Text>
        </View>
    )
}

export default MyOrders