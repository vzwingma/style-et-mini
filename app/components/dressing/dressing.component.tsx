import { ActivityIndicator, StyleSheet, View } from 'react-native'

import React, { useEffect, useState } from 'react';
import MenuDrawer from 'react-native-side-drawer';
import { Colors } from '@/constants/Colors';
import DressingModel from '@/app/models/dressing.model';
import { DressingEmptyComponent } from './dressingEmpty.component';
import { VetementFormComponent } from './vetementForm.component';
import { loadVetementsDressing } from '@/app/controllers/dressing.controller';
import { DressingListComponent } from './dressingList.component';
import VetementModel from '@/app/models/vetements.model';


export type DressingComponentProps = {
  readonly dressing: DressingModel;
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

  const [openVetementForm, setOpenVetementForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vetements, setVetements] = useState([]);
  const [vetementInEdit, setVetementInEdit] = useState<VetementModel | null>(null);

  useEffect(() => {
    // Récupération des vêtements du dressing si le formulaire n'est pas ouvert
    if (openVetementForm) return;
    const idDressing = dressing.id;
    loadVetementsDressing({ idDressing, setIsLoading, setVetements });
  }, [dressing, openVetementForm]);


  /** Ouverture/Fermeture du menu */
  function toggleOpenVetementForm(vetement?: VetementModel | null): void {
    setVetementInEdit(vetement || null);
    setOpenVetementForm(!openVetementForm);
  };


  /**
   * 
   * @returns composant principal du dressing
   */
  const getPanelContent = () => {
    if (dressing === undefined || dressing === null || isLoading) {
      return <ActivityIndicator color={Colors.app.color} size="large" />;
    }
    else if (vetements?.length !== 0 ) {
      return (openVetementForm === false && <DressingListComponent vetementsInDressing={vetements} openAddEditVetement={toggleOpenVetementForm} />);
    }
    else {
      return <DressingEmptyComponent openAddVetement={() => toggleOpenVetementForm(null)} />
    }
  }


  return (
    <View style={styles.container}>

      {getPanelContent()}

      <MenuDrawer
        open={openVetementForm}
        position={'right'}
        drawerContent={
          <VetementFormComponent dressing={dressing} vetement={vetementInEdit} onCloseForm={toggleOpenVetementForm}></VetementFormComponent>
        }
        drawerPercentage={98}
        animationTime={250}
        overlay={true}
        opacity={0.3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    minHeight: 750
  },
});
