import { ActivityIndicator, StyleSheet } from 'react-native';

import { useContext, useEffect, useState } from 'react';
import { Colors } from '@/app/constants/Colors';
import { AppContext } from '@/app/services/AppContextProvider';
import { ParamListItem } from './typeParamsListItem.component';
import { getParamsMarquesVetements } from '@/app/controllers/parametrages.controller';
import ParamMarqueVetementsModel from '@/app/models/params/paramMarqueVetements.model';
import { ThemedView } from '../commons/views/ThemedView';
import { ThemedText } from '../commons/views/ThemedText';


export default function ParamMarquesVetements() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { marques, setMarques } = useContext(AppContext)!;
  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement des paramètres de marques...");
    getParamsMarquesVetements({ setMarques, setError, setIsLoading });
  }, [setMarques])


  /**
   * Retourne le contenu du panneau en fonction de l'état de chargement, d'erreur ou des usages.
   *
   * @returns {React.JSX.Element} Un élément JSX représentant le contenu du panneau.
   * - Si les données sont en cours de chargement, retourne un indicateur d'activité.
   * - Si une erreur est survenue, retourne un texte thématisé affichant le message d'erreur.
   * - Sinon, retourne le panneau des usages.
   */
  function getPanelContent(): React.JSX.Element {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
    } else {
      return showPanelMarques(marques)
    }
  }


  /**
   * Affiche un panneau contenant une liste d'éléments d'usage de vêtements.
   *
   * @param {ParamUsageVetementsModel[] | undefined} marquesVetements - La liste des usages de vêtements à afficher. Peut être indéfinie.
   * @returns {React.JSX.Element} Un élément JSX représentant le panneau avec la liste des usages de vêtements.
   */
  function showPanelMarques(marquesVetements: ParamMarqueVetementsModel[] | undefined): React.JSX.Element {
    let panel: JSX.Element;
    let items: JSX.Element[] = [];
    if (marquesVetements !== undefined) {
      marquesVetements.forEach((item) => {

        items.push(<ParamListItem key={item.id} 
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
        <ThemedText type="title">Marques!</ThemedText>
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
