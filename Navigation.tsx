import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screem/HomeScreens';
import StackScreen from './Screem/StackScreen';
import { NavigationContainer } from '@react-navigation/native';
import Loguin from './Screem/loguin';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={StackScreen} />
      <Tab.Screen name="Loguin" component={Loguin} />

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