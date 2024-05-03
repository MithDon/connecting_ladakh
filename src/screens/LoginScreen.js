import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, TextInput, ScrollView, ImageBackground, Alert, Dimensions, BackHandler, ActivityIndicator } from 'react-native'
import { Text } from 'react-native-paper'
import Button from '../components/Button'
import { theme } from '../core/theme'
import { phoneValidator } from '../helpers/phoneValidator'
import { Image } from 'react-native'
import { ApiClient } from "../../api";
import { useFocusEffect } from '@react-navigation/native'

let ScreenHeight = Dimensions.get("window").height;

export default function LoginScreen({ navigation }) {
  const apiPath = ApiClient()
  const [show, setShow] = useState(false);
  const handleBackPress = () => {
    Alert.alert('Exit App', 'Are you sure you want to exit?', [{
      text: 'Cancel', onPress: () => null,
      style: 'cancel'
    }, {
      text: 'Exit',
      onPress: () => BackHandler.exitApp()
    },
    ]);
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

  const [phone, setPhone] = useState({ value: '', error: '' })
  const onLoginPressed = () => {
    const phoneError = phoneValidator(phone.value)
    if (phoneError) {
      setPhone({ ...phone, error: phoneError })
      return
    }
    setShow(true);

    const body = JSON.stringify({
      phone_number: phone.value
    });

    apiPath.post('/login', body)
      .then(response => {
        console.log('API Response:', response.data);
        setShow(false);
        if (response.data.status == "success")
          navigation.navigate('VerifyOtp', {
            otp: response.data.data.otp,
            phoneNumber: phone.value,
          });
      })
      .catch(error => {
        setShow(false);
        const errResp = (error && error.response && error.response.data) || (error && error.message);
        console.log(errResp);
        Alert.alert(errResp.message);
      });
  }

  return (

    <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps='handled'>

      <ActivityIndicator size={100} color={'yellow'} style={(show) ? styles.loading : styles.loadingHide} animating={show} />

      <View style={styles.container}>

        <ImageBackground source={require('../assets/top_bg.png')} style={{
          height: 120, width: 315, position: 'absolute', top: 0, bottom: undefined,
          right: undefined,
          left: undefined
        }} />
        <Image source={require('../assets/rsz_1car.jpg')} style={{ height: 310, width: 470, position: 'absolute', top: 120, left: -110 }} />
        <Text style={[styles.inputLabel, { marginTop: 280, marginBottom: 7, color: '#000', fontSize: 22, fontWeight: 'bold' }]}>Phone Number</Text>


        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxHeight: 90 }}>

          <View style={{ justifyContent: 'center', backgroundColor: '#000', paddingTop: 19, paddingBottom: 19, paddingLeft: 15, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, height: 60 }}>
            <Text style={{ color: '#fff', fontWeight: 700 }} >+91</Text>
          </View>


          <TextInput
            placeholder="Enter Your Phone Number"
            placeholderTextColor="#9d9d9d"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
            style={{ backgroundColor: '#000', width: '100%', borderTopRightRadius: 15, borderBottomRightRadius: 15, padding: 15, color: '#fff', flex: 1, height: 60 }}
            underlineColorAndroid="transparent"
            keyboardType='numeric'
            maxLength={10}
          />
        </View>

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
    backgroundColor: '#fff',
    height: ScreenHeight
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
    color: '#2a2f33', fontWeight: '800', fontSize: 18, marginBottom: 5, textAlign: "left", width: "100%", fontFamily: "Cabin-Medium"
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
