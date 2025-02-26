import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { AppContext } from '@/app/services/AppContextProvider';
import ParamTypeVetementsModel from '@/app/models/paramTypeVetements.model';
import { getParamsTypeVetements } from '@/app/controllers/parametrages.controller';
import { ParamListItem } from './typeParamsListItem.component';


/**
 * 
 * @returns Ecran de gestion des types de vêtements
 */
export default function ParamTypesVetements() {


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { typeVetements, setTypeVetements } = useContext(AppContext)!;
  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement des paramètres de type de vêtements..");
    getParamsTypeVetements({ setIsLoading, setTypeVetements, setError });
  }, [setTypeVetements])


  function getPanelContent(): React.JSX.Element {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
    } else {
      return showPanel(typeVetements)
    }
  }


  function showPanel(typeVetements: ParamTypeVetementsModel[] | undefined): React.JSX.Element {
    let panel: JSX.Element;
    let items: JSX.Element[] = [];
    if (typeVetements !== undefined) {
      typeVetements.forEach((item, idx) => {
        items.push(<ParamListItem key={item.id} libelle={JSON.stringify(item)} />);
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
