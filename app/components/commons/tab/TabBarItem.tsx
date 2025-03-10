import { Tabs } from "@/constants/TabsEnums";
import { Image, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { getTabIcon, TabBarIcon } from "./TabBarIcon";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { CategorieDressingEnum } from "@/constants/AppEnum";

// Propriétés des onglets
interface TabBarItemsProps {
  activeTab: Tabs; // active tab
  activeDressing?: string; // active dressing
  thisTab: Tabs; // this tab name
  libelleTab?: string; // this tab label
  _id?: string; // this tab id
  selectNewTab: (tab: Tabs, _id?: string) => void; // set active tab
  categorieDressing?: CategorieDressingEnum; // dressing category
}

interface TabBarIconsProps {
  activeTab: Tabs; // active tab
  activeDressing?: string; // active dressing
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
export function TabBarItems({ activeTab, activeDressing, thisTab, selectNewTab, libelleTab, _id, categorieDressing }: Readonly<TabBarItemsProps>): JSX.Element {
  return <ThemedView style={tabStyles.tabsItem} onPointerDown={() => selectNewTab(thisTab, _id)} onTouchEnd={() => selectNewTab(thisTab, _id)}>
    { getTabBarIcon({ activeTab, activeDressing, thisTab, _id, categorieDressing }) }
    <ThemedText type='tab'>{libelleTab ?? thisTab.toString()}</ThemedText>
  </ThemedView>;
}


function getTabBarIcon({ activeTab, activeDressing, thisTab, _id, categorieDressing }: Readonly<TabBarIconsProps>): JSX.Element {
  const selectedTab : boolean = activeTab === thisTab && activeDressing === _id;
  switch (thisTab) {
    case Tabs.INDEX:
      return <TabBarIcon name={"home" + (selectedTab ? "" : "-outline")} color={selectedTab ? Colors.app.color : '#ffffff'} />
    case Tabs.DRESSING:
      return <Image source={getTabIcon(selectedTab, categorieDressing)} style={{ width: 30, height: 30, tintColor: (selectedTab ? Colors.app.color : '#ffffff'), cursor: 'pointer'}} />
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

