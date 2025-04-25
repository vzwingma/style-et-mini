import { ActivityIndicator, StyleSheet, View } from 'react-native';

import DressingModel from '../models/dressing.model';
import { DressingComponent } from '../components/dressing/dressings.component';
import { Colors } from '../constants/Colors';
import { Tabs } from '../constants/TabsEnums';
import { TenuesComponent } from '../components/dressing/tenues/tenues.component';
import { CapsuleComponent } from '../components/dressing/capsules/capsules.component';




interface DressingScreenProps {
  readonly dressing: DressingModel | undefined;
  readonly tab: Tabs;
}

/**
 * Ecran de gestion du dressing
 * @param dressing le dressing
 */
export default function DressingScreen({ tab, dressing }: DressingScreenProps) {


  function getPanelContent(): React.JSX.Element {
    if (dressing === undefined) {
      return <ActivityIndicator color={Colors.app.color} size="large" />;
    }
    else {
      switch (tab) {
        case Tabs.DRESSING:
          return <DressingComponent dressing={dressing} />;
        case Tabs.TENUES:
          return <TenuesComponent dressing={dressing} />;
        case Tabs.CAPSULE:
          return <CapsuleComponent dressing={dressing} />;
        default:
          return <ActivityIndicator color={Colors.app.color} size="large" />;
      }
    }
  }
  /**
   * Retourne le contenu du panneau en fonction de l'état de chargement, d'erreur ou des vêtements disponibles.
   *
   * @returns {React.JSX.Element} - Un élément JSX représentant le contenu du panneau.
   * - Si `isLoading` est vrai, retourne un indicateur d'activité.
   * - Si `error` n'est pas nul, retourne un texte thématisé affichant le message d'erreur.
   * - Sinon, retourne le panneau des vêtements en utilisant la fonction `showPanelVetements`.
   */
  return (
    getPanelContent()
  );
}