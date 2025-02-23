import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { AppContext } from '@/app/services/AppContextProvider';
import TypeVetementsModel from '@/app/models/typeVetements.model';
import { TypeVetementListItem } from '../dressing/typeVetementListItem.component';
import { callApiParamsTypeVetements } from '@/app/controllers/parametrages.controller';
export default function ParamTypesVetements() {


  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const {typeVetements, setTypeVetements} = useContext(AppContext)!;
    /**
   *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
   * et à changement d'onglet
   * */
    useEffect(() => {
      console.log("(Re)Chargement des paramètres de type de vêtements..");
      callApiParamsTypeVetements({setIsLoading, setTypeVetements, setError});
    }, [refreshing])
  

    function getPanelContent() : React.JSX.Element{
      if (isLoading) {
        return <ActivityIndicator size={'large'} color={Colors.app.color} />
      } else if (error !== null) {
        return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
      } else {
        return showPanel(typeVetements)
      }
    }


    function showPanel(typeVetements: TypeVetementsModel[] | undefined) : React.JSX.Element{
      let panel: JSX.Element;
      let items: JSX.Element[] = [];
      if(typeVetements !== undefined){
        typeVetements.forEach((item, idx) => {
        items.push(<TypeVetementListItem key={item._id} typeVetements={item} />);
      });
      }
      panel = <>{items}</>;
      return panel;
    }


  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Types de vêtements!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        {getPanelContent()}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
});
