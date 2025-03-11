import { StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext } from 'react';
import { AppContext } from '../services/AppContextProvider';



/**
 * Composant principal de l'écran d'accueil.
 *
 * Ce composant utilise le contexte `AppContext` pour obtenir les données de connexion au backend.
 * Il affiche le titre de la page et l'environnement actuel.
 *
 * @returns {JSX.Element} Le composant JSX représentant l'écran d'accueil.
 */
export default function HomeScreen() {

  const { backendConnexionData } = useContext(AppContext)!;

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Homepage</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Environnement : {backendConnexionData?.env}</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
