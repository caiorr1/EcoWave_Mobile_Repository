import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const fetchFonts = () => {
  return Font.loadAsync({
    'Raleway-Regular': require('./assets/fonts/Raleway-VariableFont_wght.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Italic-VariableFont_wght.ttf'),
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
