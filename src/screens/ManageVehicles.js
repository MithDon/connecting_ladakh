import React, { useState, useEffect } from 'react'
import { Text, Button } from 'react-native-paper'
import { View, Alert, StyleSheet, Image, ScrollView, BackHandler, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ApiClient } from "../../api";
import { Dropdown } from 'react-native-element-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage'

const apiPath = ApiClient();

export default function ManageVehicles({ navigation, props }) {
  const [OptvalueName, setValueName] = useState(null);
  const [OptvalueModel, setValueModel] = useState(null);
  const [OptvalueCarrier, setValueCarrier] = useState(null);
  const [OptvalueSeating, setValueSeating] = useState(null);
  const [vehicles, setvehicles] = useState([]);
  const [show, setShow] = useState(false);
  const seating = [];

  useEffect(() => {

    apiPath.get('/get_vehicles')
      .then(response => {
        for (let i = 0; i < response.data.data.length; i++) {
          vehicles.push({ 'name': response.data.data[i].vname + ' (' + response.data.data[i].vmodel + ')', 'value': String(response.data.data[i].vid) });
        }

      }).catch(error => {
        const errResp = (error && error.response && error.response.data) || (error && error.message);
        console.error('error :', errResp);
      });

  }, []);


  const VehicleList = () => {
    const [vehicleListData, setvehicleListData] = useState([])
    useEffect(() => {
      getVehicleList();
    }, []);

    const getVehicleList = () => {
      apiPath.get('/vehicle_registration_list')
        .then(response => {
          setvehicleListData(response.data.data);
        }).catch(error => {
          const errResp = (error && error.response && error.response.data) || (error && error.message);
          console.error('error :', errResp);
        });
    }
    return (
      <View >
        <ScrollView horizontal={true} contentContainerStyle={{ width: '98%' }}>
        <FlatList
          data={vehicleListData}
          renderItem={({ item }) => (
            <View style={{ borderWidth: 1, height: 110, width: '98%', marginLeft: 5, borderRadius: 5, borderColor: '#000', marginTop: 10 }}>

              <Text style={{ fontWeight: 700, fontSize: 13, position: 'absolute', right: 10, top: 5 }}>
                {
                  moment(item.created_at).format('DD-MM-YYYY HH:mm')
                }

              </Text>
              <Text style={{ fontWeight: 700, fontSize: 20, paddingTop: 15, paddingLeft: 20 }}>{item.vehiclename} ({item.model})</Text>

              <View style={{ width: '100%', flex: 1, flexDirection: 'row', marginTop: 10, maxHeight: 65, }}>
                <View style={{ width: '48%' }}>
                  <Text style={{ fontWeight: 700, fontSize: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#ddd', width: 164, marginLeft: 20, borderRadius: 20 }}>Carrier{' '}

                    {
                      item.carrier ? (
                        <Icon name={'check-circle'} color={'green'} size={22} />
                      ) : <Icon name={'close-circle'} color={'red'} size={22} />
                    }


                  </Text>
                </View>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontWeight: 700, fontSize: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#ddd', width: 90, borderRadius: 20 }}>
                    <Icon name={'seat'} color={'green'} size={22} /> {item.seating}

                  </Text>
                </View>
              </View>
            </View>
          )}
        >
        </FlatList>
        </ScrollView>
      </View>
    )

  }


  for (let i = 1; i < 15; i++) {
    seating.push({ 'label': String(i), 'value': i });
  }

  const models = [
    { label: '2015', value: '2015' },
    { label: '2016', value: '2016' },
    { label: '2017', value: '2017' },
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },

  ];

  const carrier = [
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

    async function getData() {

      await AsyncStorage.getItem('userId', (error, result) => {
      
        if (result) {

          setShow(true);
          const body = JSON.stringify({
            vehicle_name: OptvalueName,
            model: OptvalueModel,
            carrier: OptvalueCarrier,
            seating: OptvalueSeating,
            user_id: parseInt(result)
          });

          console.log('body', body);
       
          apiPath.post('/vehicle_registration', body)
            .then(response => {
              setShow(false);
              if (response.data.status == "success") {
                Alert.alert('Vehicle added successfully.');
                setValueName(null);
                setValueModel(null);
                setValueCarrier(null);
                setValueSeating(null);
              }
            })
            .catch(error => {
              // Typescript type guard for AxiosError
              setShow(false);
              let errMsg;
              const errResp = (error && error.response && error.response.data) || (error && error.message);
              console.log(errResp);
              if (errResp.status=="failed") {
                Alert.alert(errResp.message, errMsg); return;
              }
             
            })
        }
      });
    }
    getData();

  }

  return (
    <ScrollView contentContainerStyle={''}>
      <ActivityIndicator size={100} color={'yellow'} style={(show) ? styles.loading : styles.loadingHide} animating={show} />
      <View style={{ width: '99%', marginLeft: 4 }}>
        <View style={[{ flexDirection: 'row', alignItems: 'center', width: '100%' }]}>
          <View style={styles.buttonWrap}>
            <View style={[styles.button, { paddingLeft: 5, paddingTop: 10 }]}>
              <TouchableHighlight onPress={() => navigation.toggleDrawer()} underlayColor={'transparent'} style={{ width: 60 }}>
                <Image style={[styles.socialIconImg]} source={require('../../assets/imgs/font_ico_drawer.png')} />
              </TouchableHighlight>
            </View>

            <View style={[styles.button, { paddingLeft: 20, paddingTop: 18, width: 200 }]}>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Vehicle Registration</Text>
            </View>
          </View>
        </View>

        <View style={[styles.container, { padding: 10 }]}>

          <Text style={[styles.inputLabel, { paddingTop: 0 }]}>Choose Vehicle</Text>
          <Dropdown
            style={[styles.dropdown, { width: '100%', borderRadius: 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={vehicles}
            maxHeight={300}
            labelField="name"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={OptvalueName}
            onChange={itemName => {
              setValueName(itemName.value);
              console.log('optname', OptvalueName);
            }}
          />

          <Text style={[styles.inputLabel, { paddingTop: 0 }]}>Choose Model</Text>
          <Dropdown
            style={[styles.dropdown, { width: '100%', borderRadius: 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={models}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={OptvalueModel}
            onChange={item => {
              console.log(item.value);
              setValueModel(item.value);
            }}
          />

          <Text style={[styles.inputLabel, { paddingTop: 0 }]}>Carrier</Text>
          <Dropdown
            style={[styles.dropdown, { width: '100%', borderRadius: 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            iconStyle={styles.iconStyle}
            data={carrier}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select"
            searchPlaceholder="Search..."
            value={OptvalueCarrier}
            onChange={item => {
              console.log(item.value);
              setValueCarrier(item.value);
            }}
          />

          <Text style={[styles.inputLabel, { paddingTop: 0 }]}>Seating</Text>
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

        <View
          style={{
            borderBottomColor: '#ddd',
            borderBottomWidth: 2, marginTop: 10, marginBottom: 10, width: "98%"
          }}
        />

        <View>
          <Text style={{ fontSize: 19, fontWeight: 700, paddingLeft: 5 }}>Available Vehicles</Text>
          <VehicleList />
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

})
