import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screem/HomeScreens';
import StackScreen from './Screem/StackScreen';
import { NavigationContainer } from '@react-navigation/native';
import Loguin from './Screem/loguin';
import Pruebas from './Screem/Pruebas';
import PruebaCargaFile from './Screem/PruebaCargarFile';
import CapturaComponente from './Screem/pruebaScrentShot';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={PruebaCargaFile} />

    </Tab.Navigator>
  );
}

export default function Navigation(){

return(
    <NavigationContainer>
        <MyTabs></MyTabs>
    </NavigationContainer>
)

}