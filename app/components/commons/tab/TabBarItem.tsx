import { Tabs } from "@/constants/TabsEnums";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "./TabBarIcon";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

// Propriétés des onglets
interface TabBarItemsProps {
    activeTab: Tabs; // active tab
    thisTab: Tabs; // this tab name
    selectNewTab: (tab: Tabs) => void; // set active tab
}

/**
 * Tab bar items
 * 
 * @param activeTab le nom de l'onglet actif
 * @param thisTab this tab name
 * @param setTab fonction pour définir l'onglet actif
 */
export function TabBarItems({ activeTab, thisTab, selectNewTab}: Readonly<TabBarItemsProps>) : JSX.Element {
    return <ThemedView style={tabStyles.tabsItem} onPointerDown={() => selectNewTab(thisTab)} onTouchEnd={() => selectNewTab(thisTab)}>
                <TabBarIcon name={getTabIconName(thisTab) + (activeTab === thisTab ? "" : "-outline")} 
                            color={activeTab === thisTab ? Colors.app.color : '#ffffff'} />
                <ThemedText type='tab'>{thisTab.toString()}</ThemedText>
            </ThemedView>;
  }

  /**
   * Retourne l'icône de l'onglet sélectionné
   * @param tab nom de l'onglet
   * @returns l'icône de l'onglet sélectionné
   */
  function getTabIconName(tab: Tabs): string {
    switch (tab) {
      case Tabs.INDEX:
        return 'home';
      case Tabs.DRESSING:
        return 'shirt';
      default:
        return '';
    }
  }

const tabStyles = StyleSheet.create({
 
    tabsItem: {
      width: '20%',
      backgroundColor: Colors.dark.titlebackground,
      alignItems: 'center',
      cursor: 'pointer',
    }
  });

