import React, { useContext, useEffect, useState } from 'react';

import ParallaxScrollView from '@/app/components/commons/views/ParallaxScrollView';
import { ThemedView } from '@/app/components/commons/ThemedView';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

import { ThemedText } from '@/app/components/commons/views/ThemedText';
import { Tabs } from '@/constants/TabsEnums';
import HomeScreen from '.';
import { getHeaderIcon, getHeaderTitle } from '@/app/components/commons/tab/TabHeader';
import BackendConfigModel from '@/app/models/backendConfig.model';
import { AppContext } from '@/app/services/AppContextProvider';
import connectToBackend, { getDressings } from '../controllers/index.controller';
import DressingScreen from './dressing';
import { TabBarItems } from '@/app/components/commons/tab/TabBarItem';
import ReglageScreen from './reglages';
import { getParamsEtatsVetements, getParamsMarquesVetements, getParamsTaillesVetements, getParamsTypeVetements, getParamsUsagesVetements } from '../controllers/parametrages.controller';
import DressingModel from '../models/dressing.model';

export default function TabLayout() {

  // État pour vérifier si l'utilisateur est connecté au backend
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  // navigations
  const [tab, setTab] = useState(Tabs.INDEX);

  // Infos métiers
  const { 
    backendConnexionData, setBackendConnexionData,
    dressings, setDressings,
    setTypeVetements,
    setTaillesMesures,
    setUsages,
    setEtats,
    setMarques } = useContext(AppContext)!;
  // Identifiant du dressing sélectionné
    const [dressingSelectionne, setDressingSelectionne] = useState<DressingModel | undefined>(undefined);

  /**
   * Fonction pour changer d'onglet
   * @param newTab Le nouvel onglet sélectionné
   */
  function selectNewTab(newTab: Tabs, _id?: string) {
    setRefreshing(!refreshing);
    setTab(newTab);
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
    if(tab === Tabs.INDEX) {
      console.log("(Re)Chargement de l'application...");
      connectToBackend({ setIsLoading, storeConnexionData, setError });
    }
  }, [refreshing, setIsLoading, setError]);


  useEffect(() => {
    setError(null);
    if(tab === Tabs.INDEX && isLoading === false) {
      console.log("(Re)Chargement de la configuration...");
      getParamsTaillesVetements ({ setTaillesMesures, setError, setIsLoading });
      getParamsUsagesVetements  ({  setUsages, setError, setIsLoading });
      getParamsTypeVetements    ({    setTypeVetements, setError, setIsLoading });
      getParamsMarquesVetements ({ setMarques, setError, setIsLoading });

      getParamsEtatsVetements({   setEtats, setError, setIsLoading });
  
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
      return showPanel(tab, dressingSelectionne);
    }
  }

  return (
    <>
      <ParallaxScrollView
        headerImage={getHeaderIcon(tab, dressingSelectionne?.categorie)}
        headerTitle={getHeaderTitle(tab, dressingSelectionne?.libelle)}
        backendConnexionData={backendConnexionData}
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

              {dressingSelectionne !== undefined ?
                <TabBarItems activeTab={tab} selectNewTab={selectNewTab} thisTab={Tabs.DRESSING} activeDressing={dressingSelectionne} /> : null
              }

              <TabBarItems activeTab={tab} selectNewTab={selectNewTab} thisTab={Tabs.REGLAGES} />
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
        if (dressing === undefined) {
          return <ThemedText type="title" style={{ color: Colors.app.color }}>Veuillez sélectionner un dressing</ThemedText>
        }
        else {
          return <DressingScreen dressing={dressing} />
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
    height: '100%',
  },

  tabsViewbox: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.dark.titlebackground,
    height: 60,
    padding: 5,
    margin: 1,
  }
});
