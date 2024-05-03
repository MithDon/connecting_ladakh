import React, { useState, useEffect } from 'react'
import { Text, Button } from 'react-native-paper'
import { View,Alert, StyleSheet, Image, ScrollView, BackHandler, TouchableHighlight, TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { ApiClient } from "../../api";
import { Dropdown } from 'react-native-element-dropdown'

const apiPath = ApiClient();
let ScreenHeight = Dimensions.get("window").height;

export default function Profile({ navigation, props }) {

  useEffect(() => {

  });

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
              <Text style={{ fontSize: 18, fontWeight: 700 }}>Manage Profile</Text>
            </View>
          </View>
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


})
