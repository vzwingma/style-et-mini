import { View, StyleSheet, TouchableOpacity, SectionList } from 'react-native'

import React, { useState } from 'react';
import MenuDrawer from 'react-native-side-drawer';
import { ThemedText } from '../components/commons/ThemedText';
import { ThemedView } from '../components/commons/ThemedView';
import { Colors } from '@/constants/Colors';
import ParamTypesVetements from '../components/reglages/paramTypeVetements';
import ParamTaillesMesures from '../components/reglages/paramTaillesMesures';

/**
 * Composant principal pour l'écran de réglages.
 *
 * @returns {JSX.Element} Le composant de l'écran de réglages.
 *
 * @component
 * @example
 * return (
 *   <ReglageScreen />
 * )
 *
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export default function ReglageScreen() {
  
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState<Menu | null>(null);

  enum Menu {
    MENU_TYPE_VETEMENTS = 'Type de vêtements',
    MENU_TAILLES = 'Tailles et Mesures' 
  }

    /** Ouverture/Fermeture du menu */
    function toggleOpen(item:any) : void {
      setMenu(item?.item);
      setOpen(!open);
    };

    const drawerContent = () => {
      return (
        <TouchableOpacity onPress={() => toggleOpen(null)} style={styles.animatedBox}>
          <ThemedView style={styles.body}>
          {
            menu === Menu.MENU_TYPE_VETEMENTS ? 
            <ParamTypesVetements /> : <ParamTaillesMesures />
          }
          </ThemedView>
        </TouchableOpacity>
      );
    };

    
  return (
    <View style={styles.container}>
      
      <SectionList
        sections={[
          {title: 'Paramétrages', data: [Menu.MENU_TYPE_VETEMENTS, Menu.MENU_TAILLES]},
        ]}
        renderItem={({item}) => <ThemedView style={styles.menuItem} >
                                  <ThemedText type='default' onPress={() => toggleOpen({item})}>{item}</ThemedText>
                                </ThemedView>}
        renderSectionHeader={({section}) => (
          <ThemedView style={styles.menuHeader}>
            <ThemedText type="title">{section.title}</ThemedText>
          </ThemedView>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
        style={{width: '100%', height: 700}}
      />
      
        <MenuDrawer
          open={!open}
          position={'right'}
          drawerContent={drawerContent()}
          drawerPercentage={100}
          animationTime={250}
          overlay={true}
          opacity={0.3}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    width: '100%'
  },
  animatedBox: {
    flex: 1,
    zIndex: 1,
    width: '100%'    
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderColor: 'red',
    borderWidth: 1
  },


  menuItem: {
    padding: 10,
    height: 44,
    cursor: 'pointer',
  },
  menuHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontWeight: 'bold',
    color: Colors.app.color,
    backgroundColor: Colors.dark.background,
  },
});
