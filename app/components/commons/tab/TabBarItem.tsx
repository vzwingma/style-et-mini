import { Tabs } from "@/app/constants/TabsEnums";
import { Image, StyleSheet } from "react-native";
import { Colors } from "@/app/constants/Colors";
import { getTabIcon, TabBarIcon } from "./TabBarIcon";
import { ThemedView } from "../views/ThemedView";
import { ThemedText } from "../views/ThemedText";
import { CategorieDressingEnum } from "@/app/constants/AppEnum";
import DressingModel from "@/app/models/dressing.model";

// Propriétés des onglets
interface TabBarItemsProps {
  activeTab: Tabs; // active tab
  thisTab: Tabs; // this tab name
  activeDressing?: DressingModel; // active dressing  
  selectNewTab: (tab: Tabs, _id?: string) => void; // set active tab
}

interface TabBarIconsProps {
  activeTab: Tabs; // active tab
  activeDressing?: DressingModel; // active dressing
  thisTab: Tabs; // this tab name
  _id?: string; // this tab id
  categorieDressing?: CategorieDressingEnum; // dressing category
}

/**
 * Tab bar items
 * 
 * @param activeTab le nom de l'onglet actif
 * @param thisTab this tab name
 * @param setTab fonction pour définir l'onglet actif
 */
export function TabBarItems({ activeTab, thisTab, selectNewTab, activeDressing }: Readonly<TabBarItemsProps>): JSX.Element {
  // Si l'onglet actif est le même que celui-ci, on ne fait rien
  return <ThemedView style={tabStyles.tabsItem} 
                      onPointerDown={() => selectNewTab(thisTab, activeDressing?.id)} 
                      onTouchEnd={() => selectNewTab(thisTab, activeDressing?.id)}>
    { getTabBarIcon({ activeTab, activeDressing, thisTab }) }
    <ThemedText type='tab'>{activeDressing?.libelle ?? thisTab.toString()}</ThemedText>
  </ThemedView>;
}


function getTabBarIcon({ activeTab, activeDressing, thisTab}: Readonly<TabBarIconsProps>): JSX.Element {
  const selectedTab : boolean = activeTab === thisTab;
  switch (thisTab) {
    case Tabs.INDEX:
      return <TabBarIcon name={"home" + (selectedTab ? "" : "-outline")} color={selectedTab ? Colors.app.color : '#ffffff'} />
    case Tabs.DRESSING:
      return <Image source={getTabIcon(selectedTab, activeDressing?.categorie)} style={{ width: 30, height: 30, tintColor: (selectedTab ? Colors.app.color : '#ffffff'), cursor: 'pointer'}} />
    case Tabs.REGLAGES:
      return <TabBarIcon name={"construct" + (selectedTab ? "" : "-outline")} color={selectedTab ? Colors.app.color : '#ffffff'} />
    default:
      return <></>;
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

