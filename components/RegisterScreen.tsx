import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterScreen'>;

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    axios.post('http://seu-endereco-api/api/register', {
      email: email,
      password: password
    })
    .then(response => {
      Alert.alert('Sucesso', 'Registro realizado com sucesso');
      navigation.navigate('LoginScreen');
    })
    .catch(error => {
      Alert.alert('Erro', 'Falha no registro. Tente novamente.');
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <View style={styles.backButtonCircle}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>Crie sua conta</Text>
      <Text style={styles.subtitle}>Preencha Seus Dados.</Text>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="xyz@gmail.com"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Confirme a Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirme a Senha"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
});

export default RegisterScreen;
