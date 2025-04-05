import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/views/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { AppContext } from '@/app/services/AppContextProvider';
import { ParamListItem } from './typeParamsListItem.component';
import { getParamsTaillesVetements } from '@/app/controllers/parametrages.controller';
import ParamTailleVetementsModel from '@/app/models/params/paramTailleVetements.model';


export default function ParamTaillesMesures() {

  const [ isLoading,      setIsLoading] = useState(true);
  const [ error,          setError] = useState<Error | null>(null);
  const { taillesMesures, setTaillesMesures } = useContext(AppContext)!;
  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement des paramètres de Tailles et Mesures...");
    getParamsTaillesVetements({ setTaillesMesures, setError, setIsLoading });
  }, [setTaillesMesures])


  function getPanelContent(): React.JSX.Element {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
    } else {
      return showPanelTaillesMesures(taillesMesures)
    }
  }


  function showPanelTaillesMesures(tailleVetements: ParamTailleVetementsModel[] | undefined): React.JSX.Element {
    let panel: JSX.Element;
    let items: JSX.Element[] = [];
    if (tailleVetements !== undefined) {
      tailleVetements.forEach((item, idx) => {
        items.push(<ParamListItem key={item.id} 
          keyItem={item.id} 
          libelle={item.libelle}
          content={JSON.stringify(item, null, "    ")} />);

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
