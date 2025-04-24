import { Pressable, Image, View } from 'react-native'

import React from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { getTabOutfitIcon } from '../commons/tab/TabBarIcon';
import DressingModel from '@/app/models/dressing.model';
import { stylesEmptyList } from '../dressing/dressingEmpty.component';


export type CapsulesComponentProps = {
  dressing: DressingModel;
  openAddEditCapsule: Function;
};


/**
 * Composant React fonctionnel représentant un écran vide pour les capsules.
 * 
 * @param {CapsulesComponentProps} props - Les propriétés du composant.
 * @param {Dressing} props.dressing - L'objet dressing contenant les informations de catégorie.
 * @param {(capsule: any) => void} props.openAddCapsule - Fonction pour ouvrir l'ajout d'une nouvelle capsule.
 * 
 * @returns {JSX.Element} Un composant affichant un message et une option pour ajouter une capsule.
 */
export const CapsuleEmptyComponent : React.FC<CapsulesComponentProps> = ({ dressing, openAddEditCapsule }: CapsulesComponentProps) => {

  return (
    <View style={stylesEmptyList.container}>
      <Image source={getTabOutfitIcon(false, dressing.categorie)} style={[stylesEmptyList.icon ]}  />

      <ThemedText type="subtitle" style={{marginTop: 20}}>Vous n'avez pas encore ajouté de capsules</ThemedText>

      <Pressable onPress={() => openAddEditCapsule(null)} style={stylesEmptyList.menuItem}>
          <ThemedText type="title" style={{marginTop: 10}}>Ajouter une capsule</ThemedText>
      </Pressable>
    </View>
  );
}