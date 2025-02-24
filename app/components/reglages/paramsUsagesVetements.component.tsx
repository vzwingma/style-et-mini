import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { AppContext } from '@/app/services/AppContextProvider';
import { ParamListItem } from './typeParamsListItem.component';
import { getParamsUsagesVetements } from '@/app/controllers/parametrages.controller';
import ParamUsageVetementsModel from '@/app/models/paramUsageVetements.model';


export default function ParamUsagesVetements() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { usages, setUsages } = useContext(AppContext)!;
  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement des paramètres d'usages...");
    getParamsUsagesVetements({ setIsLoading, setUsages, setError });
  }, [setUsages])


  function getPanelContent(): React.JSX.Element {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
    } else {
      return showPanelUsages(usages)
    }
  }


  function showPanelUsages(usageVetements: ParamUsageVetementsModel[] | undefined): React.JSX.Element {
    let panel: JSX.Element;
    let items: JSX.Element[] = [];
    if (usageVetements !== undefined) {
      usageVetements.forEach((item) => {
        items.push(<ParamListItem key={item.id} libelle={JSON.stringify(item)} />);
      });
    }
    panel = <>{items}</>;
    return panel;
  }


  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Usages!</ThemedText>
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
