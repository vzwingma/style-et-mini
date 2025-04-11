import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { ThemedText } from '../commons/views/ThemedText';
import ParamGenericVetementsModel from '@/app/models/params/paramGenericVetements.model';
import { ParametragesItemComponent } from './parametragesItem.component';
import { Ionicons } from '@expo/vector-icons';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';
import { alphanumSort, numSort } from '../commons/CommonsUtils';



export type ParametragesVetements = {
  parametrages: ParamGenericVetementsModel[];
  readonly typeParametrage: MenuParametragesModel;
  closeDrawer: () => void;
};

export const ParametragesListComponent: React.FC<ParametragesVetements> = ({ parametrages, typeParametrage, closeDrawer }: ParametragesVetements) => {

  const [parametreInEdition, setParametreInEdition] = useState<string | null>(null);
    
  useEffect(() => {
    setParametreInEdition(null);
  }, [typeParametrage]);


  function addParametrage() {
    setParametreInEdition("new");
  }


  /**
   * Affiche un panneau contenant une liste d'éléments d'usage de vêtements.
   *
   * @param {ParamUsageVetementsModel[] | undefined} parametresVetements - La liste des usages de vêtements à afficher. Peut être indéfinie.
   * @returns {React.JSX.Element} Un élément JSX représentant le panneau avec la liste des usages de vêtements.
   */
  function showPanelParametres(parametresVetements: ParamGenericVetementsModel[] | null): React.JSX.Element {
    let parametresListe: JSX.Element[] = [];
    if (parametresVetements !== undefined && parametresVetements !== null) {

      parametresVetements.sort((v1, v2) => {
        if(v1.tri !== undefined && v2.tri !== undefined) {
          return numSort(v1.tri, v2.tri);
        }
        else{
          return alphanumSort(v1.libelle, v2.libelle)
        }
      });

      parametresVetements.forEach((item: ParamGenericVetementsModel) => {
        parametresListe.push(
          <ParametragesItemComponent key={"item_"+typeParametrage.class+"_" + item.id} 
                                    typeParametrage={typeParametrage.class} 
                                    parametrageVetements={item} 
                                    setParametreInEdition={setParametreInEdition} parametreInEdition={parametreInEdition} />
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

        <Pressable onPress={() => addParametrage()}>
          <Ionicons size={20} name="add-outline" style={style2s.titleIcon} />
        </Pressable>
      </View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {showPanelParametres(parametrages)}
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