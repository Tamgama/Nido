import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { CareContext } from '../components/CareContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const { myProfile } = useContext(CareContext);

  const options = [
    { id: '1', title: 'Editar mis datos', icon: 'create-outline', onPress: () => navigation.navigate('ProfileEdit') },
    { id: '2', title: 'Notificaciones', icon: 'notifications-outline', onPress: () => alert('Próximamente') },
    { id: '3', title: 'Ajustes', icon: 'settings-outline', onPress: () => alert('Próximamente') },
    { id: '4', title: 'Cerrar sesión', icon: 'log-out-outline', onPress: () => alert('Cerrar sesión') },
  ];

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          {myProfile?.avatar ? (
            <Image source={{ uri: myProfile.avatar }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarPlaceholder}>👤</Text>
          )}
        </View>
        <Text style={styles.name}>{myProfile?.name || 'Sin nombre'}</Text>
        <Text style={styles.subtitle}>Pronombres: {myProfile?.pronouns || '—'}</Text>
      </View>

      {/* Opciones */}
      <View style={styles.optionsContainer}>
        <FlatList
          data={options}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.optionItem} onPress={item.onPress}>
              <View style={styles.optionLeft}>
                <Ionicons name={item.icon} size={22} color="#8AB0AB" style={{ marginRight: 15 }} />
                <Text style={styles.optionText}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  avatarWrapper: {
    width: 100, height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#8AB0AB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  avatar: { width: '100%', height: '100%' },
  avatarPlaceholder: { fontSize: 40 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#777' },
  optionsContainer: { marginTop: 20 },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionText: { fontSize: 16, color: '#333' },
});
