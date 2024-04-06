import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable  } from 'react-native';
import { LoginForm } from '../types/loginform';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loguin: React.FC = () => {
    const [token, setToken] = useState('');

  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("hola")
    // Aquí puedes mostrar una alerta de confirmación para que los usuarios revisen su información antes de enviarla
    Alert.alert(
      'Confirmación',
      `Correo electrónico: ${formData.email}\nContraseña: ${formData.password}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: () => sendRequest() },
      ]
    );


  };

  const sendRequest = async () => {
    console.log(formData)
    try {
      const response = await fetch('http://18.188.110.39:83/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log('Autenticación exitosa:', responseData);
        await AsyncStorage.setItem('prueba', 'este es un texto de prueba');

        await AsyncStorage.setItem('token', responseData.token);

      } else {
        Alert.alert('Error', 'Error en la autenticación');
        console.error('Error en la autenticación:', response.statusText);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al enviar la solicitud');
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <View>
      <Text>Iniciar Sesión</Text>
      <TextInput
        placeholder="Correo Electrónico"
        onChangeText={(text) => handleChange('email', text)}
        value={formData.email}
      />
      <TextInput
        placeholder="Contraseña"
        onChangeText={(text) => handleChange('password', text)}
        value={formData.password}
        secureTextEntry
      />
<Pressable onPress={handleSubmit}>
  <Text>Envio de datos</Text>
</Pressable>
      {/* Aquí puedes mostrar la información ingresada antes de enviarla */}
      <View style={{ marginTop: 20 }}>
        <Text>Información ingresada:</Text>
        <Text>Correo electrónico: {formData.email}</Text>
        <Text>Contraseña: {formData.password}</Text>
      </View>
    </View>
  );
};
//Button is deprecated. Please use Pressable
//TouchableOpacity is deprecated. Please use Pressable
//focusable is deprecated.
export default Loguin;
