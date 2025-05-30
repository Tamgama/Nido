// ./src/screens/DumpScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const layout = Dimensions.get('window');

const ListItem = ({ item }) => {
  const { titulo, contenido, publisher, color } = item;
  return (
    <View style={[styles.itemContainer, { backgroundColor: color }]}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{titulo}</Text>
      <Text>{contenido}</Text>
      <Text style={{ fontStyle: 'italic', color: 'gray' }}>Por {publisher}</Text>
    </View>
  );
};

const curiosities = [
  { titulo: 'galaxia más lejana', contenido: 'HDMI1234', publisher: 'Tam', color: 'lightblue', id: '1' },
  { titulo: 'plantitas', contenido: 'arboris arboreo', publisher: 'Emeris', color: 'cadetblue', id: '2' },
  { titulo: 'los meros', contenido: 'bajo el mar', publisher: 'Albs', color: 'cornflowerblue', id: '3' },
  { titulo: 'cómo trasplantar calabazas', contenido: 'tips y consejos', publisher: 'Pam', color: 'green', id: '4' },
  { titulo: 'arte moderno', contenido: 'no tenéis ni idea', publisher: 'Clara', color: 'palevioletred', id: '5' },
  { titulo: 'drifting', contenido: 'historia del drifting', publisher: 'Mani', color: 'darkred', id: '6' },
  { titulo: 'las medusas', contenido: 'por qué son lo mejor', publisher: 'Albs', color: 'cornflowerblue', id: '7' },
  { titulo: 'anarquía', contenido: 'unanse a la secta', publisher: 'Toñi', color: 'lightcoral', id: '8' },
];

const movies = [
  { titulo: 'Inception', contenido: 'A mind-bending thriller', publisher: 'ConWay', color: 'lightblue', id: '1' },
  { titulo: 'The Matrix', contenido: 'A sci-fi classic', publisher: 'Emeris', color: 'cadetblue', id: '2' },
  { titulo: 'Interstellar', contenido: 'A space epic', publisher: 'Clara', color: 'cornflowerblue', id: '3' },
  { titulo: 'The Godfather', contenido: 'A crime drama masterpiece', publisher: 'Tam', color: 'green', id: '4' },
  { titulo: 'Pulp Fiction', contenido: 'A cult classic', publisher: 'Conway', color: 'palevioletred', id: '5' },
];

const CuriosityList = () => (
  <FlatList
    data={curiosities}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ListItem item={item} />}
    ListHeaderComponent={() => (
      <Text style={styles.header}>Info Dump 🧠</Text>
    )}
    ItemSeparatorComponent={() => (
      <View style={styles.separator} />
    )}
  />
);

const MovieList = () => (
  <FlatList
    data={movies}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ListItem item={item} />}
    ListHeaderComponent={() => (
      <Text style={styles.header}>Películas 🎬</Text>
    )}
    ItemSeparatorComponent={() => (
      <View style={styles.separator} />
    )}
  />
);

const DumpScreen = () => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'curiosities', title: 'Info dump' },
    { key: 'movies', title: 'Películas' },
  ]);

  const renderScene = SceneMap({
    curiosities: CuriosityList,
    movies: MovieList,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black' }}
            style={{ backgroundColor: 'white' }}
            activeColor="black"
            inactiveColor="gray"
            labelStyle={{ fontWeight: 'bold' }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  separator: {
    marginVertical: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 5,
  },
});

export default DumpScreen;
