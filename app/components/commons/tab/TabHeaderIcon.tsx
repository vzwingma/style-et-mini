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