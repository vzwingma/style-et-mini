import { ActivityIndicator, StyleSheet, View } from 'react-native'

import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../constants/Colors';
import DressingModel from '../../models/dressing.model';
import { VetementFormComponent } from '../vetements/vetementForm.component';
import { loadVetementsDressing } from '../../controllers/dressing/dressing.controller';
import { DressingListComponent } from './dressingList.component';
import VetementModel from '../../models/vetements/vetements.model';
import APIResultFormVetementModel from '@/app/models/vetements/form.result.vetements.model';


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
  const [vetements, setVetements] = useState<VetementModel[]>([]);
  const [vetementInEdit, setVetementInEdit] = useState<VetementModel | null>(null);

  // Rechargement des vêtements si le dressing change
  useEffect(() => {
    setOpenVetementForm(false);
    loadVetementsDressing({ idDressing: dressing.id, setIsLoading, setVetements });
  }, [dressing]);


  /**
   * 
   * @param vetement Vêtement validé . on mets à jour la liste des vetements sans recharger
   */
  function validateFormCallBack(resultat: APIResultFormVetementModel ): void {
    setOpenVetementForm(false);
    if(resultat.created && resultat.vetement !== undefined && resultat.vetement !== null) {
      // On ajoute le vetement à la liste
      setVetements(prevVetements => [...prevVetements, resultat.vetement!]);
    }
    else if(resultat.updated || resultat.archived) {
      setVetements(prevVetements => prevVetements.map(v => v.id === resultat.id ? resultat.vetement! : v));
    }
  }

  /**
   * 
   * @param resultDelete Vêtement validé . on mets à jour la liste des vetements sans recharger
   */
  function deleteFormCallBack(resultDelete: APIResultFormVetementModel ): void {
    setOpenVetementForm(false);
    setVetements(prevVetements => prevVetements.filter(v => v.id !== resultDelete.id && resultDelete.deleted));
  }


  /**
   * Ouvre ou ferme le formulaire d'ajout/édition de vêtement.
   *
   * @param vetement - (Optionnel) Le modèle de vêtement à éditer. Si non fourni, le formulaire sera ouvert pour ajouter un nouveau vêtement.
   */
  function openAddEditVetement(vetement?: VetementModel | null): void {
    setVetementInEdit(vetement || null);
    setOpenVetementForm(true);
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
    else {
      return (
        <>
          <View style={styles.container}>
            <DressingListComponent vetements={vetements} openAddEditVetement={openAddEditVetement} />
          </View>

          <Modal presentationStyle='overFullScreen' isVisible={openVetementForm}
            animationIn='slideInRight' animationOut='slideOutRight'
            propagateSwipe={true}
            onBackButtonPress={() => setOpenVetementForm(false)}
            onBackdropPress={() => setOpenVetementForm(false)}
            style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>
            <VetementFormComponent dressing={dressing} vetement={vetementInEdit} closeFormCallBack={() => setOpenVetementForm(false)} 
                                                                                 validateFormCallBack={validateFormCallBack}
                                                                                 deleteFormCallBack={deleteFormCallBack}></VetementFormComponent>

          </Modal>
        </>);
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
