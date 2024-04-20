
/*
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
*/
/*
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, Text, TextInput, Button, Alert, Pressable } from 'react-native';

type FieldValues = {
  name: string;
  Curp: string;
  Email: string;
  birthDate: string;
  // Puedes agregar más campos aquí si es necesario
};

const StackScreen = () => {
  const { register, handleSubmit: handleFormSubmit } = useForm<FieldValues>();
  const [formData, setFormData] = useState<FieldValues>({
    name: '',
    Curp: '',
    Email: '',
    birthDate: '',
  });
  const storedToken = AsyncStorage.getItem('token');


  const handleChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendRequest = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    console.log(storedToken);

    const formData = new FormData();
    // Aquí deberías incluir lógica para agregar archivos a formData si es necesario

    formData.append('name', data.name);
    formData.append('Curp', data.Curp);
    formData.append('Email', data.Email);
    formData.append('birthDate', data.birthDate);

    console.log(data.name)

    try {
      const response = await fetch('http://18.188.110.39:83/api/v1/participants', {
        method: 'POST',
        body: formData,
        headers:{
          'Authorization': `Bearer ${storedToken}`,
        }
      });

      if (response.ok) {
        console.log("Registro exitoso")
      } else {
        console.log("algo salio mal")
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  

  const handleSubmit = () => {
    Alert.alert(
      'Confirmación',
      `Nombre: ${formData.name}\nCurp: ${formData.Curp}\nCorreo electrónico: ${formData.Email}\nFecha de nacimiento: ${formData.birthDate}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: () => sendRequest() },
      ]
    );
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput 
        onChangeText={text => { handleChange('name', text); register('name', { required: true, value: text }); }}
        value={formData.name}
      />

      <Text>Curp:</Text>
      <TextInput 
        onChangeText={text => { handleChange('Curp', text); register('Curp', { required: true, value: text }); }}
        value={formData.Curp}
      />

      <Text>Email:</Text>
      <TextInput 
        onChangeText={text => { handleChange('Email', text); register('Email', { required: true, value: text }); }}
        value={formData.Email}
      />

      <Text>Birth Date:</Text>
      <TextInput 
        onChangeText={text => { handleChange('birthDate', text); register('birthDate', { required: true, value: text }); }}
        value={formData.birthDate}
      />

      <Text>File:</Text>
      <Button
        title="Choose File"
        onPress={() => {
          // Handle file selection here
        }}
      />
<Pressable onPress={handleSubmit}>
  <Text>Envio de datos</Text>
</Pressable>

      <View>
        <Text>Información ingresada:</Text>
        <Text>Nombre: {formData.name}</Text>
        <Text>Curp: {formData.Curp}</Text>
        <Text>Correo electrónico: {formData.Email}</Text>
        <Text>Fecha de nacimiento: {formData.birthDate}</Text>
      </View>
    </View>
  );
};

export default StackScreen;
*/
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Jugadorestype } from '../types/jugadores';
import ImagePicker from 'react-native-image-picker';



const JugadoresScreen: React.FC = () => {
  const [formData, setFormData] = useState<Partial<Jugadorestype>>({
    name: '',
    /*
    birthDate: '',
    createdAt: '',
    updatedAt: '',
    Email: '',
    Photo: '',
    Curp: ''
  */
  });

  const handleChange = (name: keyof Jugadorestype, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("data")
    sendRequest()
    // Aquí puedes mostrar una alerta de confirmación para que los usuarios revisen su información antes de enviarla
    Alert.alert(
      'Confirmación',
      `Nombre: ${formData.name}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: () => sendRequest() },
      ]
    );
  };

  
  const sendRequest = async () => {
  //  const storedToken = await AsyncStorage.getItem('token');
   // console.log(storedToken);
    console.log(formData)

    try {
      const response = await fetch('http://localhost:4000/api/v1/participants', {
        method: 'POST',
        headers: {
         /* 'Authorization': `Bearer ${storedToken}`,*/
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();

        console.log('Respuesta exitosa:', responseData);
        // Aquí puedes manejar la respuesta exitosa como lo desees, como redireccionar a otra pantalla, mostrar un mensaje de éxito, etc.
      } else {
        Alert.alert('Error', 'Error en el envío de datos');
        console.error('Error en el envío de datos:', response.statusText);
      }
    } catch (error) {
      Alert.alert('Error', 'Error al enviar la solicitud');
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <View>
      <Text>Agregar Jugador</Text>
      <TextInput
        placeholder="Nombre"
        onChangeText={(text) => handleChange('name', text)}
        value={formData.name}
      />
    
   

      <Pressable onPress={handleSubmit}>
        <Text>Enviar Datos</Text>
      </Pressable>
      {/* Aquí puedes mostrar la información ingresada antes de enviarla */}
      <View style={{ marginTop: 20 }}>
        <Text>Información ingresada:</Text>
        <Text>Nombre: {formData.name}</Text>
        
      </View>
    </View>
  );
};

export default JugadoresScreen;



