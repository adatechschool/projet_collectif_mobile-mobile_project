import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import data from './details.json';
import {useEffect} from 'react';

export default function Home({ navigation }) {

  useEffect(()=>{
    try {
      const response = fetch('./details.json');
      const json = response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  },[]
  )
  return (
    <ScrollView>
      <StatusBar style="auto" />
      <View style={styles.container}>
        {data.map(data => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details')
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