import { StyleSheet, Pressable, Image } from 'react-native'

import React from 'react';
import { ThemedText } from '../commons/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export type DressingComponentProps = {
  openAddVetement: () => void;
};
/**
 * Composant principal pour un dressing
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 * @example
 * return (
 *   <ReglagesComponent />
 * )
 *
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export const DressingEmptyComponent : React.FC<DressingComponentProps> = ({ openAddVetement }: DressingComponentProps) => {

  return (
    <ThemedView style={styles.container}>
      <Image source={require('@/assets/icons/clothes-rnd-outline.png')} style={[styles.icon ]}  />

      <ThemedText type="subtitle" style={{marginTop: 20}}>Vous n'avez pas encore ajouté de vêtements</ThemedText>

      <Pressable onPress={openAddVetement} style={styles.menuItem}>
          <ThemedText type="title" style={{marginTop: 10}}>Ajoutez un vêtement</ThemedText>
      </Pressable>
    </ThemedView>
  );
}




const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    height: 700,
    alignItems: 'center',
  },
  animatedBox: {
    flex: 1,
    zIndex: 1,
    width: '100%',
    backgroundColor: Colors.dark.background,
    borderColor: 'red',
    borderWidth: 1

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
