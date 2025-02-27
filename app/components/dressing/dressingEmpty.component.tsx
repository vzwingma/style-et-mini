import { StyleSheet, Pressable } from 'react-native'

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
      <Ionicons size={280} name="shirt-outline" color={Colors.dark.text} />

      <ThemedText type="subtitle" style={{marginTop: 20}}>Vous n'avez pas encore ajouté de vêtements</ThemedText>

      <Pressable onPress={openAddVetement} style={styles.menuItem}>
          <ThemedText type="title" style={{marginTop: 10}}>Ajoutez un vêtement maintenant</ThemedText>
      </Pressable>
    </ThemedView>
  );
}




const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    height: 550,
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: 'red',
    borderWidth: 1
  },
  menuItem: {
    padding: 10,
    height: 44,
    cursor: 'pointer',
  },
});
