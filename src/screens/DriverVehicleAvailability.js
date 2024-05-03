import React, { useState, useEffect } from 'react'
import { Text, Button } from 'react-native-paper'
import { View, Alert, StyleSheet, Image, ScrollView, BackHandler, TouchableHighlight, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ApiClient } from "../../api";
import { Dropdown } from 'react-native-element-dropdown'
import { borderRadius } from '../components/outline/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInput from '../components/TextInput'
import DatePicker from 'react-native-date-picker'

const apiPath = ApiClient();
let ScreenHeight = Dimensions.get("window").height;

export default function DriverVehicleAvailability({ navigation, props }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [repassword, setRepassword] = useState({ value: '', error: '' })
  const [OptvalueLocation, setValueLocation] = useState(null);
  const [OptvalueModel, setValueModel] = useState(null);
  const [OptvalueAc, setValueAc] = useState(null);
  const [OptvalueSeating, setValueSeating] = useState(null);
  const [location, setLocation] = useState([]);
  const [date, setDate] = useState(new Date())
  const seating = [];


  useEffect(() => {

    apiPath.get('/allowed_cities')
      .then(response => {
        console.log('response :', response.data.data[0].name);
        for (let i = 0; i < response.data.data.length; i++) {
          location.push({ 'name': response.data.data[i].name, 'value': String(response.data.data[i].id) });
        }

      }).catch(error => {
        const errResp = (error && error.response && error.response.data) || (error && error.message);
        console.error('error :', errResp);
      });

  }, []);


  const acAvailable = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' }
  ];

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

  const addVehicle = () => {

    if (!OptvalueName || !OptvalueModel || !OptvalueCarrier || !OptvalueSeating) {
      return
    }

    setShow(true);

    const body = JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: repassword.value,
      phone_number: phone.value,
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
    <ScrollView>
      <View style={{ width: '99%', marginLeft: 4 }}>
        <View style={[{ flexDirection: 'row', alignItems: 'center', width: '100%' }]}>
          <View style={styles.buttonWrap}>
            <View style={[styles.button, { paddingLeft: 5, paddingTop: 10 }]}>
              <TouchableHighlight onPress={() => navigation.toggleDrawer()} underlayColor={'transparent'} style={{ width: 60 }}>
                <Image style={[styles.socialIconImg]} source={require('../../assets/imgs/font_ico_drawer.png')} />
              </TouchableHighlight>
            </View>

            <View style={[styles.button, { paddingLeft: 20, paddingTop: 18, width: 200 }]}>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Vehicle Availability</Text>
            </View>
          </View>
        </View>

        <View style={[styles.container, { padding: 10 }]}>

          <Text style={[styles.inputLabel, { paddingTop: 0 }]}>Location</Text>
          <Dropdown
            style={[styles.dropdown, { width: '100%', borderRadius: 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={location}
            maxHeight={300}
            labelField="name"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={OptvalueLocation}
            onChange={itemName => {
              setValueLocation(itemName.value);
              console.log('optname', OptvalueLocation);
            }}
          />

          <Text style={[styles.inputLabel, { paddingTop: 0 }]}>Date</Text>
          <TextInput
            placeholder="Select Date"
            placeholderTextColor="#9d9d9d"
            returnKeyType="next"
            value={''}
            underlineColor='#22272b'
            editable={true}
          />

          <Text style={[styles.inputLabel, { paddingTop: 0,marginTop:10 }]}>Number of allowed Persons</Text>
          <TextInput
            placeholder="Enter Person count"
            placeholderTextColor="#9d9d9d"
            returnKeyType="next"
            value={''}
            underlineColor='#22272b'
            editable={true}
          />


          <Text style={[styles.inputLabel, { paddingTop: 0, marginTop: 10 }]}>Expected Rate</Text>
          <TextInput
            placeholder="Enter Rate"
            placeholderTextColor="#9d9d9d"
            returnKeyType="next"
            value={''}
            underlineColor='#22272b'
          />

          <Text style={[styles.inputLabel, { paddingTop: 0, marginTop: 10 }]}>AC Availability</Text>
          <Dropdown
            style={[styles.dropdown, { width: '100%', borderRadius: 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={acAvailable}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={OptvalueAc}
            onChange={item => {
              console.log(item.value);
              setValueAc(item.value);
            }}
          />

          <Text style={[styles.inputLabel, { paddingTop: 0 }]}>Luggage Carrier</Text>
          <Dropdown
            style={[styles.dropdown, { width: '100%', borderRadius: 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={seating}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={OptvalueSeating}
            onChange={item => {
              console.log(item.value);
              setValueSeating(item.value);
            }}
          />

          <Button
            mode="contained"
            uppercase={false}
            onPress={addVehicle}
            style={{ marginTop: 10, backgroundColor: '#22272b', borderRadius: 10 }}
          >
            Add Vehicle
          </Button>

        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#fff'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  socialIcons: {
    backgroundColor: '#22272b', padding: 20, marginTop: 25, borderRadius: 12, width: 60, flex: 1
  },
  socialIconImg: {
    width: 55, height: 55, borderRadius: 10, padding: 20
  },
  button: {
    height: 60,
    width: '33%',
    marginLeft: 1,
  },
  buttonWrap: {
    flexDirection: 'row', paddingBottom: 10
  },
  inputLabel: {
    color: '#2a2f33', fontWeight: '500', fontSize: 15, marginBottom: 7, textAlign: "left", width: "100%", fontFamily: "Cabin-Medium"
  },

  dropdown: {
    margin: 0,
    height: 40,
    backgroundColor: '#fff',
    borderBottomColor: '#22272b',
    borderBottomWidth: 1,
    marginTop: -1,
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

})
