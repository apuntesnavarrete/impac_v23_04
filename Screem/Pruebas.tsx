import * as MediaLibrary from 'expo-media-library';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';

const Pruebas = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<Camera | null>(null); // Añadir tipo de referencia genérico

  // Solicitar permisos para acceder a la cámara
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      
      setHasCameraPermission(
        cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted'
      );
    })();
  }, []);

  // Función para tomar una foto
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo); // Ver información de la foto en la consola
      setCapturedPhoto(photo);
    }
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission ? (
        <>
          <Camera
            style={styles.camera}
            type={CameraType.front} // Usar cadena literal para especificar la cámara trasera
            ref={cameraRef}
          />
          <Button title="Tomar foto" onPress={takePicture} />
          {capturedPhoto && <Image source={{ uri: capturedPhoto.uri }} style={styles.previewImage} />}
        </>
      ) : (
        <Text>No se han otorgado permisos para acceder a la cámara</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: 400,
  },
  previewImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default Pruebas;



