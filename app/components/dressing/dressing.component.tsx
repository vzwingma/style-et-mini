import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'

import React, { useEffect, useState } from 'react';
import MenuDrawer from 'react-native-side-drawer';
import { ThemedText } from '../commons/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors } from '@/constants/Colors';
import DressingModel from '@/app/models/dressing.model';
import DressingEmptyComponent from './dressingEmpty.component';
import VetementFormComponent from './vetementForm.component';
import { loadVetementsDressing } from '@/app/controllers/dressing.controller';


export type DressingComponentProps = {
  dressing: DressingModel;
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
export default function DressingComponent({ dressing }: DressingComponentProps) {

  const [openVetementForm, setOpenVetementForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [vetements, setVetements] = useState([]);

  useEffect(() => {
    // Récupération des vêtements du dressing
    const idDressing = dressing.id;
    loadVetementsDressing({idDressing, setIsLoading, setVetements} );
  }, [dressing]);


  /** Ouverture/Fermeture du menu */
  function toggleOpenVetementForm(): void {
    setOpenVetementForm(!openVetementForm);
  };


  /**
   * 
   * @returns composant principal du dressing
   */
  const getPanelContent = () => {
    if (dressing === undefined) {
          return <ActivityIndicator color={Colors.app.color} size="large" />;
        }
    else if(vetements === undefined || vetements?.length === 0){
      return <DressingEmptyComponent openAddVetement={toggleOpenVetementForm}/>
    }
    else{
      return (
        <ThemedView style={styles.body}>
          <ThemedText type="subtitle">Nombre de vêtements : {vetements?.length}</ThemedText>
          <TouchableOpacity onPress={toggleOpenVetementForm}>
            <ThemedText type="subtitle">Ajouter un vêtement</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      );
    }
  }


  return (
    <ThemedView style={styles.container}>

      {getPanelContent()}

      <MenuDrawer
        open={!openVetementForm}
        position={'right'}
        drawerContent={<VetementFormComponent dressing={dressing} vetement={null} onCloseForm={toggleOpenVetementForm}></VetementFormComponent>}
        drawerPercentage={98}
        animationTime={250}
        overlay={true}
        opacity={0.3}
      />
    </ThemedView>
  );
}









/**
 * Affiche un panneau de vêtements.
 *
 * @param {DressingVetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
 * @returns {React.JSX.Element} Un élément JSX contenant la liste des éléments de type vêtement.
 
function showPanelVetements(vetements: DressingVetementModel[] | undefined): React.JSX.Element {
  let panel: JSX.Element;
  let items: JSX.Element[] = [];
  if (vetements !== undefined) {
    vetements.forEach((item) => {
      items.push(<TypeVetementListItem key={item._id} typeVetements={item} />);
    });
  }
  panel = <>{items}</>;
  return panel;
}
*/

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
  },
  animatedBox: {
    flex: 1,
    zIndex: 1,
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
});
