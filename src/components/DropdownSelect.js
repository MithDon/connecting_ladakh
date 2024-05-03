import React, { forwardRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ApiClient } from "../../api";

const apiPath = ApiClient();
/*let allowedCities;
  apiPath.post('/allowed_cities', body)
    .then(response => {
      allowedCities = response.data.data;
    })
    .catch(error => {
      // Handle errors, including token-related errors
      console.error('API Error:', error);
    });*/
/*
const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];*/

export default function DropdownComponentTest({ items, placeholderValue, width, borderRadius }) {
  const [Optvalue, setValue] = useState(null);

  return (
    <Dropdown
      style={[styles.dropdown, { width: width, borderRadius: borderRadius }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemTextStyle={styles.itemTextStyle}
      iconStyle={styles.iconStyle}
      data={items}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholderValue}
      searchPlaceholder="Search..."
      value={Optvalue}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

const styles = StyleSheet.create({
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
    color:'#000'
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
  }
});