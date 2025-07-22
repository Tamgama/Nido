import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CareDetailScreen({ route }) {
  const { person } = route.params;

  const renderList = (label, items) => {
    if (!items || items.length === 0) return null;
    return (
      <>
        <Text style={styles.label}>{label}:</Text>
        {items.map((i, idx) => <Text key={idx} style={styles.item}>• {i}</Text>)}
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{person.name}</Text>
      <Text style={styles.label}>Schedule:</Text>
      <Text style={styles.item}>{person.schedule}</Text>
      {renderList('Offers', person.offers)}
      {renderList('Cannot', person.cannot)}
      {renderList('Signals', person.signals)}
      {renderList('Needs', person.needs)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  item: { fontSize: 16, marginLeft: 10, marginTop: 4 },
});
