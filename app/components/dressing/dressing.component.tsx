import { StyleSheet, TouchableOpacity, SectionList } from 'react-native'

import React, { useState } from 'react';
import MenuDrawer from 'react-native-side-drawer';
import { ThemedText } from '../commons/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors } from '@/constants/Colors';
import { MenuParametrages } from '@/constants/AppEnum';
import DressingModel from '@/app/models/dressing.model';


export type DressingComponentProps = {
  dressing: DressingModel;
};
/**
 * Composant principal pour un dressing
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 * @example
 * return (
 *   <ReglagesComponent />
 * )
 *
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export default function DressingComponent({ dressing }: DressingComponentProps) {
  
  const [open, setOpen] = useState(true);

    /** Ouverture/Fermeture du menu */
    function toggleOpen(item:any) : void {
      setOpen(!open);
    };

    const drawerContent = () => {
      return (
        <TouchableOpacity onPress={() => toggleOpen(null)} style={styles.animatedBox}>
          <ThemedView>
          <ThemedText type="title">Ajouter un vêtement</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      );
    };

    
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{dressing.libelle}</ThemedText>

      <SectionList
        sections={[
          {title: 'Paramétrages généraux', data: [MenuParametrages.MENU_TYPE_VETEMENTS, MenuParametrages.MENU_TAILLES]},
        ]}
        renderItem={({item}) => <ThemedView style={styles.menuItem} >
                                  <ThemedText type='default' onPress={() => toggleOpen({item})}>{item}</ThemedText>
                                </ThemedView>}
        renderSectionHeader={({section}) => (
          <ThemedView style={styles.menuHeader}>
            <ThemedText type="subtitle">{section.title}</ThemedText>
          </ThemedView>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
        style={{width: '100%', height: 685}}
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
      </ThemedView>
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
    top: 130,
    left: 15,
    width: '100%',
    backgroundColor: Colors.dark.background,
    borderColor: 'red',
    borderWidth: 1

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
  },
});
