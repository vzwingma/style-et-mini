import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import VetementModel from '@/app/models/vetements/vetements.model';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { ThemedText } from '../commons/views/ThemedText';
import { getCollections, getLibelleVetementsSansCollections, getVetementsSansPrix } from '@/app/controllers/synthese/syntheseDressing.controller';



export type SyntheseItemDetailProps = {
  readonly vetements: VetementModel[];
  readonly details: SyntheseDetailEnum;
  closeDrawer: () => void;
};

export enum SyntheseDetailEnum {
  NO_PRIX_ACHAT = "vêtements sans prix d'achat",
  NO_PRIX_NEUF = "vêtements sans prix neuf",
  NO_COLLECTIONS = "vêtements sans collection",
  COLLECTIONS_LISTE = "collections",
}


/**
 * Récupère les détails de synthèse en fonction du type de détail spécifié.
 *
 * @param vetements - Liste des modèles de vêtements à analyser.
 * @param detail - Type de détail de synthèse à récupérer. Peut être l'un des suivants :
 *   - `SyntheseDetailEnum.NO_PRIX_ACHAT` : Retourne les vêtements sans prix d'achat.
 *   - `SyntheseDetailEnum.NO_PRIX_NEUF` : Retourne les vêtements sans prix neuf.
 *   - `SyntheseDetailEnum.NO_COLLECTIONS` : Retourne les libellés des vêtements sans collections.
 *   - `SyntheseDetailEnum.COLLECTIONS_LISTE` : Retourne la liste des collections.
 * @returns Une liste de chaînes de caractères correspondant aux détails demandés, ou une liste vide si aucun détail ne correspond.
 */
function getDetailSynthese(vetements: VetementModel[], detail: SyntheseDetailEnum): string[] {
  switch (detail) {
    case SyntheseDetailEnum.NO_PRIX_ACHAT:
      return getVetementsSansPrix(vetements, 'achat');
    case SyntheseDetailEnum.NO_PRIX_NEUF:
      return getVetementsSansPrix(vetements, 'neuf');
    case SyntheseDetailEnum.NO_COLLECTIONS:
      return getLibelleVetementsSansCollections(vetements) ?? [];
    case SyntheseDetailEnum.COLLECTIONS_LISTE:
      return getCollections(vetements);
    default:
      return [];
  }
}


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
export const SyntheseItemDetailComponent: React.FC<SyntheseItemDetailProps> = ({ vetements, details, closeDrawer }: SyntheseItemDetailProps) => {

  const detailsSynhese = getDetailSynthese(vetements, details);

  return (
    <View style={styleParams.body}>
      <View style={styleParams.title}>

        <Pressable onPress={() => closeDrawer()}>
          <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
        </Pressable>

        <View style={{ flexDirection: "row", gap: 10, paddingRight: 10, alignItems: "center" }}>
          <ThemedText type="subtitle">{detailsSynhese.length} {details}</ThemedText>
        </View>

      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {
          detailsSynhese.map((item: string) => (
            <View  key={item}><ThemedText type="default" style={{ color: Colors.dark.text, marginTop: 10 }}>{item}</ThemedText></View>
          ))
        }
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