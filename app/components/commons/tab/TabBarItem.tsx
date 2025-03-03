import { Tabs } from "@/constants/TabsEnums";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "./TabBarIcon";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

// Propriétés des onglets
interface TabBarItemsProps {
    activeTab: Tabs; // active tab
    activeDressing?: string; // active dressing
    thisTab: Tabs; // this tab name
    libelleTab?: string; // this tab label
    _id?: string; // this tab id
    selectNewTab: (tab: Tabs, _id?: string) => void; // set active tab
}

/**
 * Tab bar items
 * 
 * @param activeTab le nom de l'onglet actif
 * @param thisTab this tab name
 * @param setTab fonction pour définir l'onglet actif
 */
export function TabBarItems({ activeTab, activeDressing, thisTab, selectNewTab, libelleTab, _id}: Readonly<TabBarItemsProps>) : JSX.Element {
    return <ThemedView style={tabStyles.tabsItem} onPointerDown={() => selectNewTab(thisTab, _id)} onTouchEnd={() => selectNewTab(thisTab, _id)}>
                <TabBarIcon name={getTabIconName(thisTab) + (activeTab === thisTab && activeDressing === _id ? "" : "-outline")} 
                            color={activeTab === thisTab && activeDressing === _id ? Colors.app.color : '#ffffff'} />
                <ThemedText type='tab'>{libelleTab || thisTab.toString()}</ThemedText>
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
      case Tabs.REGLAGES:
        return 'construct';        
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

