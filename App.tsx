/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Provider, ActivityIndicator, MD2Colors } from 'react-native-paper'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { theme } from './src/core/theme'
import {
  VerifyOtp,
  LoginScreen,
  RegisterScreen,
  Dashboard,
  SearchScreen,
  Profile,
  ManageVehicles,
  DriverVehicleAvailability
} from './src/screens'

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerContent from './DrawerContent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'

const myLoader = () => (
  <ActivityIndicator animating={true} color={MD2Colors.red800} />
);

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="ManageVehicles" component={ManageVehicles} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="DriverVehicleAvailability" component={DriverVehicleAvailability} />
      <Stack.Screen name="LoginScreen" component={LoginNav} />
    </Stack.Navigator>
  );
}

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="SearchScreen" component={StackNav} />
    </Drawer.Navigator>
  );
}

const LoginNav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="SearchScreen" component={DrawerNav} />

    </Stack.Navigator>
  );
}

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.black : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}


function App(): React.JSX.Element {
  const [isUserLoggedin, setIsLoggedIn] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isUserLoggedin');
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, [isUserLoggedin]);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        {isUserLoggedin ? <DrawerNav /> : <LoginNav />}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
