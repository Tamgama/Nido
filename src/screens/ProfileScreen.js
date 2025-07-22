import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { CareContext } from '../components/CareContext';

export default function ProfileScreen() {
  const { myProfile, saveMyProfile } = useContext(CareContext);

  const [name, setName] = useState('');
  const [offers, setOffers] = useState('');
  const [cannot, setCannot] = useState('');
  const [schedule, setSchedule] = useState('');
  const [signals, setSignals] = useState('');
  const [needs, setNeeds] = useState('');

  // precargar datos si ya existe perfil
  useEffect(() => {
    if (myProfile) {
      setName(myProfile.name || '');
      setOffers((myProfile.offers || []).join(', '));
      setCannot((myProfile.cannot || []).join(', '));
      setSchedule(myProfile.schedule || '');
      setSignals((myProfile.signals || []).join(', '));
      setNeeds((myProfile.needs || []).join(', '));
    }
  }, [myProfile]);

  const handleSave = () => {
    const profile = {
      name,
      offers: offers.split(',').map(t => t.trim()).filter(Boolean),
      cannot: cannot.split(',').map(t => t.trim()).filter(Boolean),
      schedule,
      signals: signals.split(',').map(t => t.trim()).filter(Boolean),
      needs: needs.split(',').map(t => t.trim()).filter(Boolean),
    };
    saveMyProfile(profile);
    alert('Profile saved!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Offers (comma separated)" value={offers} onChangeText={setOffers} />
      <TextInput style={styles.input} placeholder="Cannot (comma separated)" value={cannot} onChangeText={setCannot} />
      <TextInput style={styles.input} placeholder="Schedule" value={schedule} onChangeText={setSchedule} />
      <TextInput style={styles.input} placeholder="Signals (comma separated)" value={signals} onChangeText={setSignals} />
      <TextInput style={styles.input} placeholder="Needs (comma separated)" value={needs} onChangeText={setNeeds} />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#A9DBCF', padding: 15, borderRadius: 10 },
  buttonText: { color: '#000', textAlign: 'center', fontSize: 16 },
});
