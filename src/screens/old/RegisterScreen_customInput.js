import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
//import { TextInput } from "@react-native-material/core";
//import {TextInput} from 'react-native';
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
          
      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        label="NAME"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        style={styles.inputMd}
        placeholder="Enter Your Name"
      />

      <Text style={[styles.inputLabel,{marginTop:20}]}>Phone</Text>
      <TextInput
        label="PHONE"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        style={styles.inputMd}
        placeholder="Enter Your Phone Number"
      />

    <Text style={[styles.inputLabel,{marginTop:20}]}>Email</Text>
      <TextInput
        label="EMAIL"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        placeholder="Enter Your Email"
        style={styles.inputMd}
      />

      <Text style={[styles.inputLabel,{marginTop:20}]}>Password</Text>
      <TextInput
        label="PASSWORD"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry={true}
        style={styles.inputMd}
        placeholder="Enter Your Password"
      />


      <TextInput
        label="RE-ENTER PASSWORD"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={[styles.cabin,{ marginTop: 24,backgroundColor:'#22272b',borderRadius:15}]}
      >
        Register
      </Button>

      
        <Text style={{fontSize:200}}>Or Sign-Up With</Text>
      

      <View style={styles.row}>
        <Text>Go Back To </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  cabin: {
    fontFamily: 'cabinFont',
    fontSize: 30,
  },
  inputMd:{
    padding: 5,borderColor:"#000",borderBottomWidth:1,height:30,width:"100%"
  },
  inputLabel:{
    color: 'black', fontWeight: 'bold', fontSize: 15, marginBottom: 5,textAlign:"left",width:"100%"
  }
})
