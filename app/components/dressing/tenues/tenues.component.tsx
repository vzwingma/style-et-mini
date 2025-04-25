import { ActivityIndicator, StyleSheet, View } from 'react-native'

import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../../constants/Colors';

import { TenuesListComponent } from './tenuesList.component';
import TenueModel from '@/app/models/tenues/tenue.model';
import { loadTenuesAndVetementsDressing } from '@/app/controllers/tenues/tenues.controller';
import { TenueFormComponent } from './tenueForm.component';
import APIResultFormTenueModel from '@/app/models/tenues/form.result.tenue.model';
import VetementModel from '@/app/models/vetements/vetements.model';
import { DressingComponentProps } from '../dressings.component';


/**
 * Composant React représentant la gestion des tenues d'un dressing.
 *
 * @component
 * @param {DressingComponentProps} props - Les propriétés du composant, incluant le dressing à afficher.
 *
 * @description
 * Ce composant permet d'afficher et de gérer les tenues associées à un dressing. Il inclut les fonctionnalités suivantes :
 * - Chargement des tenues et des vêtements associés au dressing.
 * - Ajout, modification et suppression de tenues via un formulaire modal.
 * - Gestion de l'état de chargement et des interactions utilisateur.
 *
 * @returns {JSX.Element} - Le contenu du panneau des tenues, incluant la liste des tenues et le formulaire modal.
 */
export const TenuesComponent: React.FC<DressingComponentProps> = ({ dressing }: DressingComponentProps) => {

  const [openTenueForm, setOpenTenueForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tenues, setTenues] = useState<TenueModel[]>([]);
  const [vetements, setVetements] = useState<VetementModel[]>([]);

  const [tenueInEdit, setTenueInEdit] = useState<TenueModel | null>(null);

  // Rechargement des vêtements si le dressing change
  useEffect(() => {
    setOpenTenueForm(false);
    loadTenuesAndVetementsDressing({ idDressing: dressing.id, setIsLoading, setTenues, setVetements });
  }, [dressing]);


  /**
   * Callback pour valider le formulaire de tenue.
   *
   * @param resultat - Le résultat de l'opération sur le formulaire de tenue, contenant les informations
   *                   sur la tenue créée, mise à jour ou archivée.
   *
   * - Si une tenue a été créée (`resultat.created` est vrai), elle est ajoutée à la liste des tenues.
   * - Si une tenue a été mise à jour ou archivée (`resultat.updated` ou `resultat.archived` est vrai),
   *   la liste des tenues est mise à jour en remplaçant l'élément correspondant.
   *
   * @remarks
   * Cette fonction ferme également le formulaire de tenue après traitement.
   */
  function validateFormCallBack(resultat: APIResultFormTenueModel ): void {
    setOpenTenueForm(false);
    if(resultat.created && resultat.tenue !== undefined && resultat.tenue !== null) {
      // On ajoute le vetement à la liste
      setTenues(prevTenue => [...(prevTenue), resultat.tenue!]);
    }
    else if(resultat.updated || resultat.archived) {
      setTenues(prevVetements => prevVetements.map(v => v.id === resultat.id ? resultat.tenue! : v));
    }
  }

  /**
   * Callback pour gérer la suppression d'une tenue.
   *
   * @param resultDelete - Le résultat de la suppression contenant les informations
   *                       sur la tenue supprimée.
   *                       - `id`: Identifiant de la tenue.
   *                       - `deleted`: Indique si la suppression a été effectuée avec succès.
   *
   * Cette fonction ferme le formulaire de tenue et met à jour la liste des tenues
   * en supprimant celle correspondant à l'identifiant fourni si elle a été supprimée.
   */
  function deleteFormCallBack(resultDelete: APIResultFormTenueModel ): void {
    setOpenTenueForm(false);
    setTenues(prevVetements => prevVetements.filter(v => v.id !== resultDelete.id && resultDelete.deleted));
  }


  /**
   * Ouvre le formulaire pour ajouter ou modifier une tenue.
   *
   * @param tenue - (Optionnel) La tenue à éditer. Si aucune tenue n'est fournie, 
   *                le formulaire sera ouvert pour ajouter une nouvelle tenue.
   *                Peut être de type `TenueModel` ou `null`.
   * 
   * Cette fonction met à jour l'état local pour définir la tenue en cours d'édition
   * et ouvre le formulaire correspondant.
   */
  function openAddEditTenue(tenue?: TenueModel | null): void {
    setTenueInEdit(tenue || null);
    setOpenTenueForm(true);
  };


  /**
   * Génère le contenu du panneau en fonction de l'état actuel des données et du chargement.
   *
   * @returns {JSX.Element} Le contenu du panneau :
   * - Un indicateur d'activité si les données du dressing ne sont pas disponibles ou si elles sont en cours de chargement.
   * - Une liste des tenues et un formulaire modal pour ajouter/éditer une tenue si les données sont disponibles.
   *
   * @remarks
   * - Si `dressing` est `undefined` ou `null`, ou si `isLoading` est vrai, un `ActivityIndicator` est affiché.
   * - Sinon, un composant `TenuesListComponent` est affiché avec les tenues disponibles, ainsi qu'un modal contenant le formulaire d'édition ou d'ajout de tenue.
    */
  const getPanelContent = () => {
    if (dressing === undefined || dressing === null || isLoading) {
      return <ActivityIndicator color={Colors.app.color} size="large" />;
    }
    else {
      return (
        <>
          <View style={styles.container}>
            <TenuesListComponent dressing={dressing} tenues={tenues} openAddEditTenue={openAddEditTenue} />
          </View>

          <Modal presentationStyle='overFullScreen' isVisible={openTenueForm}
            animationIn='slideInRight' animationOut='slideOutRight'
            propagateSwipe={true}
            onBackButtonPress={() => setOpenTenueForm(false)}
            onBackdropPress={() => setOpenTenueForm(false)}
            style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>

            <TenueFormComponent dressing={dressing} tenue={tenueInEdit} vetementsAffiches={vetements}
                                closeFormCallBack={() => setOpenTenueForm(false)}
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
