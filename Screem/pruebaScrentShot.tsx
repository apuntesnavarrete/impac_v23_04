import React, { useRef } from 'react';
import { View, Text, Button } from 'react-native';
import ViewShot from 'react-native-view-shot';

const CapturaComponente = () => {
  const viewShotRef = useRef(null);

  const capturar = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      console.log("Captura de pantalla guardada en:", uri);
    } catch (error) {
      console.error("Error al capturar la pantalla:", error);
    }
  };

  return (
    <View>
      <ViewShot ref={viewShotRef}>
        <Text>Este es un texto dentro de un componente que queremos capturar.</Text>
        <Button title="Capturar pantalla" onPress={capturar} />
      </ViewShot>
    </View>
  );
};

export default CapturaComponente;








