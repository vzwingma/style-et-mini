import { StyleSheet, View, Image, ActivityIndicator, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '../../constants/Colors';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';
import { AppContext } from '@/app/services/AppContextProvider';
import DressingModel from '@/app/models/dressing.model';
import { InventaireListComponent } from './capsuleParamList.component';
import { getCapsuleByParam } from '@/app/controllers/capsule/capsuleTemporelle.controller';


/**
 * Propriétés pour le composant DressingComponent.
 *
 * @typedef {Object} InventaireComponent
 * @property {DressingModel} dressing - Le modèle de dressing à afficher.
 */
export type InventaireComponentProps = {
  readonly dressing: DressingModel;
};

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
export const InventaireComponent: React.FC<InventaireComponentProps> = ({ dressing }: InventaireComponentProps) => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuParametragesModel | null>(null);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { typeVetements, taillesMesures, usages } = useContext(AppContext)!;



  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement des inventaires...");
    getCapsuleByParam(dressing, [], { typeVetements, taillesMesures, usages });
  }, [])

  /** Ouverture/Fermeture du menu */
  function toggleOpen(menu: MenuParametragesModel): void {
    setMenu(menu);
    setOpen(!open);
  };

  

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
        <View style={styles.container}>

          <InventaireListComponent parametres={typeVetements}/>
        </View>
{ /* 
        <Modal presentationStyle='overFullScreen' isVisible={open}
          animationIn='slideInRight' animationOut='slideOutRight'
          propagateSwipe={true}
          onBackButtonPress={() => setOpen(false)}
          onBackdropPress={() => setOpen(false)}
          style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>
          {
            (menu !== null && menu !== undefined)
            && <ParametragesListComponent typeParametrage={menu}
              closeDrawer={() => setOpen(false)} />
          }

        </Modal>
*/}
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
