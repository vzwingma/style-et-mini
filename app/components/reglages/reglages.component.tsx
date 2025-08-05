import { StyleSheet, View, Image, ActivityIndicator, Pressable } from 'react-native'
import Modal from 'react-native-modal';
import React, { JSX, useContext, useEffect, useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '../../constants/Colors';
import { menusParametrages } from '../../constants/AppEnum';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';
import { ParametragesListComponent } from './parametragesList.component';
import { AppContext } from '@/app/services/AppContextProvider';
import { getAllParamsVetements } from '@/app/controllers/reglages/parametrages.controller';
import { ModalDialogComponent } from '../commons/views/ModalDialog';
import { getKeyModal } from '../commons/CommonsUtils';

/**
 * Composant principal pour l'écran de réglages.
 *
 * @returns {JSX.Element} Le composant de l'écran de réglages.
 *
 * @component
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export const ReglagesComponent: React.FC = () => {

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuParametragesModel | null>(null);


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { setEtats, setTypeVetements, setTaillesMesures, setMarques, setUsages } = useContext(AppContext)!;

  const [parametreIsModified, setParametreIsModified] = useState<boolean>(true);
  const [modalDialog, setModalDialog] = useState<JSX.Element | null>(null);

  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement des paramètres...");
    getAllParamsVetements({ setTypeVetements, setTaillesMesures, setUsages, setEtats, setMarques, setError, setIsLoading });
  }, [])

  /** Ouverture/Fermeture du menu */
  function toggleOpen(menu: MenuParametragesModel): void {
    setMenu(menu);
    setOpen(!open);
  };


/**
* Gère la fermeture du formulaire avec confirmation si des modifications non sauvegardées existent
* @param form Le formulaire à fermer
* @param closeFormCallBack Fonction de rappel pour fermer le formulaire
* @param setModalDialog Fonction pour définir le dialogue modal à afficher
*/
function closeFormModalConfirmation(closeFormCallBack: Function, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {

    if(parametreIsModified){
    const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous quitter le formulaire ?\n Attention, vous allez perdre votre saisie'}
        ackModalCallback={() => closeFormCallBack()} 
        keyModal={getKeyModal()} />;
        setModalDialog(dialog);
    }
    else {
        closeFormCallBack();
    }
}


  /**
   * Génère le contenu du panneau en fonction de l'état actuel de l'application.
   *
   * @returns {React.JSX.Element | null} 
   * - Un indicateur d'activité si le chargement est en cours.
   * - Un message d'erreur si une erreur est survenue.
   * - Une liste de menus paramétrables avec leurs éléments associés, ainsi qu'un modal pour les détails.
   *
   * @description
   * - Si `isLoading` est vrai, affiche un indicateur de chargement.
   * - Si `error` n'est pas nul, affiche un message d'erreur.
   * - Sinon, affiche une liste de groupes de menus avec leurs éléments, et un modal pour afficher les détails d'un menu sélectionné.
   *
   */
  function getPanelContent(): React.JSX.Element | null {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
    } else {
      return <>
        {modalDialog}
        <View style={styles.container}>
          <View key="param" >
            <View style={styles.title}>
              <ThemedText type="subtitle" style={{ color: Colors.app.color }}>Paramétrages</ThemedText>
            </View>
            {menusParametrages.map((itemParam) => (
              <Pressable key={itemParam.titre} onPress={() => toggleOpen(itemParam)}>
                <View key={itemParam.titre} style={styles.menuItem} >
                  <Image source={itemParam.icone} style={styles.icon} />
                  <ThemedText type='default'>{itemParam.titre}</ThemedText>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <Modal presentationStyle='overFullScreen' isVisible={open}
          animationIn='slideInRight' animationOut='slideOutRight'
          propagateSwipe={true}
          onBackButtonPress={() => closeFormModalConfirmation(() =>setOpen(false), setModalDialog)}
          onBackdropPress={() => closeFormModalConfirmation(() =>setOpen(false), setModalDialog)}
          style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>
          {
            (menu !== null && menu !== undefined)
            && <ParametragesListComponent typeParametrage={menu}
              closeDrawer={() => closeFormModalConfirmation(() =>setOpen(false), setModalDialog)}
              setParametreIsModified={setParametreIsModified} />
          }

        </Modal>

      </>
    }

  }

  return getPanelContent();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
    width: '100%'
  },
  title: {
    padding: 10,
    borderColor: Colors.app.color,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
  },
  body: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.app.background,
    padding: 5,
  },
  icon: {
    marginRight: 5,
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.app.backgroundLight,
  },
});
