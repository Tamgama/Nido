import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { CareContext } from '../components/CareContext';

const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export default function CareDetailScreen({ route }) {
  const { profiles } = useContext(CareContext);
  const { profileId } = route.params;

  const person = profiles.find(p => p.id === profileId);

  if (!person) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Cargando perfil...</Text>
      </View>
    );
  }

  // función auxiliar para mostrar chips
  const renderChips = (items = []) => (
    <View style={styles.chipContainer}>
      {items.map((item, idx) => (
        <View key={idx} style={styles.chip}>
          <Text style={styles.chipText}>{item}</Text>
        </View>
      ))}
    </View>
  );

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
  container: { flex: 1, backgroundColor: '#f7f9fc', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loading: { fontSize: 18, color: '#555' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    backgroundColor: '#ddd',
  },
  name: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  sectionTitleSmall: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  text: { fontSize: 15, color: '#555', marginTop: 4 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  chip: {
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  chipText: { fontSize: 14, color: '#00796b', fontWeight: '500' },
});
