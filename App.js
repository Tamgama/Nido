import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableHighlight, TouchableOpacity} from 'react-native';

const icon = require('./assets/otter-logo.png')

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={icon} style={{width: 150, height: 150}}/>
      <StatusBar style="auto"/>

      <Text>Nido</Text>

      <TouchableOpacity
        onPress={() => alert('Bienvenide 💛')}
        style={{
          width: 200,
          height: 50,
          backgroundColor: 'orange',
          borderColor: 'black',
          borderRadius:20,
          justifyContent: 'center',
          alignItems: 'center'}}
        >
        <Text style={{color: 'white',
          textAlign: 'center',
          fontWeight: 'bold', 
}}
          > Gracias por venir </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
