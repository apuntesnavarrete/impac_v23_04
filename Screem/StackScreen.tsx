import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StackScreen = () => {
  const [token, setToken] = useState('');

  const retrieveToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const prueba = await AsyncStorage.getItem('prueba');
      console.log('prueba encontrado:', prueba);

      if (storedToken !== null) {
        console.log('Token encontrado:', storedToken);
        console.log('prueba encontrado 2:', prueba);

        // Aquí puedes realizar cualquier otra acción que necesites con el token, como enviarlo a un servidor o almacenarlo en otro lugar.
      } else {
        console.log('No se encontró ningún token almacenado.');
      }
    } catch (error) {
      console.log('Error al recuperar el token:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Ver Token" onPress={retrieveToken} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StackScreen;
/*
import React from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TextInput, Button } from 'react-native';

const StackScreen = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file[0]);
    formData.append('name', data.name);
    formData.append('Curp', data.Curp);
    formData.append('Email', data.Email);
    formData.append('birthDate', data.birthDate);

    try {
      const response = await fetch('http://18.188.110.39:83/api/v1/participants', {
        method: 'POST',
        body: formData,
        headers:{
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        // Handle success response
        // For example, navigate to another screen
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput onChangeText={text => register('name', { required: true, value: text })} />

      <Text>Curp:</Text>
      <TextInput onChangeText={text => register('Curp', { required: true, value: text })} />

      <Text>Email:</Text>
      <TextInput onChangeText={text => register('Email', { required: true, value: text })} />

      <Text>Birth Date:</Text>
      <TextInput onChangeText={text => register('birthDate', { required: true, value: text })} />

      <Text>File:</Text>
      <Button
        title="Choose File"
        onPress={() => {
          // Handle file selection here
        }}
      />

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export default StackScreen;
*/