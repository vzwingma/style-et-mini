import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../services/AppContextProvider';
import callApiTypeVetements from '../controllers/dressing.controller';
import { Colors } from '@/constants/Colors';
import ParamTypeVetementsModel from '../models/paramTypeVetements.model';
import { TypeVetementListItem } from '../components/dressing/typeVetementListItem.component';
import { DressingType } from '@/constants/AppEnum';


interface DressingScreenProps {
  id: string | undefined;
}

export default function DressingScreen({ id }: DressingScreenProps) {


  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [vetements, setVetements] = useState<ParamTypeVetementsModel[] | undefined>(undefined);

    /**
   *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
   * et à changement d'onglet
   * */
    useEffect(() => {
      console.log("(Re)Chargement du dressing ["+{id}+"]...");
    //  callApiDressing({setIsLoading, setVetements, setError});
    }, [refreshing])
  

    function getPanelContent() : React.JSX.Element{
      if (isLoading) {
        return <ActivityIndicator size={'large'} color={Colors.app.color} />
      } else if (error !== null) {
        return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
      } else {
      //  return showPanel(setVetements)
        return <></>
      }
    }


    function showPanel(typeVetements: ParamTypeVetementsModel[] | undefined) : React.JSX.Element{
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
        <ThemedText type="title">Dressing {id}</ThemedText>
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
