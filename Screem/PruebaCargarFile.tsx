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

import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


export default function PruebaCargaFile() {
  const [image, setImage] = useState(null);

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

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.overlay}>
            <Image 
              source={require('./ligaed.png')} 
              style={styles.overlayImage} 
              resizeMode="cover"
            />
          </View>
        </View>
      )}
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
    width: 192,
    height: 192,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    width: 130,  // Ajusta el tamaño de la imagen overlay según tus necesidades
    height: 130, // Ajusta el tamaño de la imagen overlay según tus necesidades
  },
});