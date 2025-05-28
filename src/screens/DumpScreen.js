// ./src/screens/DumpScreen.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,SafeAreaView, Text, View, Image, Button, Pressable, FlatList} from 'react-native';

const DumpScreen = () => {

    const curiosidades = [
        {
            titulo: 'galaxia más lejana',
            contenido: 'HDMI1234',
            publisher: 'Tam',
            color: 'azure',
            id : '1'
        },
        {
            titulo: 'plantitas',
            contenido: 'arboris arboreo',
            publisher: 'Emeris',
            color: 'cadetblue',
            id : '2'
        },
        {
            titulo: 'los meros',
            contenido: 'bajo el mar',
            publisher: 'Albs',
            color: 'cornflowerblue',
            id : '3'
        },
    ]

    return (
        <SafeAreaView>
            <Text>Zona TDAH – Info Dump 🧠</Text>

            <FlatList
                data = {curiosidades}
                keyExtractor = { (item) => item.id}
                renderItem = { (item) => <Text> {item.titulo} </Text>}
                >
            </FlatList>

            
        </SafeAreaView>
    )
};

export default DumpScreen
