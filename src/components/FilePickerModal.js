import React, { useState } from 'react';
import { View, StyleSheet, Text,  Modal, Pressable } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'

const handleCameraLaunch = async (isCamera) => {
  const options = {
    mediaType: isCamera ? 'photo' : 'video',
  };

  try {
    const response = await launchCamera(options);
    console.log('pickedFile', response);
  } catch (error) {
    console.error('Error:', error);
  }
};

function FilePickerModal(modalVisible) {
  
  
const selectRC = async () => {

  try {
   
    const docRC = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
    });
    await RNFS.readFile(docRC.uri, 'base64').then(fileDataRC => {
      setfileDataRC(fileDataRC);
      setRcReq(false);
      setfileDataRCType({ value: docRC.type, error: '' });
      setfileDataRCName({ value: docRC.name, error: '' });
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
    const docDL = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
    });

    await RNFS.readFile(docDL.uri, 'base64').then(fileDataDL => {
      setfileDataDL(fileDataDL);
      setDlReq(false)
      setfileDataDLType({ value: docDL.type, error: '' });
      setfileDataDLName({ value: docDL.name, error: '' });
    });

  } catch (err) {
    if (DocumentPicker.isCancel(e)) {
      console.log('User canceled the upload', e);
    } else {
      console.log(error);
    }
  }
}

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          modalVisible.setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={{ borderBottomColor: '#525252', borderBottomWidth: 1, width: '100%', padding: 18 }}>
              <Text style={{ textAlign: 'left', fontSize: 18, color: '#fff' }}>Choose an action</Text>
            </View>
            <Pressable
              onPress={handleCameraLaunch} style={{ width: '100%' }}>
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
                onPress={() => modalVisible.setModalVisible(!modalVisible)}><Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}><Icon name="close" color={'#fff'} size={17} /> Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => modalVisible.setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
    </View>
    
    
  );
}
export default FilePickerModal;

const styles = StyleSheet.create({
  

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
});