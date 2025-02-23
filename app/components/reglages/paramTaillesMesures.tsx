import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { AppContext } from '@/app/services/AppContextProvider';
import { TailleVetementListItem, TypeVetementListItem } from '../dressing/typeVetementListItem.component';
import { callApiParamsTaillesVetements } from '@/app/controllers/parametrages.controller';
import TailleVetementsModel from '@/app/models/paramTailleVetements.model';


export default function ParamTaillesMesures() {


  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const {taillesMesures, setTaillesMesures} = useContext(AppContext)!;
    /**
   *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
   * et à changement d'onglet
   * */
    useEffect(() => {
      console.log("(Re)Chargement des paramètres de Tailles et Mesures...");
      callApiParamsTaillesVetements({setIsLoading, setTaillesMesures, setError});
    }, [refreshing])
  

    function getPanelContent() : React.JSX.Element{
      if (isLoading) {
        return <ActivityIndicator size={'large'} color={Colors.app.color} />
      } else if (error !== null) {
        return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
      } else {
        return showPanelTaillesMesures(taillesMesures)
      }
    }


    function showPanelTaillesMesures(tailleVetements: TailleVetementsModel[] | undefined) : React.JSX.Element{
      let panel: JSX.Element;
      let items: JSX.Element[] = [];
      if(tailleVetements !== undefined){
        tailleVetements.forEach((item, idx) => {
        items.push(<TailleVetementListItem key={item._id} tailleVetements={item} />);
      });
      }
      panel = <>{items}</>;
      return panel;
    }


  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tailles et mesures!</ThemedText>
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
