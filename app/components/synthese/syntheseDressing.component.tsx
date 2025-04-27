import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import DressingModel from '../../models/dressing.model';
import { loadVetementsDressing } from '../../controllers/dressing/dressing.controller';

import VetementModel from '../../models/vetements/vetements.model';
import { SyntheseItemComponent } from './syntheseItem.component';
import { loadCapsulesDressing, loadNbCapsulesDressing } from '@/app/controllers/capsule/capsuleTemporelle.controller';
import { loadNbTenuesDressing, loadTenuesDressing } from '@/app/controllers/tenues/tenues.controller';



/**
 * Propriétés pour le composant DressingComponent.
 *
 * @typedef {Object} DressingComponentProps
 * @property {DressingModel} dressing - Le modèle de dressing à afficher.
 */
export type SyntheseDressingComponentProps = {
  readonly dressing: DressingModel;
};
/**
 * Composant principal pour un dressing
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export const SyntheseDressingComponent: React.FC<SyntheseDressingComponentProps> = ({ dressing }: SyntheseDressingComponentProps) => {

  const [isLoading, setIsLoading] = useState(true);
  const [vetements, setVetements] = useState<VetementModel[]>([]);
  const [tenues, setTenues] = useState<number>(0);
  const [capsules, setCapsules] = useState<number>(0);

  // Rechargement des vêtements si le dressing change
  useEffect(() => {

    loadVetementsDressing({ idDressing: dressing.id, setIsLoading, setVetements });
    loadNbCapsulesDressing(dressing.id).then((result) => {setCapsules(result)});
    loadNbTenuesDressing(dressing.id).then((result) => {setTenues(result)});
  }, [dressing]);




  /**
   * Retourne le contenu du panneau en fonction de l'état actuel du dressing.
   *
   * @returns {JSX.Element} - Un composant JSX représentant le contenu du panneau.
   * Si le dressing est indéfini, nul ou en cours de chargement, retourne un indicateur d'activité.
   * Si le dressing contient des vêtements et que le formulaire de vêtement n'est pas ouvert, retourne la liste des vêtements.
   * Sinon, retourne un composant indiquant que le dressing est vide avec une option pour ajouter un vêtement.
   */
  const getPanelContent = () => {
    if (dressing === undefined || dressing === null || isLoading) {
      return <ActivityIndicator color={Colors.app.color} size="large" />;
    }
    else {
      return (
        <SyntheseItemComponent dressing={dressing} vetements={vetements} tenues={tenues} capsules={capsules} />
      );
    }
  }


  return (getPanelContent());
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
    width: '100%'
  }
});
