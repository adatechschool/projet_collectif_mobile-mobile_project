import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Details from "./screen/details";
import Home from "./screen/home";
import Add from './screen/add';


export default function App() {

  function HomeStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    );
  }

  function AddStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Add' component={Add} />
      </Stack.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={HomeStackScreen}/>
        <Tab.Screen name='Add' component={AddStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

