import { Pressable, Image, View } from 'react-native'

import React from 'react';
import { ThemedText } from '../../commons/views/ThemedText';
import { stylesEmptyList } from '../dressingEmpty.component';


export type CapsulesComponentProps = {
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
export const CapsuleEmptyComponent : React.FC<CapsulesComponentProps> = ({ openAddEditCapsule }: CapsulesComponentProps) => {

  return (
    <View style={stylesEmptyList.container}>
      <Image source={require('@/assets/icons/closet.png')} style={[stylesEmptyList.icon ]}  />

      <ThemedText type="subtitle" style={{marginTop: 20}}>Vous n'avez pas encore ajouté de capsules</ThemedText>

      <Pressable onPress={() => openAddEditCapsule(null)} style={stylesEmptyList.menuItem}>
          <ThemedText type="title" style={{marginTop: 10}}>Ajouter une capsule</ThemedText>
      </Pressable>
    </View>
  );
}