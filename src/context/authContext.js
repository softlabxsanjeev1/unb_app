import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//context
const AuthContext = createContext();

//provider  fun thah manages tha value
const AuthProvider = ({ children }) => {
    // global state
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    let token = state && state.token;

    // default axios setting
    axios.defaults.baseURL = "http://192.168.0.193:4000/api/";
    // for server
    // axios.defaults.baseURL = "https://react-native-server-xduw.onrender.com/api/v1";


    //initial local storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem("token");
            let loginData = JSON.parse(data);
            setState({ ...state, user: loginData?.user, token: loginData?.token });
        };
        loadLocalStorageData();
    }, []);

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }