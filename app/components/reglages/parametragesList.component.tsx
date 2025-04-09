import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { AppContext } from '../../services/AppContextProvider';

import { getParamsEtatsVetements, getParamsMarquesVetements, getParamsTaillesVetements, getParamsTypeVetements, getParamsUsagesVetements } from '@/app/controllers/parametrages.controller';
import { ThemedText } from '../commons/views/ThemedText';
import { ParametragesVetementEnum } from '@/app/constants/AppEnum';
import ParamGenericVetementsModel from '@/app/models/params/paramGenericVetements.model';
import { ParametragesItemComponent } from './parametragesItem.component';
import { Ionicons } from '@expo/vector-icons';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';
import { alphanumSort } from '../commons/CommonsUtils';



export type ParametragesVetements = {
  readonly typeParametrage: MenuParametragesModel;
  closeDrawer: () => void;
};

export const ParametragesListComponent: React.FC<ParametragesVetements> = ({ typeParametrage, closeDrawer }: ParametragesVetements) => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { etats, setEtats,
    typeVetements, setTypeVetements,
    taillesMesures, setTaillesMesures,
    marques, setMarques,
    usages, setUsages } = useContext(AppContext)!;

  const [parametreInEdition, setParametreInEdition] = useState<string | null>(null);

  useEffect(() => {
    setParametreInEdition(null);
  }, [typeParametrage]);


  useEffect(() => {
    console.log("Paramètre en édition : " + parametreInEdition);
  }, [parametreInEdition]);


  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement des paramètres " + typeParametrage.titre + "...");
    switch (typeParametrage.class) {
      case ParametragesVetementEnum.TYPE:
        getParamsTypeVetements({ setTypeVetements, setError, setIsLoading });
        break;
      case ParametragesVetementEnum.TAILLES:
        getParamsTaillesVetements({ setTaillesMesures, setError, setIsLoading });
        break;
      case ParametragesVetementEnum.MARQUES:
        getParamsMarquesVetements({ setMarques, setError, setIsLoading });
        break;
      case ParametragesVetementEnum.USAGES:
        getParamsUsagesVetements({ setUsages, setError, setIsLoading });
        break;
      case ParametragesVetementEnum.ETATS:
        getParamsEtatsVetements({ setEtats, setError, setIsLoading });
        break;
      default:
        break;
    }

  }, [])


  /**
   * Retourne le contenu du panneau en fonction de l'état de chargement, d'erreur ou des usages.
   *
   * @returns {React.JSX.Element} Un élément JSX représentant le contenu du panneau.
   * - Si les données sont en cours de chargement, retourne un indicateur d'activité.
   * - Si une erreur est survenue, retourne un texte thématisé affichant le message d'erreur.
   * - Sinon, retourne le panneau des usages.
   */
  function getPanelContent(): React.JSX.Element | null {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
    } else {
      switch (typeParametrage.class) {
        case ParametragesVetementEnum.TYPE:
          return showPanelParametres(typeVetements)
        case ParametragesVetementEnum.TAILLES:
          return showPanelParametres(taillesMesures)
        case ParametragesVetementEnum.MARQUES:
          return showPanelParametres(marques)
        case ParametragesVetementEnum.USAGES:
          return showPanelParametres(usages)
        case ParametragesVetementEnum.ETATS:
          return showPanelParametres(etats)
        default:
          return null;
      }
    }
  }


  /**
   * Affiche un panneau contenant une liste d'éléments d'usage de vêtements.
   *
   * @param {ParamUsageVetementsModel[] | undefined} parametresVetements - La liste des usages de vêtements à afficher. Peut être indéfinie.
   * @returns {React.JSX.Element} Un élément JSX représentant le panneau avec la liste des usages de vêtements.
   */
  function showPanelParametres(parametresVetements: ParamGenericVetementsModel[] | undefined): React.JSX.Element {
    let parametresListe: JSX.Element[] = [];
    if (parametresVetements !== undefined) {

      parametresVetements.sort((a, b) => alphanumSort(a.libelle, b.libelle));

      parametresVetements.forEach((item: ParamGenericVetementsModel) => {

        parametresListe.push(
          <ParametragesItemComponent key={item.id} parametreVetements={item} setParametreInEdition={setParametreInEdition} parametreInEdition={parametreInEdition}/>
        );
      });
    }
    return <>{parametresListe}</>;
  }


  return (
    <View style={style2s.body}>
      <View style={style2s.title}>

        <Pressable onPress={() => closeDrawer()}>
          <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
        </Pressable>

        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <Image source={typeParametrage.icone} style={style2s.icon} />
          <ThemedText type="subtitle">{typeParametrage.titre}</ThemedText>
        </View>

        <Pressable >
          <Ionicons size={20} name="add-outline" style={style2s.titleIcon} />
        </Pressable>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {getPanelContent()}
      </ScrollView>
    </View>
  );
}


const style2s = StyleSheet.create({
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.app.color,
    borderColor: Colors.app.color,
    color: "white",
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