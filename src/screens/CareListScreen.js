import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CareContext } from '../components/CareContext';

export default function CareListScreen({ navigation }) {
  const { profiles } = useContext(CareContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CareDetail', { person: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>Schedule: {item.schedule}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  sub: { fontSize: 14, color: '#555' },
  button: { backgroundColor: '#A9DBCF', padding: 15, borderRadius: 10 },
  buttonText: { color: '#000', textAlign: 'center', fontSize: 16 },
});
