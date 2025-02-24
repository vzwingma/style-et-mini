import React, { useContext, useEffect, useState } from 'react';

import ParallaxScrollView from '@/app/components/commons/ParallaxScrollView';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { AppStatus } from '@/constants/AppEnum';
import { ThemedText } from '@/app/components/commons/ThemedText';
import { Tabs } from '@/constants/TabsEnums';
import HomeScreen from '.';
import { getHeaderIcon, getHeaderTitle } from '@/app/components/commons/tab/TabHeader';
import BackendConfigModel from '@/app/models/backendConfig.model';
import { AppContext } from '@/app/services/AppContextProvider';
import connectToBackend, { getDressings } from '../controllers/index.controller';
import DressingScreen from './dressing';
import { TabBarItems } from '@/app/components/commons/tab/TabBarItem';
import ReglageScreen from './reglages';

export default function TabLayout() {

  // État pour vérifier si l'utilisateur est connecté au backend
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // navigations
  const [tab, setTab] = useState(Tabs.INDEX);

  // Infos métiers
  const { backendConnexionData, setBackendConnexionData } = useContext(AppContext)!;
  const [idDressing, setIdDressing] = useState<string | undefined>(undefined);
  const {dressings, setDressings } = useContext(AppContext)!;


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
  function selectNewTab(newTab: Tabs, _id?: string) {
    setRefreshing(!refreshing);
    setTab(newTab);
    if (_id) {
      setIdDressing(_id);
    }
  }

  /**
 *  A l'initialisation, lance la connexion à Domoticz
 * et à changement d'onglet
 * */
  useEffect(() => {
    console.log("(Re)Chargement de l'application...");
    connectToBackend({ setIsLoading, storeConnexionData, setError });
    getDressings({ setIsLoading, setDressings, setError });
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
      return showPanel(tab, idDressing)
    }
  }

  return (
    <>
      <ParallaxScrollView
        headerImage={getHeaderIcon(tab)}
        headerTitle={getHeaderTitle(tab, dressings?.find(d => d._id === idDressing)?.libelle)}
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
              {
                dressings?.map((dressing, idx) => {
                  return <TabBarItems key={idx} activeTab={tab} activeDressing={idDressing} selectNewTab={selectNewTab} thisTab={Tabs.DRESSING} libelleTab={dressing.libelle} _id={dressing._id} />
                })
              }
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
  function showPanel(tab: Tabs, _id?: string): JSX.Element {

    switch (tab) {
      case Tabs.INDEX:
        return <HomeScreen />
      case Tabs.DRESSING:
        if (_id === undefined) {
          return <ThemedText type="title" style={{ color: 'red' }}>Erreur : Aucun dressing sélectionné</ThemedText>
        }
        else {
          return <DressingScreen dressing={dressings?.find(d => d._id === idDressing)} />
        }
      case Tabs.REGLAGES:
        return <ReglageScreen />
      default:
        return <ThemedText type="title" style={{ color: 'red' }}>404 - Page non définie</ThemedText>
    }
  }
}

export const tabStyles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    height: 715
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
