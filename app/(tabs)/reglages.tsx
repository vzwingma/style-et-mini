import { ActivityIndicator, SectionList, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../services/AppContextProvider';
import callApiTypeVetements from '../controllers/dressing.controller';
import { Colors } from '@/constants/Colors';
import TypeVetementsModel from '../models/typeVetements.model';
import { TypeVetementListItem } from '../components/dressing/typeVetementListItem.component';

export default function ReglageScreen() {


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
   //   callApiTypeVetements({setIsLoading, setTypeVetements, setError});
    }, [refreshing])
  
    const DATA = [
      {
        title: 'Paramétrages',
        data: ['Types de vêtements', 'Mesures et tailles'],
      }
    ];

    function getMenuContent() : React.JSX.Element{
      return <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                  <ThemedView style={styles.menuItemContainer}>
                    <ThemedText type="default">{item}</ThemedText>
                  </ThemedView>
                )}
                renderSectionHeader={({section: {title}}) => (
                  <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">{title}</ThemedText>
                  </ThemedView>
                )}
              />
    }


    function getPanelContent() : React.JSX.Element{
      if (isLoading) {
        return <ActivityIndicator size={'large'} color={Colors.app.color} />
      } else if (error !== null) {
        return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
      } else {
        return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>message</ThemedText>
      }
    }




  return (
      <ThemedView style={styles.titleContainer}>
        {getMenuContent()}
      </ThemedView> 
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    width: '100%'
  },
  menuItemContainer: {
    gap: 8,
    marginBottom: 8,
    width: '100%',
    cursor: 'pointer'
  },
});
