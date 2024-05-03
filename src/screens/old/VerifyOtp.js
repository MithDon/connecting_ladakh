import React from 'react'
import Button from '../components/Button'
import { Text } from 'react-native-paper'
import { Alert, TextInput } from 'react-native'
import { StyleSheet, ImageBackground, TouchableOpacity, View, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ApiClient } from "../../api";

const windowHeight = Dimensions.get('screen').height;

export default function VerifyOtp({ route, navigation }) {
  if(route.params){
  const { otp, phoneNumber } = route.params;
  Alert.alert('Your OTP is -' + otp);
  }

  const apiPath = ApiClient()

  const onVerifyUpPressed = () => {
  
    const body = JSON.stringify({
      phone_number: phoneNumber,
      otp: otp,
    })

    apiPath.post('/login_with_otp', body)
      .then(response => {
        // Handle the successful response
        console.log('API Response:', response.data.data);
        if(response.data.status=="success")
        navigation.navigate('SearchScreen');
      })
      .catch(error => {
        // Handle errors, including token-related errors
        console.error('API Error:', error);
      });


    /*fetch('http://10.0.2.2:8000/api/login_with_otp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number:phoneNumber,
        otp:otp,
      }),
    }).then((response) => response.json())
    .then((responseJson) => {

      console.log("OTP Response");
      
      console.log(responseJson);

      if(responseJson.status=="success")
        navigation.navigate('Dashboard');
      
    })
    .catch((error) => {
      console.error(error);
    });*/

  }

  return (
    <ScrollView style={{ width: '100%',height:windowHeight, }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: 700, fontFamily: "Cabin-Medium", color: '#22272b', marginTop: 0 }}>
          Verify Your Mobile
        </Text>

        <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium", marginTop: 15, color: '#313639' }}>
          +91 1234567890
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

        <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium", marginTop: 15, color: '#313639' }}>
          Recieve New OTP Code
        </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium", marginTop: 13, color: '#313639' }}>
            Change Phone Number
          </Text>
        </TouchableOpacity>
        <ImageBackground source={require('../assets/background.png')} style={{ height: 140, width: 345, bottom: 79, position:'absolute', opacity: 0.3, zIndex: -1 }} />

      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height:windowHeight,
    alignItems: 'center',
    paddingTop:'35%',
    backgroundColor: '#fff',
    flex:1,
    flexDirection:'column'
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
})
