import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from "@expo/vector-icons"
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
        <Stack.Screen name="Details" 
        component={Details}
        options={{title: "Spot Description"}} 
        />
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
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          // We customize with tab icons 
          headerShown: false,
          tabBarIcon: ({color, size}) => {
            let iconName;

            if(route.name == "Home") {
              iconName = "home"
            } else if (route.name == "Add") {
              iconName = "plus"
            }
            return <AntDesign name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor : "grey"
        })}
      >
        <Tab.Screen name='Home' component={HomeStackScreen}/>
        <Tab.Screen name='Add' component={AddStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}