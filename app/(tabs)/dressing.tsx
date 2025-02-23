import { ActivityIndicator, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import DressingModel from '../models/dressing.model';
import loadDressing from '../controllers/dressing.controller';
import DressingComponent from '../components/dressing/dressing.component';


interface DressingScreenProps {
  idDressing: string;
}

/**
 * Ecran de gestion du dressing
 * @param id id du dressing
 */
export default function DressingScreen({ idDressing }: DressingScreenProps) {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [dressing, setDressing] = useState<DressingModel>();
  /**
 *  A l'initialisation, lance la connexion au backend pour récupérer le dressing et les vêtements associés
 * */
  useEffect(() => {
    console.log("(Re)Chargement du dressing [", { idDressing }, "]");
    loadDressing({ idDressing, setIsLoading, setDressing, setError });
  }, [setIsLoading, idDressing])


  /**
   * Retourne le contenu du panneau en fonction de l'état de chargement, d'erreur ou des vêtements disponibles.
   *
   * @returns {React.JSX.Element} - Un élément JSX représentant le contenu du panneau.
   * - Si `isLoading` est vrai, retourne un indicateur d'activité.
   * - Si `error` n'est pas nul, retourne un texte thématisé affichant le message d'erreur.
   * - Sinon, retourne le panneau des vêtements en utilisant la fonction `showPanelVetements`.
   */
  function getPanelContent(): React.JSX.Element {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null || dressing === undefined) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error?.message}</ThemedText>
    } else {
      return <DressingComponent dressing={dressing} />;
    }
  }



  /**
   * Affiche un panneau de vêtements.
   *
   * @param {DressingVetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
   * @returns {React.JSX.Element} Un élément JSX contenant la liste des éléments de type vêtement.
  
  function showPanelVetements(vetements: DressingVetementModel[] | undefined): React.JSX.Element {
    let panel: JSX.Element;
    let items: JSX.Element[] = [];
    if (vetements !== undefined) {
      vetements.forEach((item) => {
        items.push(<TypeVetementListItem key={item._id} typeVetements={item} />);
      });
    }
    panel = <>{items}</>;
    return panel;
  }
 */

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dressing {dressing?.libelle} ({dressing?.type})</ThemedText>
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
