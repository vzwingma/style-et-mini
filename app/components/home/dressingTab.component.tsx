import DressingModel from "@/app/models/dressing.model";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../commons/views/ThemedView";
import { ThemedText } from "../commons/views/ThemedText";
import { Tabs } from "@/app/constants/TabsEnums";
import { getHomeIcon } from "../commons/tab/TabBarIcon";
import { Colors } from "@/app/constants/Colors";



/**
 * @typedef DressingTabComponentProps
 * @description Propriétés pour le composant de l'onglet Dressing.
 * @property {DressingModel} dressing - Modèle représentant les données du dressing.
 */
type DressingTabComponentProps = {
    dressing: DressingModel;
    selectNewTab: (newTab: Tabs, _id?: string | undefined) => void;
  };

  const DressingTabComponent: React.FC<DressingTabComponentProps> = ({ dressing, selectNewTab }: DressingTabComponentProps) => {

    return (
      <Pressable onPress={() => selectNewTab(Tabs.DRESSING, dressing.id)}>
        <ThemedView style={styles.container}>
          <Image source={getHomeIcon(dressing.categorie)} style={[styles.icon]} />
          <ThemedText type="subtitle" style={{height: 35, top: 5}}>{dressing.libelle}</ThemedText>
        </ThemedView>
      </Pressable>
    );

  }
  export default DressingTabComponent;


  const styles = StyleSheet.create({
    container: {
      zIndex: 0,
      alignItems: 'center',
      borderColor: 'grey',
      borderWidth: 0.5
    },
  
    icon: {
      margin: 5,
      width: 230,
      height: 230,
      borderColor: Colors.dark.background,
    }
  });