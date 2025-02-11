import React, { useState } from 'react';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AppStatus } from '@/constants/AppEnum';
import { ThemedText } from '@/components/ThemedText';
import { Tabs } from '@/constants/TabsEnums';
import HomeScreen from '.';
import { TabBarItems } from '@/components/navigation/TabBarItem';
import { getHeaderIcon } from '@/components/navigation/TabHeaderIcon';

export default function TabLayout() {

  // État pour vérifier si l'utilisateur est connecté au backend
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [error, setError] = useState<Error | null>(null);
  const [tab, setTab] = useState(Tabs.INDEX);
  /**
   * Récupère le statut de connexion au backend
   *
   * @returns Le statut de connexion suivant l'énumération AppStatus
   */
  function getConnexionStatus(): AppStatus {
    if (isLoading) return AppStatus.INCONNU;
    return AppStatus.CONNECTE ; // domoticzConnexionData?.status === "OK" ? AppStatus.CONNECTE : AppStatus.DECONNECTE;
  }

  /**
   * Fonction pour changer d'onglet
   * @param newTab Le nouvel onglet sélectionné
   */
  function selectNewTab(newTab: Tabs) {
    setRefreshing(!refreshing);
    setTab(newTab);
  }
  /**
   * Récupère le contenu du panneau, suivant l'état de chargement et les erreurs
   */
  function getPanelContent() {
    if (isLoading) {
      return <ActivityIndicator size={'large'} color={Colors.app.color} />
    } else if (error !== null) {
      return <ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText>
    } else {
      return showPanel(tab)
    }
  }

  return (
    <>
      <ParallaxScrollView
        headerImage={getHeaderIcon(tab)}
        headerTitle="Style & Mini"
        connexionStatus={getConnexionStatus()}
        setRefreshing={setRefreshing}>

        <ThemedView style={tabStyles.titleContainer}>
          {getPanelContent()}
        </ThemedView>

      </ParallaxScrollView>
      <View style={tabStyles.tabsViewbox}>
        {
          (!isLoading && error === null) ?
            <>
              <TabBarItems activeTab={tab} selectNewTab={selectNewTab} thisTab={Tabs.INDEX} />
              <TabBarItems activeTab={tab} selectNewTab={selectNewTab} thisTab={Tabs.DRESSING} />
            </> : <></>
        }
      </View>
    </>
  );

  
/**
 * Affiche le panneau de l'onglet sélectionné
 *
 * @param tab L'onglet sélectionné
 */
function showPanel(tab: Tabs): JSX.Element {

  switch (tab) {
    case Tabs.INDEX:
      return <HomeScreen />
    case Tabs.DRESSING:
      return <HomeScreen/>
      default:
      return <ThemedText type="title" style={{ color: 'red' }}>404 - Page non définie</ThemedText>
  }
}
}

export const tabStyles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 8
  },

  tabsViewbox: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.dark.titlebackground,
    height: 70,
    padding: 10,
    margin: 1,
  }
});
