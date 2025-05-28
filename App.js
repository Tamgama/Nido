import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable, FlatList} from 'react-native';

import DumpScreen from './src/screens/DumpScreen';


const App = () =>{
  return (
    <View>
      <DumpScreen/>
    </View>
  )
}

export default App;