import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function CareDetailScreen({ route }) {
  const { person } = route.params;

  const renderList = (label, items) => {
    if (!items || items.length === 0) return null;
    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        {items.map((i, idx) => (
          <Text key={idx} style={styles.item}>• {i}</Text>
        ))}
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        {person.avatar ? (
          <Image source={{ uri: person.avatar }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarPlaceholder}>👤</Text>
        )}
      </View>

      <Text style={styles.title}>{person.name}</Text>

      <Text style={styles.label}>Pronombres</Text>
      <Text style={styles.item}>{person.pronouns || '—'}</Text>

      <Text style={styles.label}>Disponibilidad</Text>
      <Text style={styles.item}>{person.schedule}</Text>

      {renderList('Puedo', person.offers)}
      {renderList('No puedo', person.cannot)}
      {renderList('Señales', person.signals)}
      {renderList('Necesidades', person.needs)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  avatarWrapper: {
    width: 120, height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#8AB0AB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  avatar: { width: '100%', height: '100%' },
  avatarPlaceholder: { fontSize: 48 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  item: { fontSize: 16, marginLeft: 10, marginTop: 4 },
});
