import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../services/AppContextProvider';
import callApiTypeVetements from '../controllers/dressing.controller';
import { Colors } from '@/constants/Colors';
import TypeVetementsModel from '../models/typeVetements.model';
import { TypeVetementListItem } from '../components/dressing/typeVetementListItem.component';

export default function DressingScreen() {


  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const {typeVetements, setTypeVetements} = useContext(AppContext)!;
    /**
   *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
   * et à changement d'onglet
   * */
    useEffect(() => {
      console.log("(Re)Chargement du dressing...");
      callApiTypeVetements({setIsLoading, setTypeVetements, setError});
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
        <ThemedText type="title">Dressing!</ThemedText>
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
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
