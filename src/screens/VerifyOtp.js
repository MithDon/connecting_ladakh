import React, { useState } from 'react'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { Alert } from 'react-native'
import { StyleSheet, ImageBackground, TouchableOpacity, View, Dimensions, BackHandler, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import TextInput from '../components/TextInput'
import { ApiClient } from "../../api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

let ScreenHeight = Dimensions.get("window").height;

export default function VerifyOtp({ route, navigation }) {
  const { otp, phoneNumber } = route.params;
  const [otpGbl, setOTP] = useState({ value: otp, error: '' })
  const [show,setShow] = useState(false);

  const handleBackPress = () => {
    navigation.navigate('LoginScreen')
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    })
  )

  const apiPath = ApiClient()
  const onVerifyUpPressed = () => {
    setShow(true);
    const body = JSON.stringify({
      phone_number: phoneNumber,
      otp: otpGbl.value,
    })

    apiPath.post('/login_with_otp', body)
      .then(response => {
        // Handle the successful response
       
        console.log('login response',response.data.data.user);
        console.log('login response id',typeof(response.data.data.user.id));
        console.log('login response id',response.data.data.user.id);
        if (response.data.status == "success") {
          setShow(false);
          AsyncStorage.setItem('token', response.data.data.token)
          AsyncStorage.setItem('email', response.data.data.user.email)
          AsyncStorage.setItem('name', response.data.data.user.name)
          AsyncStorage.setItem('phone', response.data.data.user.phone_number)
          AsyncStorage.setItem('userId',''+response.data.data.user.id)
          AsyncStorage.setItem('isUserLoggedin', JSON.stringify(true));

          navigation.navigate('SearchScreen');
        }
      })
      .catch(error => {
        // Handle errors, including token-related errors
        console.error('API Error:', error);
      });
  }

  const resendOTP = () => {
    setShow(true);
    const body = JSON.stringify({
      phone_number: phoneNumber,
    })

    apiPath.post('/resend_otp', body)
      .then(response => {
        setShow(false);
        // Handle the successful response
        setOTP({ value: response.data.data.otp, error: '' });
      })
      .catch(error => {
        // Handle errors, including token-related errors
        console.error('API Error:', error);
      });
  }
  return (
    <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps='handled'>
      <ActivityIndicator size={100} color={'yellow'} style={(show) ? styles.loading : styles.loadingHide} animating={show} />
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: 700, fontFamily: "Cabin-Medium", color: '#22272b', marginTop: 0 }}>
          Verify Your Mobile
        </Text>

        <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium", marginTop: 15, color: '#313639' }}>
          +91 {phoneNumber}
        </Text>

        <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium", textAlign: 'center', color: '#313639' }}>
          We've sent an One-time password {"\n"} on the above mobile no.
        </Text>

        <Text style={{ fontSize: 16, fontFamily: "Cabin-Medium", marginTop: 15, color: '#313639' }}>
          Please enter the 6 digit number below
        </Text>

        <TextInput
          style={styles.input}
          mode="flat"
          placeholder='ONE-TIME PASSWORD'
          placeholderTextColor="#9d9d9d"
          keyboardType='numeric'
          value={'' + otpGbl.value}
        />

        <Button
          mode="contained"
          uppercase={false}
          onPress={onVerifyUpPressed}
          style={{ marginTop: 24, backgroundColor: '#22272b', borderRadius: 10, fontFamily: "Cabin-Medium" }}
        >
          Verify
        </Button>

        <Text style={{ fontSize: 20, fontFamily: "Cabin-Medium", marginTop: 15, color: '#313639' }}>
          Didn't recieve any code?
        </Text>

        <TouchableOpacity onPress={resendOTP}>
          <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium", marginTop: 15, color: '#313639' }}>
            Recieve New OTP Code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium", marginTop: 13, color: '#313639' }}>
            Change Phone Number
          </Text>
        </TouchableOpacity>
        <ImageBackground source={require('../assets/background.png')} style={{
          height: 140, width: 345, bottom: 50, left: 0, opacity: 0.3, zIndex: -1, position: 'absolute', top: undefined, bottom: 0,
          right: undefined,
          left: undefined
        }} />

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: ScreenHeight,
    alignItems: 'center',
    paddingTop: '35%',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    backgroundColor: "#fff",
    marginTop: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    width: '100%',
    fontSize: 20,
    textAlign: 'center'
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 88,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },

  loadingHide: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
  }
})
