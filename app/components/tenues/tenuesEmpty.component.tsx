import { StyleSheet, Pressable, Image, View } from 'react-native'

import React from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '../../constants/Colors';
import { getTabOutfitIcon } from '../commons/tab/TabBarIcon';
import DressingModel from '@/app/models/dressing.model';


export type TenuesComponentProps = {
  dressing: DressingModel;
  openAddTenue: Function;
};


/**
 * Composant React fonctionnel représentant un état vide pour le dressing.
 * 
 * Ce composant affiche un message et une icône lorsque le dressing ne contient
 * pas encore de vêtements. Il propose également une action permettant d'ajouter
 * un nouveau vêtement.
 * 
 * @param {DressingComponentProps} props - Les propriétés du composant.
 * @param {Function} props.openAddVetement - Fonction appelée lors de l'appui sur le bouton
 * pour ajouter un vêtement. Elle reçoit `null` comme paramètre.
 * 
 * @returns {JSX.Element} Le composant visuel pour l'état vide du dressing.
 */
export const TenueEmptyComponent : React.FC<TenuesComponentProps> = ({ dressing, openAddTenue }: TenuesComponentProps) => {

  return (
    <View style={styles.container}>
      <Image source={getTabOutfitIcon(false, dressing.categorie)} style={[styles.icon ]}  />

      <ThemedText type="subtitle" style={{marginTop: 20}}>Vous n'avez pas encore ajouté de tenues</ThemedText>

      <Pressable onPress={() => openAddTenue(null)} style={styles.menuItem}>
          <ThemedText type="title" style={{marginTop: 10}}>Ajouter une tenue</ThemedText>
      </Pressable>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    height: 700,
    alignItems: 'center',
  },
  menuItem: {
    padding: 10,
    cursor: 'pointer',
  },
  icon: {
    tintColor: 'gray',
    margin: 10,
    width: 280,
    height: 280,
    borderColor: Colors.dark.background,
},  
});
