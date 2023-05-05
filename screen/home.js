import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  const spots = [{
    name: "Gold Coast",
    image: "https://images.unsplash.com/photo-1476574898132-040f50db0a01?ixlib=rb-4.0.3&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: "Melbourne, Australia"
  }, {
    name: "Reef Break",
    image: "https://images.unsplash.com/photo-1459745930869-b3d0d72c3cbb?ixlib=rb-4.0.3&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'",
    location: "Hawai, United States"
  },{
    name: 'Beach Break',
    image: 'https://images.unsplash.com/photo-1482531007909-192ac913980a?ixlib=rb-4.0.3&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    location: 'New York, United States'
  }
]
  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {spots.map(data => {
        return (
          <>
            <TouchableOpacity 
            onPress={() => {
                navigation.navigate('Details', {
                    name: data.name,
                    image: data.image,
                    location: data.location            })
                }}
            >
              <Text style={styles.text}>{data.name}</Text>
            </TouchableOpacity>
          </>
        )
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 25
    }
  });