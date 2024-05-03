import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import { Image } from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { passwordConfirmValidator } from '../helpers/passwordConfirmValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [repassword, setRepassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const repasswordError = passwordConfirmValidator(repassword.value, password.value)
    if (emailError || passwordError || nameError || repasswordError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setRepassword({ ...repassword, error: repasswordError })
      return
    }
    fetch('http://10.0.2.2:8000/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: repassword.value,
        phone_number: phone.value,
        user_type: 1
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <ScrollView style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>

        <Text style={[styles.inputLabel, { paddingTop: 40 }]}>NAME</Text>
        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor="#9d9d9d"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <Text style={[styles.inputLabel, { marginTop: 20 }]}>PHONE</Text>
        <TextInput
          placeholder="Enter Your Phone"
          placeholderTextColor="#9d9d9d"
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
          keyboardType='numeric'
        />
        <Text style={[styles.inputLabel, { marginTop: 20 }]}>EMAIL</Text>
        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor="#9d9d9d"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <Text style={[styles.inputLabel, { marginTop: 20 }]}>PASSWORD</Text>
        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor="#9d9d9d"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Text style={[styles.inputLabel, { marginTop: 20 }]}>RE-ENTER PASSWORD</Text>
        <TextInput
          placeholder="Re-Enter Your Password"
          placeholderTextColor="#9d9d9d"
          returnKeyType="done"
          value={repassword.value}
          onChangeText={(text) => setRepassword({ value: text, error: '' })}
          error={!!repassword.error}
          errorText={repassword.error}
          secureTextEntry
        />

        <Button
          mode="contained"
          uppercase={false}
          onPress={onSignUpPressed}
          style={{ marginTop: 24, backgroundColor: '#22272b', borderRadius: 10 }}
        >
          Register
        </Button>


        <View style={[styles.row, { marginTop: 15 }]}>
          <Text style={{ fontSize: 20, fontFamily: "Cabin-Medium" }}>Or Sign-Up With</Text>
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

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={{ fontFamily: "Cabin-Medium", marginTop: 20, fontSize: 20 }}>Go Back To Login </Text>
          </TouchableOpacity>
        </View>

        <ImageBackground source={require('../assets/background.png')} style={{ height: 140, width: 345, bottom: 0, left: 0, opacity: 0.3, zIndex: -1 }} />

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
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  inputLabel: {
    color: '#2a2f33', fontWeight: '500', fontSize: 15, marginBottom: 7, textAlign: "left", width: "100%", fontFamily: "Cabin-Medium"
  },
  socialIcons: {
    backgroundColor: '#22272b', padding: 10, marginTop: 25, borderRadius: 12
  },
  socialIconImg: {
    width: 25, height: 25, borderRadius: 10,
  }

})