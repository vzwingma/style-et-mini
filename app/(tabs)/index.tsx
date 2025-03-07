import { StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext } from 'react';
import { AppContext } from '../services/AppContextProvider';



export default function HomeScreen() {

  const { backendConnexionData } = useContext(AppContext)!;


  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Homepage</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Environnement : {backendConnexionData?.env}</ThemedText>
        <ThemedText type="subtitle">URL : {process.env.EXPO_PUBLIC_BACKEND_URL}</ThemedText>
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
