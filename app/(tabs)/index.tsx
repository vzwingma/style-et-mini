import { Image, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/app/components/commons/ThemedText';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { useContext } from 'react';
import { AppContext } from '../services/AppContextProvider';
import DressingModel from '../models/dressing.model';
import { Colors } from '@/constants/Colors';
import { getTabIcon } from '../components/commons/tab/TabBarIcon';
import { Tabs } from '@/constants/TabsEnums';


/**
 * Propriétés pour le composant HomeScreen.
 *
 * @property selectNewTab - Fonction permettant de sélectionner un nouvel onglet.
 *                          Prend en paramètre un nouvel onglet de type `Tabs` et
 *                          un identifiant optionnel de type `string` ou `undefined`.
 */
interface HomeScreenProps {
  selectNewTab: (newTab: Tabs, _id?: string | undefined) => void;
}

/**
 * @typedef DressingTabComponentProps
 * @description Propriétés pour le composant de l'onglet Dressing.
 * @property {DressingModel} dressing - Modèle représentant les données du dressing.
 */
type DressingTabComponentProps = {
  dressing: DressingModel;
};
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

  const DressingTabComponent: React.FC<DressingTabComponentProps> = ({ dressing }: DressingTabComponentProps) => {

    return (
      <Pressable onPress={() => selectNewTab(Tabs.DRESSING, dressing.id)}>
        <ThemedView style={styles.container}>
          <Image source={getTabIcon(true, dressing.categorie)} style={[styles.icon]} />
          <ThemedText type="subtitle">{dressing.libelle}</ThemedText>
        </ThemedView>
      </Pressable>
    );
  }

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">Environnement : {backendConnexionData?.env}</ThemedText>
      </ThemedView>
      {
        dressings && dressings.map(dressing => {
          return <DressingTabComponent dressing={dressing} />
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },

  container: {
    zIndex: 0,
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5
  },

  icon: {
    tintColor: 'gray',
    margin: 10,
    width: 280,
    height: 280,
    borderColor: Colors.dark.background,
  }
});