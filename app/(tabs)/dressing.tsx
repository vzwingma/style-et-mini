import { ActivityIndicator, StyleSheet, View } from 'react-native';

import DressingModel from '../models/dressing.model';
import { DressingComponent } from '../components/dressing/dressing.component';
import { Colors } from '../constants/Colors';




interface DressingScreenProps {
  readonly dressing: DressingModel | undefined;
} 

/**
 * Ecran de gestion du dressing
 * @param dressing le dressing
 */
export default function DressingScreen({ dressing }: DressingScreenProps) {

  /**
   * Retourne le contenu du panneau en fonction de l'état de chargement, d'erreur ou des vêtements disponibles.
   *
   * @returns {React.JSX.Element} - Un élément JSX représentant le contenu du panneau.
   * - Si `isLoading` est vrai, retourne un indicateur d'activité.
   * - Si `error` n'est pas nul, retourne un texte thématisé affichant le message d'erreur.
   * - Sinon, retourne le panneau des vêtements en utilisant la fonction `showPanelVetements`.
   */
  function getPanelContent(): React.JSX.Element {
    if (dressing === undefined) {
      return <ActivityIndicator color={Colors.app.color} size="large" />;
    }
    else {
      return <DressingComponent dressing={dressing} />;
    }
  }

  return (
    <View style={styles.stepContainer}>
      {getPanelContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    width: '100%',
    backgroundColor: Colors.dark.background,
  }
});
