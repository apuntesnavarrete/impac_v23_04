import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, StyleSheet,ScrollView  } from "react-native";
import { apiruta } from "../config/apiruta";
import { Jugadorestype } from "../types/jugadores";

function HomeScreen() {
  const [data, setData] = useState<Jugadorestype[]>([]);
  const [loading, setLoading] = useState(true);

  const [jugadoresfiltrados, setjugadoresfiltrados] = useState<Jugadorestype[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiruta}/api/v1/participants`);
        const result: Jugadorestype[] = await response.json();

        const jugadoresOrdenados = result.sort((b, a) => a.id - b.id);
        const primeros100Jugadores = jugadoresOrdenados.slice(0, 100);

        setData(result);
        setjugadoresfiltrados(primeros100Jugadores);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Cargando datos...</Text>;
  }

  const handleBusquedaChange = (valorBusqueda: string) => {
    setBusqueda(valorBusqueda);
    const datosFiltrados = data.filter((jugador) =>
      jugador.name.toLowerCase().includes(valorBusqueda.toLowerCase())
    );
    setjugadoresfiltrados(datosFiltrados)
  }

  return (
   <ScrollView>
     <View>
      <Text>Lectura de jugadores new</Text>

      <TextInput
        placeholder="Buscar por nombre"
        value={busqueda}
        onChangeText={handleBusquedaChange}
      />


      <View>
        {jugadoresfiltrados.map((jugador) => (
          <View key={jugador.id} style={buscador.card}
          >
            <Text>ID .- {jugador.id}</Text>
            <Text>Nombre.- {jugador.name}</Text>
            <Text>Correo.-{jugador.Email}</Text>
            <Image
              source={{ uri: `${apiruta}/public/participants/${jugador.Photo}` }}
              style={buscador.PhotoTablas}
              resizeMode="cover"
            />
            <Text>Curp.- {jugador.Curp}</Text>
          </View>
        ))}
      </View>
    </View>
   </ScrollView>
  );
}

const buscador = StyleSheet.create({
  PhotoTablas: {
    width: 100,
    height: 100,
  },
  card:{
    borderColor: 'black', // Cambia 'red' por el color que desees
    borderWidth: 1, // Opcional: puedes especificar el ancho del borde  }
},}
);

export default HomeScreen;