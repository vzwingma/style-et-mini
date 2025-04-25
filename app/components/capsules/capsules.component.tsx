import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { DressingComponentProps } from '../dressing/dressings.component';
import CapsuleTemporelleModel from '@/app/models/capsule/capsuleTemporelle.model';
import APIResultFormCapsuleModel from '@/app/models/capsule/form.result.capsule.model';
import { CapsulesListComponent } from './capsuleList.component';
import Modal from 'react-native-modal';
import { loadCapsulesDressing } from '@/app/controllers/capsule/capsuleTemporelle.controller';
import { CapsuleFormComponent } from './capsuleForm.component';


/**
 * Composant React représentant une capsule temporelle dans un dressing.
 *
 * @component
 * @param {DressingComponentProps} props - Les propriétés du composant, incluant le dressing.
 *
 * @description
 * Ce composant gère l'affichage et la gestion des capsules temporelles associées à un dressing.
 * Il permet d'ajouter, modifier, supprimer et afficher les capsules temporelles.
 * Le contenu affiché varie en fonction de l'état du dressing (chargement, vide, ou avec des capsules).
 *
 * @returns {JSX.Element} - Le contenu du panneau, incluant la liste des capsules ou un indicateur d'activité.
 *
 * @remarks
 * - Utilise des hooks React (`useState`, `useEffect`) pour gérer l'état local et les effets secondaires.
 * - Inclut un formulaire modal pour l'ajout ou l'édition de capsules temporelles.
 * - Les callbacks `validateFormCallBack` et `deleteFormCallBack` permettent de mettre à jour la liste des capsules sans recharger.
 *
 * @see DressingComponentProps
 * @see CapsuleTemporelleModel
 */
export const CapsuleComponent: React.FC<DressingComponentProps> = ({ dressing }: DressingComponentProps) => {

  const [openCapsuleForm, setOpenCapsuleForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [capsules, setCapsules] = useState<CapsuleTemporelleModel[]>([]);


  const [capsuleInEdit, setCapsuleInEdit] = useState<CapsuleTemporelleModel | null>(null);

  // Rechargement des vêtements si le dressing change
  useEffect(() => {
    setOpenCapsuleForm(false);
    loadCapsulesDressing(dressing.id, setCapsules, setIsLoading);
  }, [dressing]);


  /**
   * 
   * @param vetement Vêtement validé . on mets à jour la liste des vetements sans recharger
   */
  function validateFormCallBack(resultat: APIResultFormCapsuleModel ): void {
    setOpenCapsuleForm(false);
    if(resultat.created && resultat.capsule !== undefined && resultat.capsule !== null) {
      // On ajoute le vetement à la liste
      setCapsules(prevCapsule => [...(prevCapsule), resultat.capsule!]);
    }
    else if(resultat.updated || resultat.archived) {
      setCapsules(prevCapsules => prevCapsules.map(capsule => capsule.id === resultat.id ? resultat.capsule! : capsule));
    }
  }

  /**
   * 
   * @param resultDelete Vêtement validé . on mets à jour la liste des vetements sans recharger
   */
  function deleteFormCallBack(resultDelete: APIResultFormCapsuleModel ): void {
    setOpenCapsuleForm(false);
    setCapsules(prevCapsules => prevCapsules.filter(capsule => capsule.id !== resultDelete.id && resultDelete.deleted));
  }


  /**
   * Ouvre ou ferme le formulaire d'ajout/édition de vêtement.
   *
   * @param capsule - (Optionnel) Le modèle de capsule à éditer. Si non fourni, le formulaire sera ouvert pour ajouter une nouvelle capsule.
   */
  function openAddEditCapsule(capsule?: CapsuleTemporelleModel | null): void {
    setCapsuleInEdit(capsule || null);
    setOpenCapsuleForm(true);
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
            <CapsulesListComponent dressing={dressing} capsules={capsules} openAddEditCapsule={openAddEditCapsule} />
          </View>

          <Modal presentationStyle='overFullScreen' isVisible={openCapsuleForm}
            animationIn='slideInRight' animationOut='slideOutRight'
            propagateSwipe={true}
            onBackButtonPress={() => setOpenCapsuleForm(false)}
            onBackdropPress={() => setOpenCapsuleForm(false)}
            style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>
            <CapsuleFormComponent dressing={dressing} capsule={capsuleInEdit} 
                                closeFormCallBack={() => setOpenCapsuleForm(false)}
                                validateFormCallBack={validateFormCallBack}
                                deleteFormCallBack={deleteFormCallBack} />
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
