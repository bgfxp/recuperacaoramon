import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }
    const payload = {
      name: username, 
      email,
      password,
    };

    console.log('Enviando dados:', payload);

    try {
      const response = await fetch('https://taskhub-s37f.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Status da resposta:', response.status);
      console.log('Cabeçalhos da resposta:', response.headers.raw());

      const data = await response.json();
      console.log('Dados da resposta:', data);

      if (response.ok) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
      } else {
        Alert.alert('Erro', data.message || 'Algo deu errado. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      Alert.alert('Erro', 'Não foi possível registrar. Verifique sua conexão e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscrever-se</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="gray"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="gray"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Inscrever-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#0d1117',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
