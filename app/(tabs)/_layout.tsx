import React, { JSX, useContext, useEffect, useState } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from '../components/commons/views/ThemedText';

import HomeScreen from '.';

import connectToBackend, { getDressings } from '../controllers/index.controller';
import DressingScreen from './dressing';
import ReglageScreen from './reglages';
import { getAllParamsVetements } from '../controllers/reglages/parametrages.controller';
import DressingModel from '../models/dressing.model';
import { Tabs } from './../constants/TabsEnums';
import { AppContext } from '../services/AppContextProvider';
import { Colors } from './../constants/Colors';
import ParallaxScrollView from '../components/commons/views/ParallaxScrollView';
import { getHeaderIcon, getHeaderTitle } from '../components/commons/tab/TabHeader';
import { TabBarItems } from '../components/commons/tab/TabBarItem';
import BackendConfigModel from '../models/backendConfig.model';


export default function TabLayout() {

  // État pour vérifier si l'utilisateur est connecté au backend
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
    // Infos métiers
  const { 
    backendConnexionData, setBackendConnexionData,
    dressings, setDressings,
    setTypeVetements,
    setTaillesMesures,
    setUsages,
    setEtats,
    setMarques,
    activeTab, setActiveTab } = useContext(AppContext)!;
  // Identifiant du dressing sélectionné
    const [dressingSelectionne, setDressingSelectionne] = useState<DressingModel | undefined>(undefined);

  /**
   * Fonction pour changer d'onglet
   * @param newTab Le nouvel onglet sélectionné
   */
  function selectNewTab(newTab: Tabs, _id?: string) {
    setRefreshing(!refreshing);
    setActiveTab(newTab);
    if (_id) {
      setDressingSelectionne(dressings?.find(d => d.id === _id));
    }
  }

  /**
 *  A l'initialisation, lance la connexion au backend et charge les données
 * et à changement d'onglet
 * */
  useEffect(() => {
    setError(null);
    if(activeTab === Tabs.INDEX) {
      console.log("(Re)Chargement de l'application...");
      connectToBackend({ setIsLoading, storeConnexionData, setError });
    }
  }, [refreshing, setIsLoading, setError]);

  /**
   * A l'initialisation, lance la connexion au backend pour récupérer les types de vêtements
   */
  useEffect(() => {
    setError(null);
    if(activeTab === Tabs.INDEX && isLoading === false) {
      console.log("(Re)Chargement de la configuration...");
      getAllParamsVetements ({ setTypeVetements, setTaillesMesures, setUsages, setEtats, setMarques,  setError, setIsLoading });
  
      getDressings({ setIsLoading, setDressings, setError });
    }
  }, [refreshing, setIsLoading, backendConnexionData, setUsages, setError]);


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
      return <><ThemedText type="subtitle" style={{ color: 'red', marginTop: 50 }}>Erreur : {error.message}</ThemedText><ThemedText type="italic">{error.stack}</ThemedText></>
    } else {
      return showPanel(activeTab, dressingSelectionne);
    }
  }

  return (
    <>
      <ParallaxScrollView
        headerImage={getHeaderIcon(activeTab, dressingSelectionne?.categorie)}
        headerTitle={getHeaderTitle(activeTab, dressingSelectionne?.libelle)}
        backendConnexionData={backendConnexionData}>

        <View style={tabStyles.titleContainer}>
          {getPanelContent()}
        </View>

      </ParallaxScrollView>

      <View style={tabStyles.tabsViewbox}>
        {
          (!isLoading && error === null) ?
            <>
              <TabBarItems activeTab={activeTab} selectNewTab={selectNewTab} thisTab={Tabs.INDEX} />

              {dressingSelectionne !== undefined ?
              <>
                <TabBarItems activeTab={activeTab} selectNewTab={selectNewTab} thisTab={Tabs.DRESSING} activeDressing={dressingSelectionne} />
                <TabBarItems activeTab={activeTab} selectNewTab={selectNewTab} thisTab={Tabs.VETEMENTS} activeDressing={dressingSelectionne} />
                <TabBarItems activeTab={activeTab} selectNewTab={selectNewTab} thisTab={Tabs.TENUES} activeDressing={dressingSelectionne} />
                <TabBarItems activeTab={activeTab} selectNewTab={selectNewTab} thisTab={Tabs.CAPSULES} activeDressing={dressingSelectionne} />
              </>
                 : null
              }

              <TabBarItems activeTab={activeTab} selectNewTab={selectNewTab} thisTab={Tabs.REGLAGES} />
            </> : null
        }
      </View>
    </>
  );


  /**
   * Affiche le panneau de l'onglet sélectionné
   *
   * @param tab L'onglet sélectionné
   */
  function showPanel(tab: Tabs, dressing?: DressingModel): JSX.Element {

    switch (tab) {
      case Tabs.INDEX:
        return <HomeScreen selectNewTab={selectNewTab} />
      case Tabs.DRESSING:
        case Tabs.VETEMENTS:
        case Tabs.TENUES:        
        case Tabs.CAPSULES:
          return <DressingScreen tab={tab} dressing={dressing} />
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
    backgroundColor: Colors.dark.background,
  },

  tabsViewbox: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.app.background,
    height: 100,
    padding: 5,
    margin: 1
  }
});
