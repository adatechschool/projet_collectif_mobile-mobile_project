import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Details from "./screen/details";
import Home from "./screen/home";
import Add from './screen/add';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// We organize the navigation with React Navigation
export default function App() {

  function HomeStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" 
        component={Home} 
        options={{title: "Welcome to Spotsurf"}}
        />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    );
  }

  function AddStackScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen name='AddScreen' 
        component={Add} 
        options={{title: "Add a surf spot"}}
        />
      </Stack.Navigator>
    )
  }
  // We use nested stack navigation in tab of 2 screen (Home and Add) 
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Home' component={HomeStackScreen}/>
        <Tab.Screen name='Add' component={AddStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}