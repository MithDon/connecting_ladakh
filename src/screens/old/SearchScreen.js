import React, { useState } from 'react'
import { Text, Button } from 'react-native-paper'
import { View, TouchableWithoutFeedback, SafeAreaView, TextInput } from 'react-native'
import { StyleSheet, Image, ScrollView } from 'react-native'



export default function SerachScreen({ navigation }) {

  const emojisWithIcons = [
    { title: 'INDORE', icon: 'emoticon-happy-outline' },
    { title: 'MANALI', icon: 'emoticon-cool-outline' },
    { title: 'LEH', icon: 'emoticon-lol-outline' }
  ];

  const onLoginPressed = () => {

  }

  return (
    <ScrollView>

      <View style={{ width: '99%', marginLeft: 4 }}>

        <View style={[{ flexDirection: 'row', alignItems: 'center', width: '100%' }]}>

          <View style={styles.buttonWrap}>
            <View style={[styles.button, { paddingLeft: 13, paddingTop: 10 }]}><Image style={styles.socialIconImg} source={require('../../assets/imgs/font_ico_drawer.png')} /></View>
            <View style={[styles.button, { paddingLeft: 20, paddingTop: 18 }]}>
              <Image style={{ width: 95, height: 43 }} source={require('../../assets/imgs/one_way_cab.png')} />
            </View>
            <View style={[styles.button, { paddingLeft: 73, paddingTop: 14 }]}>
              <Image style={{ width: 40, height: 40 }} source={require('../../assets/imgs/font_ico_chat.png')} />
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#22272b', width: '100%', borderTopLeftRadius: 36, borderTopEndRadius: 36, padding: 25, marginTop: 22, flexDirection: 'row' }}>
          <Text style={{ color: '#ddd', fontSize: 15, fontFamily: "Cabin-Medium", width: '64%' }}>One Way From</Text>
          <View>
           


          </View>



        </View>

        <View style={{ backgroundColor: '#22272b' }}>
          <TouchableWithoutFeedback>
            <SafeAreaView style={{ flex: 1 }}>
              <TextInput placeholder='Search Destination' style={{ height: 47, 
                marginHorizontal: 22, borderWidth: 1, borderColor: '#fff',marginBottom:22, color: '#000', fontWeight: '800', textAlign: 'center', fontSize: 14, backgroundColor: '#fff',
                 paddingHorizontal: 8, borderRadius: 12, width: '89%' }}></TextInput>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </View>


        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Ujjain</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 19, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>

        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Bhopal</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="text" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 2, fontSize: 16, padding: 0, marginLeft: 12, color: '#fff' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>

        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Dhule</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>

        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Surat</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>


        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Pune</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>

        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>GOA</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>

        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Manali</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>

        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Mumbal</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>

        <View style={[styles.buttonWrap, { backgroundColor: '#22272b' }]}>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 10 }]}><Text style={{ fontSize: 20, color: '#fff' }}>Delhi</Text></View>
          <View style={[styles.button, { paddingLeft: 20, paddingTop: 0 }]}>
            <Text style={{ fontSize: 13, color: '#fff', lineHeight: 20 }}>From</Text>
            <Text style={{ fontSize: 20, color: '#fff', lineHeight: 20 }}>{'\u20B9'}1,095 </Text>
          </View>
          <View style={{ paddingLeft: 0, paddingTop: 0 }}>
            <Button mode="outlined" style={{ backgroundColor: '#ffbc07', marginTop: 0, borderRadius: 30, padding: 5, fontSize: 16, padding: 0, marginLeft: 12, color: 'White' }} uppercase={false}>Book Now</Button>
          </View>

          <View
            style={{
              borderBottomColor: '#ddd',
              borderBottomWidth: 1.2, width: "80%", top: 55, flex: 6, position: 'absolute', left: 35
            }}
          />
        </View>


      </View>
    </ScrollView>
  )
}

const onSignUpPressed = () => {

}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    paddingTop: 22,
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

  dropdownButtonStyle: {
    width: 130,
    height: 38,
    backgroundColor: '#E9ECEF',
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: -10,
    flex: 1,

  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000'
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#000'
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    color: '#000'
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    color: '#000'
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#000'
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: '#000'
  }
})
