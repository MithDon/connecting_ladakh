import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import { theme } from '../core/theme'
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;
export default function Background({ children }) {


  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="contain"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 15,
    width: '100%',
    backgroundColor: '#fff',
   
  },
  container: {
    flex: 1,
    padding: 20,
    width: windowWidth,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
