import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CareContext } from '../components/CareContext';

export default function CareListScreen({ navigation }) {
  const { profiles } = useContext(CareContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos los perfiles</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CareDetail', { person: item })}
          >
            <View style={styles.avatarWrapper}>
              {item.avatar ? (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
              ) : (
                <Text style={styles.avatarPlaceholder}>👤</Text>
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>Pronombres: {item.pronouns || '—'}</Text>
              <Text style={styles.sub}>Disponibilidad: {item.schedule || '—'}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
  },
  avatarWrapper: {
    width: 50, height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#8AB0AB'
  },
  avatar: { width: '100%', height: '100%' },
  avatarPlaceholder: { fontSize: 24 },
  name: { fontSize: 18, fontWeight: 'bold' },
  sub: { fontSize: 14, color: '#555' },
});
