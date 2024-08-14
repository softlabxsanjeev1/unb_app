import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import PrivecyPolicy from './src/screens/PrivecyPolicy';
import Checkout from './src/screens/Checkout';
import ProductDetail from './src/screens/ProductDetail';
import Profile from './src/screens/Profile';
import VerifyOtp from './src/screens/VerifyOtp';
import Address from './src/screens/Address';
import OrderSuccess from './src/screens/OrderSuccess';
import Notification from './src/screens/Notification';
import MyOrders from './src/screens/MyOrders';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Verifyotp" component={VerifyOtp} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="Privacypolicy" component={PrivecyPolicy} options={{ headerShown: true }} />
                <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: true }} />
                <Stack.Screen name="Productdetail" component={ProductDetail} options={{ headerShown: true }} />
                <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
                <Stack.Screen name="Notification" component={Notification} options={{ headerShown: true }} />
                <Stack.Screen name="Myorders" component={MyOrders} options={{ headerShown: true }} />
                <Stack.Screen name="Ordersuccess" component={OrderSuccess} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation