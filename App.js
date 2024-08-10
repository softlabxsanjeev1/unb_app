import React from 'react'
import Navigation from './Navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { AuthProvider } from './src/context/authContext'

export const imagePath = "http://192.168.0.193:4000/"

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </AuthProvider>
    </GestureHandlerRootView>

  )
}

export default App