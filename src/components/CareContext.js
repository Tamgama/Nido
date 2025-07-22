import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CareContext = createContext();

// 🔥 Perfiles predeterminados
const defaultProfiles = [
  {
    id: '1',
    name: 'Toñi',
    offers: ['Escucha', 'Soluciones', 'Contacto físico'],
    cannot: ['Acompañamiento en conductas violentas'],
    schedule: 'Tardes',
    signals: ['Caracola', 'Falta de apetito'],
    needs: ['Palabras de afirmación', 'Contacto físico']
  },
  {
    id: '2',
    name: 'Tam',
    offers: ['Escucha', 'Meditación', 'Paseos'],
    cannot: ['Gestión de tiempo y energía'],
    schedule: 'Mañanas',
    signals: ['Ironía', 'Poca paciencia'],
    needs: ['Salidas', 'Pasear', 'Opciones de ayuda']
  }
];

export function CareProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [myProfileId, setMyProfileId] = useState(null);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('profiles');
      if (stored) {
        setProfiles(JSON.parse(stored));
      } else {
        // 👇 Si no hay nada guardado, usamos los predeterminados
        setProfiles(defaultProfiles);
        await AsyncStorage.setItem('profiles', JSON.stringify(defaultProfiles));
      }

      const storedMyId = await AsyncStorage.getItem('myProfileId');
      if (storedMyId) setMyProfileId(storedMyId);
    })();
  }, []);

  const saveProfiles = async (newProfiles) => {
    setProfiles(newProfiles);
    await AsyncStorage.setItem('profiles', JSON.stringify(newProfiles));
  };

  const saveMyProfile = async (profile) => {
    let newProfiles = [...profiles];
    if (myProfileId) {
      // update
      newProfiles = newProfiles.map(p => p.id === myProfileId ? { ...profile, id: myProfileId } : p);
    } else {
      const id = Date.now().toString();
      profile.id = id;
      newProfiles.push(profile);
      setMyProfileId(id);
      await AsyncStorage.setItem('myProfileId', id);
    }
    await saveProfiles(newProfiles);
  };

  const myProfile = profiles.find(p => p.id === myProfileId);

  return (
    <CareContext.Provider value={{ profiles, myProfile, saveMyProfile }}>
      {children}
    </CareContext.Provider>
  );
}
