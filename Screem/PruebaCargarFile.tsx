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

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
