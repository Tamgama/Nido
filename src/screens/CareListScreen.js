import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { CareContext } from '../components/CareContext';

export default function CareListScreen({ navigation }) {
  const { cuidados, necesidades } = useContext(CareContext);
  if (!cuidados || !necesidades) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Cargando datos...</Text>
      </View>
    );
  }

  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Agrupar por name
  const personas = useMemo(() => {
    const agrupado = {};

    [...cuidados, ...necesidades].forEach((item) => {
      const tipo = cuidados.includes(item) ? 'cuidados' : 'necesidades';
      const nombre = item.name || 'Anónimo';

      if (!agrupado[nombre]) {
        agrupado[nombre] = { cuidados: [], necesidades: [] };
      }
      agrupado[nombre][tipo].push(item);
    });

    return Object.entries(agrupado).map(([name, data]) => ({
      name,
      ...data,
    }));
  }, [cuidados, necesidades]);

  // Aplicar filtros y búsqueda
  const personasFiltradas = personas.filter((p) => {
    if (filtro === 'cuidado' && p.cuidados.length === 0) return false;
    if (filtro === 'necesidad' && p.necesidades.length === 0) return false;

    const contenido = [
      ...p.cuidados.map((c) => c.titulo),
      ...p.necesidades.map((n) => n.titulo),
    ].join(' ').toLowerCase();

    return contenido.includes(busqueda.toLowerCase());
  });

  const renderItem = ({ item }) => {
    const person = {
      name: item.name,
      avatar: null, // Puedes cambiarlo si tienes una imagen
      pronouns: item.pronouns || '—',
      schedule: item.cuidados[0]?.horario || item.necesidades[0]?.horario || 'No indicada',
      offers: item.cuidados.map(c => c.titulo),
      cannot: item.necesidades.map(n => n.titulo),
      signals: item.necesidades.map(n => n.senales || []).flat(),
      needs: item.necesidades.map(n => n.como_ayudar || []).flat(),
      triggers: item.necesidades.map(n => n.triggers || []).flat(),
      untolerable: item.necesidades.map(n => n.untolerable || []).flat(),
      emergencycontact: item.necesidades.map(n => n.emergencycontact || []).flat(),
      howtohelp: item.necesidades.find(n => n.howtohelp)?.howtohelp || '',
    };

     return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CareDetailScreen', { person })}
      style={styles.card}
    >
      <Text style={styles.publisher}>👤 {item.name}</Text>

      {/* Cuidados */}
      {(item.offers?.length || item.cannot?.length || item.untolerable?.length) > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🫴 Cuidados</Text>
          {[...(item.offers || []), ...(item.cannot || []), ...(item.untolerable || [])].map((cuidado, i) => (
            <Text key={i} style={styles.itemText}>• {cuidado}</Text>
          ))}
        </View>
      )}

      {/* Necesidades */}
      {(item.signals?.length || item.needs?.length || item.triggers?.length || item.howtohelp?.length) > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🆘 Necesidades</Text>
          {[...(item.signals || []), ...(item.needs || []), ...(item.triggers || []), ...(Array.isArray(item.howtohelp) ? item.howtohelp : [item.howtohelp])].map((necesidad, i) => (
            <Text key={i} style={styles.itemText}>• {necesidad}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};


  return (
    <View style={styles.container}>
      {/* Filtros */}
      <View style={styles.filtros}>
        {['todos', 'cuidado', 'necesidad'].map((tipo) => (
          <TouchableOpacity
            key={tipo}
            style={[
              styles.botonFiltro,
              filtro === tipo && styles.botonFiltroActivo,
            ]}
            onPress={() => setFiltro(tipo)}
          >
            <Text style={styles.textoFiltro}>
              {tipo === 'todos' ? 'Todos' : tipo.charAt(0).toUpperCase() + tipo.slice(1) + 's'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Buscador */}
      <TextInput
        style={styles.buscador}
        placeholder="Buscar por palabra clave..."
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* Lista */}
      <FlatList
        data={personasFiltradas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 10,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  botonFiltro: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#ccc',
    borderRadius: 20,
  },
  botonFiltroActivo: {
    backgroundColor: '#4a90e2',
  },
  textoFiltro: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  buscador: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  lista: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemText: {
    marginLeft: 10,
    color: '#555',
  },
});
