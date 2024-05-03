import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Alert, Dimensions, BackHandler, ActivityIndicator, Modal, Pressable } from 'react-native'
import { Text } from 'react-native-paper'
import { Image } from 'react-native'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { passwordConfirmValidator } from '../helpers/passwordConfirmValidator'
import { nameValidator } from '../helpers/nameValidator'
import { ApiClient } from "../../api"
import { useFocusEffect } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
/*import FilePickerModal from '../components/FilePickerModal'*/

let ScreenHeight = Dimensions.get("window").height;

export default function RegisterScreen({ navigation }) {

  const [show, setShow] = useState(false);
  const apiPath = ApiClient()
  const [name, setName] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [repassword, setRepassword] = useState({ value: '', error: '' })

  const [Optvalue, setValue] = useState(null);
  const [drvVisible, setDrvVisible] = useState(false);
  const [agntVisible, setAgntVisible] = useState(false);
  const [rcReq, setRcReq] = useState(false);
  const [dlReq, setDlReq] = useState(false);
  const [fileDataRC, setfileDataRC] = useState({ value: '', error: '' })
  const [fileDataRCType, setfileDataRCType] = useState({ value: '', error: '' })
  const [fileDataRCName, setfileDataRCName] = useState({ value: '', error: '' })
  const [fileDataDL, setfileDataDL] = useState({ value: '', error: '' })
  const [fileDataDLType, setfileDataDLType] = useState({ value: '', error: '' })
  const [fileDataDLName, setfileDataDLName] = useState({ value: '', error: '' })
  const [modalVisibleDL, setModalVisibleDL] = useState(false);
  const [modalVisibleRC, setModalVisibleRC] = useState(false);

  const [agCertReq, setagCertReq] = useState(false);
  const [agVisReq, setagVisReq] = useState(false);
  const [modalVisibleAgnCert, setModalVisibleAgnCert] = useState(false);
  const [modalVisibleAgnVis, setModalVisibleAgnVis] = useState(false);
  const [fileDataAgntCert, setfileDataAgntCert] = useState({ value: '', error: '' })
  const [fileDataAgntCertType, setfileDataAgntCertType] = useState({ value: '', error: '' })
  const [fileDataAgntCertName, setfileDataAgntCertName] = useState({ value: '', error: '' })
  const [fileDataAgntVis, setfileDataAgntVis] = useState({ value: '', error: '' })
  const [fileDataAgntVisType, setfileDataAgntVisType] = useState({ value: '', error: '' })
  const [fileDataAgntVisName, setfileDataAgntVisName] = useState({ value: '', error: '' })

  const selectRC = async () => {

    try {
      console.log("RC");
      const docRC = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
      });
      await RNFS.readFile(docRC.uri, 'base64').then(fileDataRC => {
        setfileDataRC(fileDataRC);
        setRcReq(false);
        setfileDataRCType({ value: docRC.type, error: '' });
        setfileDataRCName({ value: docRC.name, error: '' });
        setModalVisibleRC(false);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(e)) {
        console.log('User canceled the upload', e);
      } else {
        console.log(error);
      }
    }
  }

  const selectDL = async () => {

    try {
      console.log("DL");
      const docDL = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
      });

      await RNFS.readFile(docDL.uri, 'base64').then(fileDataDL => {
        setfileDataDL(fileDataDL);
        setDlReq(false)
        setfileDataDLType({ value: docDL.type, error: '' });
        setfileDataDLName({ value: docDL.name, error: '' });
        setModalVisibleDL(false);
      });

    } catch (err) {
      if (DocumentPicker.isCancel(e)) {
        console.log('User canceled the upload', e);
      } else {
        console.log(error);
      }
    }
  }

  const selectAgntCert = async () => {
    try {
      const docAgntCert = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
      });
      await RNFS.readFile(docAgntCert.uri, 'base64').then(fileDataAgntCert => {
        setfileDataAgntCert(fileDataAgntCert);
        setagCertReq(false);
        setfileDataAgntCertType({ value: docAgntCert.type, error: '' });
        setfileDataAgntCertName({ value: docAgntCert.name, error: '' });
        setModalVisibleAgnCert(false);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(e)) {
        console.log('User canceled the upload', e);
      } else {
        console.log(error);
      }
    }
  }

  const selectAgntVis = async () => {
    try {
      const docAgntVis = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
      });
      await RNFS.readFile(docAgntVis.uri, 'base64').then(fileDataAgntVis => {
        setfileDataAgntVis(fileDataAgntVis);
        setagVisReq(false);
        setfileDataAgntVisType({ value: docAgntVis.type, error: '' });
        setfileDataAgntVisName({ value: docAgntVis.name, error: '' });
        setModalVisibleAgnVis(false);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(e)) {
        console.log('User canceled the upload', e);
      } else {
        console.log(error);
      }
    }
  }


  const handleCameraLaunchDL = async (isCamera) => {
    const options = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchCamera(options);
      console.log(response);
      await RNFS.readFile(response.assets[0].uri, 'base64').then(fileDataDL => {
        setfileDataDL(fileDataDL);
        setDlReq(false)
        setfileDataDLType({ value: response.assets[0].type, error: '' });
        setfileDataDLName({ value: response.assets[0].fileName, error: '' });
        setModalVisibleDL(false);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCameraLaunchRC = async (isCamera) => {
    const options = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchCamera(options);
      await RNFS.readFile(response.assets[0].uri, 'base64').then(fileDataRC => {
        setfileDataRC(fileDataRC);
        setRcReq(false);
        setfileDataRCType({ value: response.assets[0].type, error: '' });
        setfileDataRCName({ value: response.assets[0].fileName, error: '' });
        setModalVisibleRC(false);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleCameraLaunchAgntCert = async (isCamera) => {
    const options = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchCamera(options);
      await RNFS.readFile(response.assets[0].uri, 'base64').then(fileDataAgntCert => {
        setfileDataAgntCert(fileDataAgntCert);
        setagCertReq(false);
        setfileDataAgntCertType({ value: response.assets[0].type, error: '' });
        setfileDataAgntCertName({ value: response.assets[0].fileName, error: '' });
        setModalVisibleAgnCert(false);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCameraLaunchAgntVis = async (isCamera) => {
    const options = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchCamera(options);
      await RNFS.readFile(response.assets[0].uri, 'base64').then(fileDataAgntVis => {
        setfileDataAgntVis(fileDataAgntVis);
        setagVisReq(false);
        setfileDataAgntVisType({ value: response.assets[0].type, error: '' });
        setfileDataAgntVisName({ value: response.assets[0].fileName, error: '' });
        setModalVisibleAgnVis(false);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const chooseDocRC = () => {
    setModalVisibleRC(true);
  }

  const chooseDocDL = () => {
    setModalVisibleDL(true);
  }

  const chooseAgntCert = () => {
    setModalVisibleAgnCert(true);
  }

  const chooseAgntVis = () => {
    setModalVisibleAgnVis(true);
  }

  const userTypes = [
    { label: 'Agent', value: '2' },
    { label: 'Vehicle Owner', value: '3' },
    { label: 'Individual', value: '4' }
  ];

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
      if (Optvalue == 3 && !rcReq) {
        setRcReq(true);
      }
      if (Optvalue == 3 && !dlReq) {
        setDlReq(true)
      }

      if (Optvalue == 2 && !agCertReq) {
        setagCertReq(true);
      }
      if (Optvalue == 2 && !agVisReq) {
        setagVisReq(true)
      }
      return
    }

    setShow(true);

    const body = JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: repassword.value,
      phone_number: phone.value,
      user_type: Optvalue,
      driver_rc: fileDataRC,
      driver_dl: fileDataDL,
      driver_rc_doc_type: fileDataRCType.value,
      driver_dl_doc_type: fileDataDLType.value,
      agency_cert: fileDataAgntCert,
      agent_visiting_card: fileDataAgntVis,
      agency_cert_doc_type: fileDataAgntCertType.value,
      agent_visiting_card_doc_type: fileDataAgntVisType.value,
    });

    apiPath.post('/register', body)
      .then(response => {
        setShow(false);
        console.log('API Response:', response.data.data);
        if (response.data.status == "success") {
          Alert.alert('Account created successfully.', 'Please verify your Email ID to Login');
          navigation.navigate('LoginScreen');
        }
      })
      .catch(error => {
        // Typescript type guard for AxiosError
        setShow(false);
        let errMsg;
        const errResp = (error && error.response && error.response.data) || (error && error.message);
        console.log(errResp);
        if (errResp.data.email) {
          errMsg = errResp.data.email[0];
          Alert.alert(errResp.message, errMsg); return;
        }
        if (errResp.data.phone_number[0]) {
          errMsg = errResp.data.phone_number[0];
          Alert.alert(errResp.message, errMsg);
        }
      });
  }

  return (
    <ScrollView style={{ width: '100%' }} keyboardShouldPersistTaps='handled'>
      <ActivityIndicator size={100} color={'yellow'} style={(show) ? styles.loading : styles.loadingHide} animating={show} />
      <View style={styles.container}>

        <Text style={[styles.inputLabel, { paddingTop: 0 }]}>ACCOUNT TYPE</Text>
        <Dropdown
          style={[styles.dropdown, { width: '100%', borderRadius: 0 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          iconStyle={styles.iconStyle}
          data={userTypes}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select"
          searchPlaceholder="Search..."
          value={Optvalue}
          onChange={item => {
            console.log(item.value);
            setValue(item.value);
            item.value == 3 ? setDrvVisible(true) : setDrvVisible(false);
            item.value == 2 ? setAgntVisible(true) : setAgntVisible(false);
          }}
        />

        <Text style={[styles.inputLabel, { paddingTop: 0 }]}>NAME</Text>
        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor="#9d9d9d"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
          underlineColor='#22272b'
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
          maxLength={10}
          underlineColor='#22272b'
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
          underlineColor='#22272b'
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
          underlineColor='#22272b'
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
          underlineColor='#22272b'
        />

        {
          drvVisible ? (

            <View style={{ width: '100%', flex: 1, flexDirection: 'row', marginTop: 10, maxHeight: 65, }}>
              <View style={{ width: '46%' }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={chooseDocRC}
                  labelStyle={{ fontSize: 15, padding: 0, width: 160 }}
                  style={{ marginTop: 5, backgroundColor: '#444', borderRadius: 5, marginVertical: 0, paddingVertical: 0, paddingHorizontal: 0, padding: 0 }}
                >
                  <Icon name="upload" color={'#fff'} size={17} /> RC Card
                </Button>
                {
                  rcReq ? (
                    <Text style={[styles.docMessage, { color: '#f47282' }]}>Required</Text>
                  ) : <Text style={[styles.docMessage]} numberOfLines={1}>{fileDataRCName.value}</Text>
                }
              </View>
              <View style={{ width: '54%' }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={chooseDocDL}
                  labelStyle={{ fontSize: 15, padding: 0, width: 190 }}
                  style={{ marginTop: 5, backgroundColor: '#444', borderRadius: 5, marginVertical: 0, paddingVertical: 0, marginLeft: 5, padding: 0 }}
                >
                  <Icon name="upload" color={'#fff'} size={17} /> Driving Licence
                </Button>
                {
                  dlReq ? (
                    <Text style={[styles.docMessage, { color: '#f47282', marginLeft: 6 }]}>Required</Text>
                  ) : <Text style={[styles.docMessage, { marginLeft: 6 }]} numberOfLines={1}>{fileDataDLName.value}</Text>
                }
              </View>
            </View>

          ) : null
        }

        {
          agntVisible ? (

            <View style={{ width: '100%', flex: 1, flexDirection: 'row', marginTop: 10, maxHeight: 65, }}>
              <View style={{ width: '52%' }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={chooseAgntCert}
                  labelStyle={{ fontSize: 15, padding: 0, width: 180 }}
                  style={{ marginTop: 5, backgroundColor: '#444', borderRadius: 5, marginVertical: 0, paddingVertical: 0, paddingHorizontal: 0, padding: 0 }}
                >
                  <Icon name="upload" color={'#fff'} size={17} /> Agency Certificate
                </Button>
                {
                  agCertReq ? (
                    <Text style={[styles.docMessage, { color: '#f47282' }]}>Required</Text>
                  ) : <Text style={[styles.docMessage]} numberOfLines={1}>{fileDataAgntCertName.value}</Text>
                }
              </View>
              <View style={{ width: '48%' }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={chooseAgntVis}
                  labelStyle={{ fontSize: 15, padding: 0, width: 190 }}
                  style={{ marginTop: 5, backgroundColor: '#444', borderRadius: 5, marginVertical: 0, paddingVertical: 0, marginLeft: 5, padding: 0 }}
                >
                  <Icon name="upload" color={'#fff'} size={17} /> Visiting Card
                </Button>
                {
                  agVisReq ? (
                    <Text style={[styles.docMessage, { color: '#f47282', marginLeft: 6 }]}>Required</Text>
                  ) : <Text style={[styles.docMessage, { marginLeft: 6 }]} numberOfLines={1}>{fileDataAgntVisName.value}</Text>
                }
              </View>
            </View>

          ) : null
        }


        <Button
          mode="contained"
          uppercase={false}
          onPress={onSignUpPressed}
          style={{ marginTop: 10, backgroundColor: '#22272b', borderRadius: 10 }}
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

        <ImageBackground source={require('../assets/background.png')} style={{
          height: 140, width: 345, bottom: 50, left: 0, opacity: 0.3, zIndex: -1, position: 'absolute', top: undefined, bottom: 0,
          right: undefined,
          left: undefined
        }} />


        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleDL}
            onRequestClose={() => {
              setModalVisibleDL(!modalVisibleDL);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 18 }}>
                  <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}>Choose an action</Text>
                </View>
                <Pressable
                  onPress={handleCameraLaunchDL} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="camera" color={'#fff'} size={17} />  Take Photo</Text>
                  </View></Pressable>
                <Pressable
                  onPress={selectDL} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="upload" color={'#fff'} size={17} />  Choose File</Text>
                  </View></Pressable>

                <View style={{ padding: 10, paddingLeft: 0, width: '100%' }}>
                  <Pressable
                    style={{}}
                    onPress={() => setModalVisibleDL(!modalVisibleDL)}><Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}><Icon name="close" color={'#fff'} size={17} /> Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>


          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleRC}
            onRequestClose={() => {
              setModalVisibleRC(!modalVisibleRC);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 18 }}>
                  <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}>Choose an action</Text>
                </View>
                <Pressable
                  onPress={handleCameraLaunchRC} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="camera" color={'#fff'} size={17} />  Take Photo</Text>
                  </View></Pressable>
                <Pressable
                  onPress={selectRC} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="upload" color={'#fff'} size={17} />  Choose File</Text>
                  </View></Pressable>

                <View style={{ padding: 10, paddingLeft: 0, width: '100%' }}>
                  <Pressable
                    style={{}}
                    onPress={() => setModalVisibleRC(!modalVisibleRC)}><Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}><Icon name="close" color={'#fff'} size={17} /> Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>





          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleAgnCert}
            onRequestClose={() => {
              setModalVisibleAgnCert(!modalVisibleAgnCert);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 18 }}>
                  <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}>Choose an action</Text>
                </View>
                <Pressable
                  onPress={handleCameraLaunchAgntCert} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="camera" color={'#fff'} size={17} />  Take Photo</Text>
                  </View></Pressable>
                <Pressable
                  onPress={selectAgntCert} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="upload" color={'#fff'} size={17} />  Choose File</Text>
                  </View></Pressable>

                <View style={{ padding: 10, paddingLeft: 0, width: '100%' }}>
                  <Pressable
                    style={{}}
                    onPress={() => setModalVisibleAgnCert(!modalVisibleAgnCert)}><Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}><Icon name="close" color={'#fff'} size={17} /> Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>


          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleAgnVis}
            onRequestClose={() => {
              setModalVisibleAgnVis(!modalVisibleAgnVis);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 18 }}>
                  <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}>Choose an action</Text>
                </View>
                <Pressable
                  onPress={handleCameraLaunchAgntVis} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="camera" color={'#fff'} size={17} />  Take Photo</Text>
                  </View></Pressable>
                <Pressable
                  onPress={selectAgntVis} style={{ width: '100%' }}>
                  <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 12 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}> <Icon name="upload" color={'#fff'} size={17} />  Choose File</Text>
                  </View></Pressable>

                <View style={{ padding: 10, paddingLeft: 0, width: '100%' }}>
                  <Pressable
                    style={{}}
                    onPress={() => setModalVisibleAgnVis(!modalVisibleAgnVis)}><Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}><Icon name="close" color={'#fff'} size={17} /> Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>


        </View>


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
    minHeight: ScreenHeight,
    height: '100%', paddingTop: 20
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
  },


  dropdown: {
    margin: 0,
    height: 40,
    backgroundColor: '#fff',
    borderBottomColor: '#22272b',
    borderBottomWidth: 1,
    marginTop: -8,
    paddingHorizontal: 5,
    color: '#000',
    marginBottom: 20
  },
  icon: {
    marginRight: 5,
    color: '#000'
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 600,
    fontSize: 17
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000'
  },
  itemTextStyle: {
    color: '#000',
    fontWeight: 600,
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
  },

  docMessage: {
    marginTop: 2, fontWeight: '300', fontSize: 13, fontFamily: "Cabin-Medium"
  },




  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
  },
  modalView: {
    margin: 5,
    backgroundColor: '#303030',
    borderRadius: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 260
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

})