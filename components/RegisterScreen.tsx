import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterScreen'>;

const { width, height } = Dimensions.get('window');

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        nome_usuario: name,
        senha_hash: password,
        email: email,
        localizacao: "localizacao", // Ajuste conforme necessário
        foto_perfil: "foto_perfil" // Ajuste conforme necessário
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Registro realizado com sucesso');
        navigation.navigate('LoginScreen');
      } else {
        setError('Usuário já registrado');
      }
    } catch (error) {
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
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Preencha Seus Dados.</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="xxxxxxx"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Endereço de E-mail</Text>
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
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Criar Conta</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.signupText}>
          Já possui uma conta?{' '}
          <Text style={styles.signupLink} onPress={() => navigation.navigate('LoginScreen')}>
            Faça login.
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
    fontFamily: 'Raleway-Bold',
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
  formContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
  },
  inputError: {
    borderColor: 'red',
  },
  registerButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
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

export default RegisterScreen;
