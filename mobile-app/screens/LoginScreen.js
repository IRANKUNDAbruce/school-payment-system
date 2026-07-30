import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      const token = res.data.token;
      // crude role detection: call /api/auth/me not implemented — for demo, navigate to student
      // In production, decode token and route accordingly
      navigation.navigate('Student', { token });
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Login" onPress={login} />
    </View>
  );
}
