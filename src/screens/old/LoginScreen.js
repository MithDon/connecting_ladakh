import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, TextInput, ScrollView, ImageBackground } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import { theme } from '../core/theme'
import { phoneValidator } from '../helpers/phoneValidator'
import { Image } from 'react-native'


export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const phoneError = phoneValidator(phone.value)
    if (phoneError) {
      setPhone({ ...phone, error: phoneError })
      return
    }

    fetch('http://10.0.2.2:8000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phone.value,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        navigation.navigate('VerifyOtp', {
          otp: responseJson.data.otp,
          phoneNumber: phone.value,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (

    <ScrollView style={{ width: '100%', height: '100%' }}>

      <View style={styles.container}>

        <ImageBackground source={require('../assets/top_bg.png')} style={{ height: 120, width: 315, top: 0, left: 0 }} />
        <Image source={require('../assets/rsz_1car.jpg')} style={{ height: 310, width: 470, position: 'absolute', top: 120, left: -110 }} />
        <Text style={[styles.inputLabel, { marginTop: 245, marginBottom: 20, color: '#000', fontSize: 22, fontWeight: 'bold' }]}>Phone Number</Text>

        <TextInput
          placeholder="Enter Your Phone Number"
          placeholderTextColor="#9d9d9d"
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
          style={{ backgroundColor: '#000', width: '100%', borderRadius: 15, padding: 15, color: '#fff' }}
          underlineColorAndroid="transparent"
          keyboardType='numeric'
          maxLength={10}
        />

        <View
          style={{
            borderBottomColor: '#6b6b6b',
            borderBottomWidth: 2, marginTop: 25, width: "93%"
          }}
        />

        <View style={[styles.row, { width: '93%', marginTop: -15 }]}>
          <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={{ fontFamily: "Cabin-Medium", marginTop: 28, fontSize: 16, textAlign: 'left', color: '#6b6b6b' }}>New to One Way Cab? Signup now</Text>
          </TouchableOpacity>
          <Text style={{ fontFamily: "Cabin-Medium", marginTop: 28, fontSize: 16, right: 0, color: '#6b6b6b', position: 'absolute' }}>{phone.value.length}/10</Text>
        </View>

        <View style={[styles.row, { marginTop: 20 }]}>
          <Text style={{ fontSize: 17, fontFamily: "Cabin-Medium" }}>Or Login With</Text>
        </View>

        <View style={{ marginTop: 5, flexDirection: 'row' }}>
          <View style={styles.socialIcons}>
            <Image style={styles.socialIconImg} source={require('../../assets/imgs/google.png')} />
          </View>

          <View style={[styles.socialIcons, { marginLeft: 40 }]}>
            <Image style={styles.socialIconImg} source={require('../../assets/imgs/meta.png')} />
          </View>

          <View style={[styles.socialIcons, { marginLeft: 40 }]}>
            <Image style={styles.socialIconImg} source={require('../../assets/imgs/ios.png')} />
          </View>
        </View>

        <Button mode="contained" onPress={onLoginPressed} style={[styles.shadowProp, { backgroundColor: '#ffbc07', fontSize: '29', marginTop: 30, width: '94%', borderRadius: 15 }]}>
          Login
        </Button>

      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  inputLabel: {
    color: '#2a2f33', fontWeight: '800', fontSize: 18, marginBottom: 5, textAlign: "left", width: "100%", fontFamily: "Cabin-Bold"
  },
  socialIcons: {
    backgroundColor: '#22272b', padding: 10, marginTop: 25, borderRadius: 12
  },
  socialIconImg: {
    width: 25, height: 25, borderRadius: 10,
  },
  shadowProp: {
    shadowColor: 'rgba(46, 229, 157, 0.4)',
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 20,
    shadowOffset: { width: 1, height: 13 },
    backgroundColor: '#2EE59D',
    color: '#FFFFFF'
  },
})
