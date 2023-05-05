import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function Details({ route }) {
    const { name, image, location } = route.params;
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>{name}</Text>
                <Image source={{uri: image}} style={{width:200, height:200}} />
                <Text style={styles.text}>{location}</Text>
            </View>
        </ScrollView>
    )
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