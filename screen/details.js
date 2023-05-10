import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

export default function Details({ route }) {
    const { point, image, location } = route.params;
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>{point}</Text>
                <Image source={{uri: image}} style={{width: 400, height:400}}/>
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