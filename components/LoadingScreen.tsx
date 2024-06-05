import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  LoadingScreen: undefined;
  InitialScreen: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LoadingScreen'>;

const LoadingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('InitialScreen');
    }, 2000); // 3 segundos de delay
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/wave1.png')} style={styles.logo} />
      <Text style={styles.text}>ecowave</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Raleway-Regular',
  },
});

export default LoadingScreen;
