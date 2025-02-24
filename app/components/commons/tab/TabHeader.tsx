import { Colors } from "@/constants/Colors";
import { Tabs } from "@/constants/TabsEnums";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";


/**
 * Affiche l'image du logo de l'application suivant l'onglet sélectionné
 */
export function getHeaderIcon(tab: Tabs) {
    const iconSize = 110;
    switch (tab) {
      case Tabs.INDEX:
        return <Ionicons size={iconSize} name="home" style={tabStyles.headerImage} />
      case Tabs.DRESSING:
        return <Ionicons size={iconSize} name="shirt" style={tabStyles.headerImage} />
        case Tabs.REGLAGES:
          return <Ionicons size={iconSize} name="options" style={tabStyles.headerImage} />        
      default:
        return <></>;
    }
  }


/**
 * Affiche le titre de l'onglet sélectionné
 * @param tab L'onglet sélectionné
 * @param dressingName Le nom du dressing sélectionné
 * @returns Le titre de l'onglet
 * @see Tabs
 * @see Colors
 */
  export function getHeaderTitle(tab: Tabs, dressingName?: string) {
    
    switch (tab) {
      case Tabs.INDEX:
        return "Bienvenue";
      case Tabs.DRESSING:
        if (dressingName) {
          return `Le dressing de ${dressingName}`;
        }
        return "Erreur : dressing non défini";
      case Tabs.REGLAGES:
        return "Paramètres de l'application";
      default:
        return "Erreur : Onglet non défini";
    }
  }
  

export const tabStyles = StyleSheet.create({
    headerImage: {
      color: '#808080',
      position: 'absolute',
      bottom: -20,
      backgroundColor: Colors.dark.titlebackground,
    },
    domoticzLogo: {
      width: 100,
      height: 100,
      position: 'absolute',
      backgroundColor: Colors.dark.titlebackground,
    },
  });