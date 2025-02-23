import React, { useContext, useEffect, useState } from 'react';

import ParallaxScrollView from '@/app/components/commons/ParallaxScrollView';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AppStatus, DressingType } from '@/constants/AppEnum';
import { ThemedText } from '@/app/components/commons/ThemedText';
import { Tabs } from '@/constants/TabsEnums';
import HomeScreen from '.';
import { getHeaderIcon } from '@/app/components/commons/tab/TabHeaderIcon';
import BackendConfigModel from '@/app/models/backendConfig.model';
import { AppContext } from '@/app/services/AppContextProvider';
import connectToBackend from '../controllers/index.controller';
import DressingScreen from './dressing';
import { TabBarItems } from '@/app/components/commons/tab/TabBarItem';
import ReglageScreen from './reglages';

export default function TabLayout() {

  // État pour vérifier si l'utilisateur est connecté au backend
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  

  const { backendConnexionData, setBackendConnexionData } = useContext(AppContext)!;


  const [error, setError] = useState<Error | null>(null);
  const [tab, setTab] = useState(Tabs.INDEX);
  /**
   * Récupère le statut de connexion au backend
   *
   * @returns Le statut de connexion suivant l'énumération AppStatus
   */
  function getConnexionStatus(): AppStatus {
    if (isLoading) return AppStatus.INCONNU;
    return (backendConnexionData?.status?.indexOf("OK") ?? -1) > 0 ? AppStatus.CONNECTE : AppStatus.DECONNECTE;
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
   *  A l'initialisation, lance la connexion à Domoticz
   * et à changement d'onglet
   * */
    useEffect(() => {
      console.log("(Re)Chargement de l'application...");
      connectToBackend({ setIsLoading, storeConnexionData, setError });
    }, [refreshing])

    
  /**
   * Fonction de callback pour stocker les données de connexion et charger les appareils
   * @param data Les données de connexion à Domoticz
   */
  function storeConnexionData(data: BackendConfigModel) {
    setBackendConnexionData(data);
    setIsLoading(false);
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
              <TabBarItems activeTab={tab} selectNewTab={selectNewTab} thisTab={Tabs.DRESSING_B} />
              <TabBarItems activeTab={tab} selectNewTab={selectNewTab} thisTab={Tabs.DRESSING_A} />              
              <TabBarItems activeTab={tab} selectNewTab={selectNewTab} thisTab={Tabs.REGLAGES} />
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
    case Tabs.DRESSING_A:
      return <DressingScreen type={DressingType.ADULTE}/>
    case Tabs.DRESSING_B:
       return <DressingScreen type={DressingType.ENFANT}/>
    case Tabs.REGLAGES:
        return <ReglageScreen/>      
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
