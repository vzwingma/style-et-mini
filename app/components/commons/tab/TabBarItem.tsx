import { Tabs } from "../../../constants/TabsEnums";
import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import { getTabIcon, getTabOutfitIcon, TabBarIcon } from "./TabBarIcon";
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

  const libelle = (thisTab === Tabs.DRESSING) ? activeDressing?.libelle ?? "Aucun dressing sélectionné" : thisTab.toString();

  // Si l'onglet actif est le même que celui-ci, on ne fait rien
  return <View style={tabStyles.tabsItem}
    onPointerDown={() => selectNewTab(thisTab, activeDressing?.id)}
    onTouchEnd={() => selectNewTab(thisTab, activeDressing?.id)}>
    {getTabBarIcon({ activeTab, activeDressing, thisTab })}
    <ThemedText type='tab'>{libelle}</ThemedText>
  </View>;
}


/**
 * Génère l'icône de la barre d'onglets en fonction de l'onglet actif, 
 * de l'état actif du dressing et de l'onglet actuel.
 *
 * @param {Readonly<TabBarIconsProps>} props - Les propriétés nécessaires pour déterminer l'icône.
 * @param {Tabs} props.activeTab - L'onglet actuellement actif.
 * @param {ActiveDressing | undefined} props.activeDressing - L'état actif du dressing (peut être indéfini).
 * @param {Tabs} props.thisTab - L'onglet pour lequel l'icône doit être générée.
 * 
 * @returns {JSX.Element} L'élément JSX représentant l'icône de la barre d'onglets.
 */
function getTabBarIcon({ activeTab, activeDressing, thisTab }: Readonly<TabBarIconsProps>): JSX.Element {
  const selectedTab: boolean = activeTab === thisTab;
  switch (thisTab) {
    case Tabs.INDEX:
      return <TabBarIcon name={"home" + (selectedTab ? "" : "-outline")} color={selectedTab ? Colors.app.color : '#ffffff'} />
    case Tabs.DRESSING:
      return <Image source={getTabIcon(selectedTab, activeDressing?.categorie)} style={{ width: 30, height: 30, tintColor: (selectedTab ? Colors.app.color : '#ffffff')}} />
    case Tabs.TENUES:
      return <Image source={getTabOutfitIcon(selectedTab, activeDressing?.categorie)} style={{ width: 30, height: 30, tintColor: (selectedTab ? Colors.app.color : '#ffffff') }} />
    case Tabs.CAPSULE:
      return <Image source={selectedTab ? require('@/assets/icons/closet.png') : require('@/assets/icons/closet-outline.png')} style={{ width: 30, height: 30, tintColor: (selectedTab ? Colors.app.color : '#ffffff'), cursor: 'pointer' }} />
    case Tabs.REGLAGES:
      return <TabBarIcon name={"construct" + (selectedTab ? "" : "-outline")} color={selectedTab ? Colors.app.color : '#ffffff'} />
    default:
      return <></>;
  }
}




const tabStyles = StyleSheet.create({

  tabsItem: {
    width: '20%',
    backgroundColor: Colors.app.background,
    alignItems: 'center'
  }
});

