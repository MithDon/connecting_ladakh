import React,{useEffect,useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title } from 'react-native-paper';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

const DrawerList = [
 /* { icon: 'home-outline', label: 'Home', navigateTo: 'SearchScreen' },*/
 { icon: 'graph', label: 'Dashboard', navigateTo: 'Dashboard' },
  { icon: 'car', label: 'Manage Vehicles', navigateTo: 'ManageVehicles' },
  { icon: 'car-clock', label: 'Add Vehicle Availability', navigateTo: 'DriverVehicleAvailability' },
 
];
const DrawerLayout = ({ icon, label, navigateTo, props }) => {
  const navigation = useNavigation();
  return (
    <DrawerItem
      style={{ color: '#000' }}
      icon={({ color, size }) => <Icon name={icon} color={'#000'} size={size} />}
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = (props) => {
  return DrawerList.map((el, i) => {

    return (
      <DrawerLayout
        style={{ color: '#000' }}
        key={i}
        icon={el.icon}
        label={el.label}
        navigateTo={el.navigateTo}
        props={props}
      />
    );
  });
};

const logout = (props) => {
  AsyncStorage.setItem('isUserLoggedin', '');
  AsyncStorage.setItem('token', '');
  AsyncStorage.setItem('email', '')
  AsyncStorage.setItem('name', '')
  AsyncStorage.setItem('phone', '')
  props.navigation.navigate('LoginScreen') 
}

function DrawerContent(props) {
  const [uName, setUname] = useState(false);
  const [uEmail, setUemail] = useState(false);
  async function getData() {
    setUemail(await AsyncStorage.getItem('email'));
    setUname(await AsyncStorage.getItem('name')); 
  }

  useEffect(() => {
    getData();
  });

  const navigation=useNavigation();
  
  return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>

          <View style={styles.drawerContent}>

            <Text style={{position:'absolute',right:5,backgroundColor:'blue',paddingLeft:9,paddingRight:9,fontWeight:700,paddingBottom:1.5,color:'#fff',borderRadius:5}}>Driver</Text>

            <TouchableOpacity activeOpacity={0.8}>
              <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                  <Avatar.Image
                    source={{
                      uri: 'data:image/png;base64,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',
                    }}
                    size={50}
                    style={{ marginTop: 5 }}
                  />
                  <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                    <Title style={styles.title}>{uName}</Title>
                    <Text style={styles.caption} numberOfLines={1}>
                      {uEmail}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.drawerSection}>
              <DrawerItems props={props} />
            </View>
          </View>
        </DrawerContentScrollView>
        <View style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={'#000'} size={size} />
            )}
            label="Sign Out"
            onPress={() => {
              AsyncStorage.setItem('isUserLoggedin', '');
              AsyncStorage.setItem('token', '');
              navigation.navigate('LoginScreen')
            }}
          />
        </View>
      </View>
  );
}
export default DrawerContent;


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 13,
    lineHeight: 14,
    color: '#424852',
    width: '100%',
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomWidth: 0,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#dedede',
    borderTopWidth: 1,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});