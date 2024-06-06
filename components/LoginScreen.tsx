import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGlobalState } from '../hooks/useGlobalState';

type RootStackParamList = {
  InitialScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ColetasScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useGlobalState();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      setError('');
    }, [])
  );

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso');
      setError('');
      navigation.navigate('ColetasScreen');
    } catch (err) {
      setError('Dados inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={styles.backButtonCircle}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>Olá Novamente :)</Text>
      <Text style={styles.subtitle}>Preencha Seus Dados.</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="xyz@gmail.com"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Senha"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.spacing} />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.signupText}>
          Novo por aqui?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('RegisterScreen')}>
            Crie uma conta!
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backButtonCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'Raleway-Bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7d7d7d',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Raleway-Regular',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: 'Raleway-Regular',
  },
  inputError: {
    borderColor: 'red',
  },
  spacing: {
    height: 20,
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  signupText: {
    textAlign: 'center',
    color: '#7d7d7d',
    fontFamily: 'Raleway-Regular',
  },
  signupLink: {
    color: '#1A1D1E',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
});

export default LoginScreen;
