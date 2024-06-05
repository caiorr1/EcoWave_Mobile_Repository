import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  InitialScreen: undefined;
  LoginScreen: undefined;
};

const { width, height } = Dimensions.get('window');

const InitialScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/ocg_saving.png')} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>bem-vindo.</Text>
        <Text style={styles.subtitle}>
          preservando a vida marinha por meio do descarte responsável de lixo.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 123, 255, 0.6)', // Cor azul com opacidade
  },
  textContainer: {
    marginTop: height * 0.2, // 20% from top
    marginLeft: width * 0.05, // 5% from left
    marginRight: width * 0.05, // 5% from right
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Raleway-Bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
  },
  button: {
    position: 'absolute',
    bottom: height * 0.05, // 5% from bottom
    left: width * 0.05, // 5% from left
    width: width * 0.9, // 90% of width
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#2B2B2B',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
});

export default InitialScreen;
