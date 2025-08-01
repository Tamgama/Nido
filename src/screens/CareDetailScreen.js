import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function CareDetailScreen({ route }) {
  const { person } = route.params;

  const defaultAvatar = 'https://via.placeholder.com/100'; // Imagen por defecto si no hay avatar

  const renderChips = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <View style={styles.chipWrapper}>
        {items.map((item, idx) => (
          <View key={idx} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerRow}>
        <Image
          source={{ uri: person.avatar || defaultAvatar }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{person.name}</Text>
      </View>

      {/* Cuidados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🫴 Cuenta conmigo para... </Text>
        {renderChips(person.offers)}
        <Text style={styles.sectionTitleSmall}>🚩 No puedo sostener...</Text>
        {renderChips(person.cannot)}
        <Text style={styles.sectionTitleSmall}>🕒 Disponibilidad</Text>
        <Text style={styles.text}>{person.schedule || 'No indicada'}</Text>
      </View>

      {/* Necesidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💡 Necesidades y señales</Text>
        <Text style={styles.sectionTitleSmall}>📌 Señales de alerta</Text>
        {renderChips(person.signals)}
        <Text style={styles.sectionTitleSmall}>❤️ Cómo ayudar</Text>
        {renderChips(person.needs)}
      </View>

      {/* Límites y detalles nuevos */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚦 Límites y detalles</Text>
        <Text style={styles.sectionTitleSmall}>⚡ Triggers (activadores)</Text>
        {renderChips(person.triggers)}
        <Text style={styles.sectionTitleSmall}>🧭 No tolera en crisis</Text>
        {renderChips(person.untolerable)}
        <Text style={styles.sectionTitleSmall}>📞 Personas designadas</Text>
        {renderChips(person.emergencycontact)}
        <Text style={styles.sectionTitleSmall}>🆘 Cómo pedir ayuda</Text>
        <Text style={styles.text}>{person.howtohelp || 'No indicado'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#8AB0AB',
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionTitleSmall: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#555',
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 4,
  },
  chipWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginLeft: 10,
    marginTop: 4,
  },
  chip: {
    backgroundColor: '#E0F2F1',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    color: '#00695C',
  },
});