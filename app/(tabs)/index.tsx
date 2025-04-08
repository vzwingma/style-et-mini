import { StyleSheet } from 'react-native';

import { ThemedText } from '../components/commons/views/ThemedText';
import { ThemedView } from '../components/commons/views/ThemedView';
import { useContext } from 'react';
import { AppContext } from '../services/AppContextProvider';
import { Tabs } from '@/app/constants/TabsEnums';
import DressingTabComponent from '../components/home/dressingTab.component';


/**
 * Propriétés pour le composant HomeScreen.
 *
 * @property selectNewTab - Fonction permettant de sélectionner un nouvel onglet.
 *                          Prend en paramètre un nouvel onglet de type `Tabs` et
 *                          un identifiant optionnel de type `string` ou `undefined`.
 */
interface HomeScreenProps {
  readonly selectNewTab: (newTab: Tabs, _id?: string | undefined) => void;
}


/**
 * Composant principal de l'écran d'accueil.
 *
 * Ce composant utilise le contexte `AppContext` pour obtenir les données de connexion au backend.
 * Il affiche le titre de la page et l'environnement actuel.
 *
 * @returns {JSX.Element} Le composant JSX représentant l'écran d'accueil.
 */
export default function HomeScreen({ selectNewTab }: HomeScreenProps) {

  const { backendConnexionData, dressings } = useContext(AppContext)!;


  return (
    <ThemedView style={styles.titleContainer}>
      {backendConnexionData?.env !== "PROD"
        && <ThemedText type="title">Environnement : {backendConnexionData?.env}</ThemedText>
      }
      {
        dressings?.map(dressing => {
          return <DressingTabComponent key={"dressTab" + dressing.id} dressing={dressing} selectNewTab={selectNewTab} />
        })
      }
    </ThemedView>);
}



const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    gap: 8,
  }
});