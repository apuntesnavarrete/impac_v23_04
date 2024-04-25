
import { useRef, useState } from 'react';
import { Button, Image, View, StyleSheet , Text, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import { getCurrentDate } from '../util/dateUtil';
import { Picker } from '@react-native-picker/picker';


export default function PruebaCargaFile() {
  const [image, setImage] = useState(null);
  const viewShotRef = useRef(null);
  const [selectedOptionCategoria, setSelectedOptionCategoria] = useState('Mixta Sabatina');

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

const currentDate = getCurrentDate();


  return (
    <View style={styles.container}>
            <ScrollView>

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={takePhoto} />
      <Button title="Capturar pantalla" onPress={capturar} />
      <Picker
        selectedValue={selectedOptionCategoria}
        onValueChange={(itemValue, itemIndex) => setSelectedOptionCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Mixta Sabatina" value="Mixta Sabatina" />
        <Picker.Item label="Libre Sabatina" value="Libre Sabatina" />
        <Picker.Item label="Sub21" value="Sub21" />
      </Picker>
      {image && (
        <View style={styles.imageContainer}>
        <ViewShot ref={viewShotRef}>

          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.overlay}>

            <View style={styles.overlayTop}>
            <Text style={styles.overlayTopText}>{selectedOptionCategoria}</Text>
            <Text style={styles.overlayTopText}>{currentDate}</Text>
              
            </View>

            <View style={styles.overlayBottom}>
              <Image 
                source={require('./ligaed.png')} 
                style={[styles.overlayImage]} 
                resizeMode="cover"
              />
               <View style={styles.overlayBotton}>
               <Text style={styles.overlayTopText}>Jugadores Destacados</Text>
               <Text style={styles.overlayTopText}>-Liga ED-</Text>

               </View>
              
             
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
  overlayBotton:{
  
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
    textAlign:'center'
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});