import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CareContext } from '../components/CareContext';

export default function ProfileEditScreen({ navigation }) {
  const { myProfile, saveMyProfile } = useContext(CareContext);

  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [offers, setOffers] = useState('');
  const [cannot, setCannot] = useState('');
  const [schedule, setSchedule] = useState('');
  const [signals, setSignals] = useState('');
  const [needs, setNeeds] = useState('');
  const [avatar, setAvatar] = useState('');
  const [triggers, setTriggers] = useState(myProfile.triggers || []);
  const [emergencycontact, setEmergencycontact] = useState(myProfile.emergencycontact || []);
  const [howtohelp, setHowtohelp] = useState(myProfile.howtohelp || '');
  const [untolerable, setUntolerable] = useState(myProfile.untolerable || []);

  useEffect(() => {
    if (myProfile) {
      setName(myProfile.name || '');
      setPronouns(myProfile.pronouns || '');
      setOffers((myProfile.offers || []).join(', '));
      setCannot((myProfile.cannot || []).join(', '));
      setSchedule(myProfile.schedule || '');
      setSignals((myProfile.signals || []).join(', '));
      setNeeds((myProfile.needs || []).join(', '));
      setAvatar(myProfile.avatar || '');
      setTriggers((myProfile.triggers || []).join(', '));
      setEmergencycontact((myProfile.emergencycontact || []).join(', '));
      setHowtohelp((myProfile.howtohelp || []).join(', '));
      setUntolerable((myProfile.untolerable || []).join(', '));
    }
  }, [myProfile]);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso requerido', 'Necesitas permitir acceso a la galería para cambiar la foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Campo obligatorio', 'El nombre es obligatorio.');
      return;
    }

    const profile = {
      name,
      pronouns,
      avatar,
      offers: offers.split(',').map(t => t.trim()).filter(Boolean),
      cannot: cannot.split(',').map(t => t.trim()).filter(Boolean),
      schedule,
      signals: signals.split(',').map(t => t.trim()).filter(Boolean),
      needs: needs.split(',').map(t => t.trim()).filter(Boolean),
      triggers: triggers.split(',').map(t => t.trim()).filter(Boolean),
      emergencycontact: emergencycontact.split(',').map(t => t.trim()).filter(Boolean),
      howtohelp: howtohelp.split(',').map(t => t.trim()).filter(Boolean),
      untolerable: untolerable.split(',').map(t => t.trim()).filter(Boolean),
    };
    saveMyProfile(profile);
    Alert.alert('¡Listo!', 'Perfil guardado correctamente.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={handlePickImage} style={styles.avatarWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <Text style={styles.addAvatarText}>Añadir foto</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Información básica */}
        <Text style={styles.sectionTitle}>Información básica</Text>
        <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Pronombres" value={pronouns} onChangeText={setPronouns} />
        <TextInput style={styles.input} placeholder="Disponibilidad" value={schedule} onChangeText={setSchedule} />

        {/* Cuidados */}
        <Text style={styles.sectionTitle}>Cuidados</Text>
        <TextInput style={styles.input} placeholder="Puedo (separar por comas)" value={offers} onChangeText={setOffers} />
        <TextInput style={styles.input} placeholder="No puedo (separar por comas)" value={cannot} onChangeText={setCannot} />
        <TextInput style={styles.input} placeholder="Señales de aviso (separar por comas)" value={signals} onChangeText={setSignals} />
        <TextInput style={styles.input} placeholder="Necesidades (separar por comas)" value={needs} onChangeText={setNeeds} />
        <TextInput style={styles.input} placeholder="Triggers (separar por comas)" value={triggers} onChangeText={setTriggers} />
        <TextInput style={styles.input} placeholder="Contacto de emergencia (separar por comas)" value={emergencycontact} onChangeText={setEmergencycontact} />
        <TextInput style={styles.input} placeholder="Cómo pedir ayuda (separar por comas)" value={howtohelp} onChangeText={setHowtohelp} />
        <TextInput style={styles.input} placeholder="No tolera (separar por comas)" value={untolerable} onChangeText={setUntolerable} />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar perfil</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8AB0AB'
  },
  avatar: { width: '100%', height: '100%' },
  addAvatarText: { color: '#888' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 15 },
  button: { backgroundColor: '#8AB0AB', padding: 15, borderRadius: 10, marginTop: 20, marginBottom: 50 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
