import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CareContext = createContext();

// 🔥 Perfiles predeterminados
const defaultProfiles = [
  {
    id: '1',
    name: 'Toñi',
    pronouns: 'ella',
    offers: ['Escucha', 'Soluciones', 'Contacto físico'],
    cannot: ['Acompañamiento en conductas violentas'],
    schedule: 'Tardes',
    signals: ['Caracola', 'Falta de apetito'],
    needs: ['Palabras de afirmación', 'Contacto físico'],
    triggers:['Falta de respeto', 'Discusiones grupales'],
    howtohelp: ['Escuchar', 'Ofrecer soluciones', 'Contacto físico'],
    emergencycontact: ['Bea', 'Tam', 'Conway'],
    untolerable: ['Falta de respeto', 'Críticas destructivas'],
  },
  {
    id: '2',
    name: 'Tam',
    pronouns: 'elle',
    offers: ['Escucha', 'Meditación', 'Paseos'],
    cannot: ['Drogas', 'Violencia'],
    schedule: 'Mañanas',
    signals: ['Ironía', 'Poca paciencia'],
    needs: ['Salidas', 'Pasear', 'Opciones de ayuda'],
    triggers: ['Falta de respeto', 'Discusiones grupales'],
    howtohelp: ['Mensajes', 'Visitas', 'Paseos'],
    emergencycontact: ['Toñi', 'Conway'],
    untolerable: ['Falta de respeto', 'Presión excesiva'],
  }
];

export function CareProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [myProfileId, setMyProfileId] = useState(null);

  useEffect(() => {
  (async () => {
    const stored = await AsyncStorage.getItem('profiles');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProfiles(parsed);
      } else {
        setProfiles(defaultProfiles);
        await AsyncStorage.setItem('profiles', JSON.stringify(defaultProfiles));
      }
    } else {
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

  const myProfile = profiles.find(p => p.id === myProfileId) || profiles[0] || null;

  return (
    <CareContext.Provider value={{ profiles, myProfile, saveMyProfile }}>
      {children}
    </CareContext.Provider>
  );
}
