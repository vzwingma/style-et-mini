import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { JSX, useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { ThemedText } from '../commons/views/ThemedText';
import ParamGenericVetementsModel from '@/app/models/params/paramGenericVetements.model';
import { ParametragesItemComponent } from './parametrageItem.component';
import { Ionicons } from '@expo/vector-icons';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';
import { alphanumSort, numSort } from '../commons/CommonsUtils';
import { getParamsVetements } from '@/app/controllers/reglages/parametrages.controller';
import { AppContext } from '@/app/services/AppContextProvider';
import { ID_NEW_ELEMENT, ParametragesVetementEnum } from '@/app/constants/AppEnum';
import { SERVICES_URL } from '@/app/constants/APIconstants';
import { initNewForm } from '@/app/models/params/paramVetementsForm.model';



export type ParametragesVetements = {
  readonly typeParametrage: MenuParametragesModel;
  closeDrawer: () => void;
};

/**
 * Composant React représentant une liste de paramètres pour les vêtements.
 * 
 * Ce composant affiche une liste de paramètres en fonction du type de paramétrage sélectionné.
 * Il permet également d'ajouter, de modifier ou de rafraîchir les paramètres via des interactions utilisateur.
 * 
 * @param {ParametragesVetements} props - Les propriétés du composant.
 * @param {MenuParametragesModel} props.typeParametrage - Le type de paramétrage à afficher (types, tailles, marques, usages, états).
 * @param {() => void} props.closeDrawer - Fonction de rappel pour fermer le panneau latéral.
 * 
 * @returns {React.FC<ParametragesVetements>} Un composant React fonctionnel affichant la liste des paramètres.
 * 
 */
export const ParametragesListComponent: React.FC<ParametragesVetements> = ({ typeParametrage, closeDrawer }: ParametragesVetements) => {

  const [parametreInEdition, setParametreInEdition] = useState<string | null>(null);
  const { etats, setEtats, typeVetements, setTypeVetements, taillesMesures, setTaillesMesures, marques, setMarques, usages, setUsages } = useContext(AppContext)!;


  /** Reinit au moment des types de paramétrages */
  useEffect(() => {
    setParametreInEdition(null);
  }, [typeParametrage]);


/**
 * Récupère les paramètres génériques des vêtements en fonction du type de paramétrage fourni.
 *
 * @param {MenuParametragesModel} typeParametrage - Le type de paramétrage à utiliser pour récupérer les données.
 * @returns {ParamGenericVetementsModel[] | null} - Une liste des paramètres génériques correspondants ou `null` si le type de paramétrage n'est pas reconnu.
 */
function getParametrages(typeParametrage: MenuParametragesModel): ParamGenericVetementsModel[] {

  switch (typeParametrage.class) {
    case ParametragesVetementEnum.TYPES:
      return typeVetements
    case ParametragesVetementEnum.TAILLES:
      return taillesMesures
    case ParametragesVetementEnum.MARQUES:
      return marques
    case ParametragesVetementEnum.USAGES:
      return usages
    case ParametragesVetementEnum.ETATS:
      return etats
    default:
      return [];
  }
}

  /**
   * Rafraîchit la liste des paramètres en fonction du type de paramètre spécifié.
   *
   * @param typeParam - Le type de paramètre à utiliser pour le rafraîchissement. 
   *                    Il doit être une valeur de l'énumération `ParametragesVetementEnum`.
   *
   * Cette fonction effectue un appel à l'API pour récupérer les paramètres des vêtements
   * en utilisant l'URL définie dans `SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS`.
   * Les paramètres récupérés sont ensuite mis à jour via la fonction `setTypeVetements`.
   * En cas d'erreur, celle-ci est capturée et affichée dans la console.
   */
  function refreshListeParametres(typeParam: ParametragesVetementEnum) {
    const params = getParametresForRefresh(typeParam);
    if(params === null) {
      console.error("Erreur lors de la récupération des paramètres", typeParam);
      return;
    }
    setParametreInEdition(null);
    getParamsVetements({
      urlAPIParams: params?.urlAPIParams,
      setParams: params?.setParams,
      setError: (e => console.error(e))
    });
  } 

/**
 * Récupère les paramètres nécessaires pour rafraîchir les données en fonction du type de paramétrage.
 *
 * @param typeParametrage - Le type de paramétrage à traiter, basé sur l'énumération `ParametragesVetementEnum`.
 * @returns Un objet contenant :
 * - `urlAPIParams` : L'URL du service API correspondant au type de paramétrage.
 * - `setParams` : La fonction à appeler pour définir les paramètres.
 * 
 * Retourne `null` si le type de paramétrage n'est pas pris en charge.
 */
function getParametresForRefresh(typeParametrage: ParametragesVetementEnum): { urlAPIParams: SERVICES_URL; setParams: React.Dispatch<React.SetStateAction<ParamGenericVetementsModel[] | []>> } | null {
  switch (typeParametrage) {
    case ParametragesVetementEnum.TYPES:
      return {
        urlAPIParams: SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS,
        setParams: setTypeVetements,
      }
    case ParametragesVetementEnum.TAILLES:
      return {
        urlAPIParams: SERVICES_URL.SERVICE_PARAMS_TAILLES_MESURES,
        setParams: setTaillesMesures,
      }
    case ParametragesVetementEnum.MARQUES:
      return {
        urlAPIParams: SERVICES_URL.SERVICE_PARAMS_MARQUES,
        setParams: setMarques,
      }
    case ParametragesVetementEnum.USAGES:
      return {
        urlAPIParams: SERVICES_URL.SERVICE_PARAMS_USAGES,
        setParams: setUsages,
      }
    case ParametragesVetementEnum.ETATS:
      return {
        urlAPIParams: SERVICES_URL.SERVICE_PARAMS_ETATS,
        setParams: setEtats,
      }
    default:
      return null
    };
    
  }


  /**
   * Affiche un panneau contenant une liste d'éléments d'usage de vêtements.
   *
   * @param {ParamUsageVetementsModel[] | undefined} parametresVetements - La liste des usages de vêtements à afficher. Peut être indéfinie.
   * @returns {React.JSX.Element} Un élément JSX représentant le panneau avec la liste des usages de vêtements.
   */
  function showPanelParametres(): React.JSX.Element[] {
    let parametresListe: JSX.Element[] = [];
    const parametresVetements: ParamGenericVetementsModel[] | null = getParametrages(typeParametrage)

    if (parametresVetements !== undefined && parametresVetements !== null) {
      parametresVetements.sort((v1, v2) => {
        if (v1.tri !== undefined && v2.tri !== undefined) {
          return numSort(v1.tri, v2.tri);
        }
        else {
          return alphanumSort(v1.libelle, v2.libelle)
        }
      });


      if(parametreInEdition !== null && parametreInEdition === ID_NEW_ELEMENT) {
        parametresListe.push(
          <ParametragesItemComponent key={"item_" + typeParametrage.class + "_" + parametreInEdition}
            typeParametrage={typeParametrage.class}
            parametrageVetements={initNewForm(typeParametrage.class)}
            setParametreInEdition={setParametreInEdition} parametreInEdition={parametreInEdition}
            refreshListeParametresCallback= {refreshListeParametres}/>
        );
      }


      parametresVetements.forEach((parametrage: ParamGenericVetementsModel) => {
        parametresListe.push(
          <ParametragesItemComponent key={"item_" + typeParametrage.class + "_" + parametrage.id}
            typeParametrage={typeParametrage.class}
            parametrageVetements={parametrage}
            setParametreInEdition={setParametreInEdition} parametreInEdition={parametreInEdition}
            refreshListeParametresCallback= {refreshListeParametres}/>
        );
      });
    }
    return parametresListe;
  }


  return (
    <View style={styleParams.body}>
      <View style={styleParams.title}>

        <Pressable onPress={() => closeDrawer()}>
          <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
        </Pressable>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Image source={typeParametrage.icone} style={styleParams.icon} />
          <ThemedText type="subtitle">{typeParametrage.titre}</ThemedText>
        </View>

        <Pressable onPress={() => setParametreInEdition(ID_NEW_ELEMENT)}>
          <Ionicons size={20} name="add-outline" style={styleParams.titleIcon} />
        </Pressable>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {showPanelParametres()}
      </ScrollView>
    </View>
  );
}


const styleParams = StyleSheet.create({
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.app.color,
    borderColor: Colors.app.color,
    color: "white",
    borderRadius: 8,
    padding: 5,
  },
  body: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    padding: 5,
  },
  icon: {
    marginRight: 5,
    width: 20,
    height: 20,
    color: 'white',
    tintColor: 'white',
  },
  titleIcon: {
    color: Colors.dark.text,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    margin: 5,
  },
});