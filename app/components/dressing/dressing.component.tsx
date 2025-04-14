import { ActivityIndicator, StyleSheet, View } from 'react-native'

import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Colors } from './../../constants/Colors';
import DressingModel from './../../models/dressing.model';
import { DressingEmptyComponent } from './dressingEmpty.component';
import { VetementFormComponent } from './vetementForm.component';
import { loadVetementsDressing } from './../../controllers/dressing.controller';
import { DressingListComponent } from './dressingList.component';
import VetementModel from '../../models/vetements/vetements.model';


/**
 * Propriétés pour le composant DressingComponent.
 *
 * @typedef {Object} DressingComponentProps
 * @property {DressingModel} dressing - Le modèle de dressing à afficher.
 */
export type DressingComponentProps = {
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
export const DressingComponent: React.FC<DressingComponentProps> = ({ dressing }: DressingComponentProps) => {

  const [openVetementForm, setOpenVetementForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vetements, setVetements] = useState([]);
  const [vetementInEdit, setVetementInEdit] = useState<VetementModel | null>(null);

  useEffect(() => {
    // Récupération des vêtements du dressing si le formulaire n'est pas ouvert
    if (openVetementForm) return;
    loadVetementsDressing({ idDressing: dressing.id, setIsLoading, setVetements });
  }, [openVetementForm]);

  // Changement de l'état du formulaire de vêtement si le dressing change
  useEffect(() => {
    setOpenVetementForm(false);
    loadVetementsDressing({ idDressing: dressing.id, setIsLoading, setVetements });
  }, [dressing]);


  /** Ouverture/Fermeture du menu */
  function toggleOpenVetementForm(vetement?: VetementModel | null): void {
    setVetementInEdit(vetement || null);
    setOpenVetementForm(!openVetementForm);
  };


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
    else if (vetements?.length !== 0) {
      return (
        <>
          <View style={styles.container}>
            <DressingListComponent vetementsInDressing={vetements} openAddEditVetement={toggleOpenVetementForm} />
          </View>

          <Modal presentationStyle='overFullScreen' isVisible={openVetementForm}
            animationIn='slideInRight' animationOut='slideOutRight'
            propagateSwipe={true}
            onBackButtonPress={() => setOpenVetementForm(false)}
            onBackdropPress={() => setOpenVetementForm(false)}
            style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>
            <VetementFormComponent dressing={dressing} vetement={vetementInEdit} closeFormCallBack={toggleOpenVetementForm}></VetementFormComponent>

          </Modal>
        </>);
    }
    else {
      return <DressingEmptyComponent openAddVetement={() => toggleOpenVetementForm(null)} />
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
