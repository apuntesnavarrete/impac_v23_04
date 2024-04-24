/*
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { launchImageLibrary} from 'react-native-image-picker';

const PruebaCargaFile = () => {

  const handlePress = async () => {

    let options = {
      mediaType: 'photo', // Specify 'photo' to pick only images
      storageOptions: {
        path: 'images',   // Optional: Specify a custom storage path (Android only)
      },
    };

   const result = await launchImageLibrary(options, response=>{
      console.log(result)
    })
  };

  return (
    <View style={styles.container}>
      <Button title="Presionar" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PruebaCargaFile; */

import { useRef, useState } from 'react';
import { Button, Image, View, StyleSheet , Text, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';


export default function PruebaCargaFile() {
  const [image, setImage] = useState(null);
  const viewShotRef = useRef(null);

  const [status, requestPermission] = MediaLibrary.usePermissions();
  // ...rest of the code remains same

  if (status === null) {
    requestPermission();
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    handleImage(result);
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    handleImage(result);
  };

  const handleImage = (result) => {
    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveToGallery = async () => {
  if (!image) {
    return;
  }

  const asset = await MediaLibrary.createAssetAsync(image);
  
  try {
    const album = await MediaLibrary.getAlbumAsync('YourAlbumName');
    
    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    } else {
      await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
    }

    alert('Image saved to gallery!');
  } catch (error) {
    console.error('Error saving image:', error);
    alert('An error occurred while saving the image.');
  }
};

const capturar = async () => {
  try {
    const uri = await viewShotRef.current.capture();

    // Guardar la captura de pantalla en la galería
    const asset = await MediaLibrary.createAssetAsync(uri);
  
    try {
      const album = await MediaLibrary.getAlbumAsync('YourAlbumName');
      
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
      }

      alert('Captura de pantalla guardada en la galería!');
    } catch (error) {
      console.error('Error guardando la captura de pantalla:', error);
      alert('Ocurrió un error al guardar la captura de pantalla.');
    }

  } catch (error) {
    console.error("Error al capturar la pantalla:", error);
  }
};

  return (
    <View style={styles.container}>
            <ScrollView>

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      <Button title="Capturar pantalla" onPress={capturar} />

      {image && (
        <View style={styles.imageContainer}>
        <ViewShot ref={viewShotRef}>

          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.overlay}>

            <View style={styles.overlayTop}>
            <Text style={styles.overlayTopText}>Mixta Sabatina</Text>
  <Text style={styles.overlayTopText}>24-marzo-24</Text>
              
            </View>

            <View style={styles.overlayBottom}>
              <Image 
                source={require('./ligaed.png')} 
                style={[styles.overlayImage]} 
                resizeMode="cover"
              />
              <Text style={styles.overlayTopText}>Destacados</Text>
              <Text style={styles.overlayTopText}>Liga ED</Text>
             
            </View>
            
        </View>
          </ViewShot>
        </View>
      )}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: 'relative',

  },
  image: {
    width: 300,
    height: 450,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 20,
    justifyContent: 'space-between',
   
    borderWidth: 1,       // Ancho del borde
    borderColor: 'black',
    
    
  },
  overlayTop:{
    fontWeight: 'bold', // Establecer peso de la fuente
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo con opacidad
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10, // Redondear las esquinas de la imagen
  },
  overlayTopText: {
    fontWeight: 'bold',
    fontSize: 15, // Tamaño de fuente
    color: '#FFFFFF', // Color de fuente
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Sombra de texto
    textShadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra
    textShadowRadius: 4, // Radio de la sombra
    
  },
  overlayBottom:{
    
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  overlayImage: {
    width: 70,  // Ajusta el tamaño de la imagen overlay según tus necesidades
    height: 95, // Ajusta el tamaño de la imagen overlay según tus necesidades
  },
});