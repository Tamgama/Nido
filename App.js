import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CareProvider } from './src/components/CareContext';

// Importa tus pantallas
import HomeScreen from './src/screens/HomeScreen';
import CareListScreen from './src/screens/CareListScreen';
import CareDetailScreen from './src/screens/CareDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CareProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{
                    marginRight: 10,
                    backgroundColor: '#A9DBCF',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Ionicons name="person" size={20} color="#fff" />
                </TouchableOpacity>
              ),
            })}
          /> 
          <Stack.Screen
            name="CareList"
            component={CareListScreen}
            options={({ navigation }) => ({
              title: 'All Profiles',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{
                    marginRight: 10,
                    backgroundColor: '#A9DBCF',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Ionicons name="person" size={20} color="#fff" />
                </TouchableOpacity>
              ),
            })}
      />
          <Stack.Screen
            name="CareDetail"
            component={CareDetailScreen}
            options={{ title: 'Profile Detail' }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'My Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CareProvider>
  );
}
