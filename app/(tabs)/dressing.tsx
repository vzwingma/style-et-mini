import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import DressingModel from '../models/dressing.model';

import DressingComponent from '../components/dressing/dressing.component';


interface DressingScreenProps {
  dressing: DressingModel | undefined;
}

/**
 * Ecran de gestion du dressing
 * @param id id du dressing
 */
export default function DressingScreen({ dressing }: DressingScreenProps) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);



  /**
   * Retourne le contenu du panneau en fonction de l'état de chargement, d'erreur ou des vêtements disponibles.
   *
   * @returns {React.JSX.Element} - Un élément JSX représentant le contenu du panneau.
   * - Si `isLoading` est vrai, retourne un indicateur d'activité.
   * - Si `error` n'est pas nul, retourne un texte thématisé affichant le message d'erreur.
   * - Sinon, retourne le panneau des vêtements en utilisant la fonction `showPanelVetements`.
   */
  function getPanelContent(): React.JSX.Element {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null || dressing === undefined) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error?.message}</ThemedText>
    } else {
      return <DressingComponent dressing={dressing} />;
    }
  }

  return (
    <ThemedView style={styles.stepContainer}>
      {getPanelContent()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    width: '100%',
  },
  stepContainer: {
    width: '100%',
    padding: 1
  }
});
