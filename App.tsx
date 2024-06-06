import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import { GlobalStateProvider } from './hooks/useGlobalState';
import ColetasScreen from './components/ColetasScreen';
import LoadingScreen from './components/LoadingScreen';
import InitialScreen from './components/InitialScreen';

type RootStackParamList = {
  LoadingScreen: undefined;
  InitialScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ColetasScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const fetchFonts = () => {
  return Font.loadAsync({
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
  });
};

const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await fetchFonts();
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoadingScreen">
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="InitialScreen" component={InitialScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ColetasScreen" component={ColetasScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
};

export default App;
