import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Nido </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CareList')}
      >
        <Text style={styles.buttonText}>View All Profiles</Text>
      </TouchableOpacity>

      {/* Aquí puedes añadir más secciones en el futuro */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: { backgroundColor: '#A9DBCF', padding: 15, borderRadius: 10, marginBottom: 15, width: '80%' },
  buttonText: { color: '#000', textAlign: 'center', fontSize: 16 },
});
