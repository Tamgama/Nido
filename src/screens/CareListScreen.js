import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { CareContext } from '../components/CareContext';

const { width } = Dimensions.get('window');
const defaultAvatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export default function CareListScreen({ navigation }) {
  const { profiles } = useContext(CareContext);

  const necesidadesData = profiles.map(p => ({
    id: p.id,
    name: p.name,
    signals: p.signals,
    needs: p.needs,
    avatar: p.avatar || defaultAvatar,
  }));

  const cuidadosData = profiles.map(p => ({
    id: p.id,
    name: p.name,
    offers: p.offers,
    cannot: p.cannot,
    schedule: p.schedule,
    avatar: p.avatar || defaultAvatar,
  }));

  const renderNecesidad = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CareDetail', { profileId: item.id })}
    >
      <View style={styles.headerRow}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
      {item.signals?.length > 0 && (
        <Text style={styles.info}>👁️ Señales: {item.signals.join(', ')}</Text>
      )}
      {item.needs?.length > 0 && (
        <Text style={styles.info}>❤️‍🩹 Necesidades: {item.needs.join(', ')}</Text>
      )}
    </TouchableOpacity>
  );

  const renderCuidado = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CareDetail', { profileId: item.id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      {item.offers?.length > 0 && (
        <Text style={styles.info}>🫴 Cuenta conmigo para... {item.offers.join(', ')}</Text>
      )}
      {item.cannot?.length > 0 && (
        <Text style={styles.info}>🚩 No puedo sostener... {item.cannot.join(', ')}</Text>
      )}
      {item.schedule ? (
        <Text style={styles.info}>🕒 Disponibilidad: {item.schedule}</Text>
      ) : null}
    </TouchableOpacity>
  );

  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        {/* NECESIDADES */}
        <View style={{ width }}>
          <Text style={styles.sectionTitle}>❤️‍🩹 Necesidades</Text>
          <FlatList
            data={necesidadesData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNecesidad}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        {/* CUIDADOS */}
        <View style={{ width }}>
          <Text style={styles.sectionTitle}>🤝 Cuidados</Text>
          <FlatList
            data={cuidadosData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCuidado}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#444',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  info: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
  },
});