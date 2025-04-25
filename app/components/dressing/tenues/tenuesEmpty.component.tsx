import { Pressable, Image, View } from 'react-native'

import React from 'react';
import { ThemedText } from '../../commons/views/ThemedText';
import { getTabOutfitIcon } from '../../commons/tab/TabBarIcon';
import DressingModel from '@/app/models/dressing.model';
import { stylesEmptyList } from '../dressingEmpty.component';


export type TenuesComponentProps = {
  dressing: DressingModel;
  openAddTenue: Function;
};


/**
 * Composant React fonctionnel représentant un écran vide pour les tenues.
 *
 * @param {TenuesComponentProps} props - Les propriétés du composant.
 * @param {Dressing} props.dressing - Le dressing contenant les informations de catégorie.
 * @param {(tenue: Tenue | null) => void} props.openAddTenue - Fonction pour ouvrir l'écran d'ajout d'une tenue.
 *
 * @returns {JSX.Element} Un composant affichant un message et une option pour ajouter une tenue.
 *
 */
export const TenueEmptyComponent : React.FC<TenuesComponentProps> = ({ dressing, openAddTenue }: TenuesComponentProps) => {

  return (
    <View style={stylesEmptyList.container}>
      <Image source={getTabOutfitIcon(false, dressing.categorie)} style={[stylesEmptyList.icon ]}  />

      <ThemedText type="subtitle" style={{marginTop: 20}}>Vous n'avez pas encore ajouté de tenues</ThemedText>

      <Pressable onPress={() => openAddTenue(null)} style={stylesEmptyList.menuItem}>
          <ThemedText type="title" style={{marginTop: 10}}>Ajouter une tenue</ThemedText>
      </Pressable>
    </View>
  );
}