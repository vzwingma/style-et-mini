import { StyleSheet, SectionList, Pressable } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors } from '@/constants/Colors';
import ParamTypesVetements from './paramsTypeVetements.component';
import ParamTaillesMesures from './paramsTaillesMesures.component';
import { MenuParametragesEnum } from '@/constants/AppEnum';
import ParamUsagesVetements from './paramsUsagesVetements.component';
import ParamEtatsVetements from './paramsEtatsVetements.component';
import ParamMarquesVetements from './paramsMarquesVetements.component';

/**
 * Composant principal pour l'écran de réglages.
 *
 * @returns {JSX.Element} Le composant de l'écran de réglages.
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
export default function ReglagesComponent() {

  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState<MenuParametragesEnum | null>(null);


  /** Ouverture/Fermeture du menu */
  function toggleOpen(item: any): void {
    setMenu(item?.item);
    setOpen(!open);
  };

  const menuContent = (menu: MenuParametragesEnum | null) => {
    switch (menu) {
      case MenuParametragesEnum.MENU_TYPE_VETEMENTS:
        return <ParamTypesVetements />
      case MenuParametragesEnum.MENU_TAILLES:
        return <ParamTaillesMesures />
      case MenuParametragesEnum.MENU_USAGES:
        return <ParamUsagesVetements />
      case MenuParametragesEnum.MENU_ETATS:
        return <ParamEtatsVetements />
        case MenuParametragesEnum.MENU_MARQUES:
          return <ParamMarquesVetements />        
      default:
        return <></>
    }
  };

  const drawerContent = () => {
    return (
      <Pressable style={styles.animatedBox}>
        {
          menuContent(menu)
        }
      </Pressable>
    );
  };


  return (
    <ThemedView style={styles.container}>
      <SectionList
        sections={[
          {
            title: 'Paramétrages', data:
              [
                MenuParametragesEnum.MENU_TYPE_VETEMENTS,
                MenuParametragesEnum.MENU_TAILLES,
                MenuParametragesEnum.MENU_USAGES,
                MenuParametragesEnum.MENU_ETATS,
                MenuParametragesEnum.MENU_MARQUES,
              ]
          },
        ]}
        renderItem={({ item }) => <ThemedView style={styles.menuItem} >
          <ThemedText type='default' onPress={() => toggleOpen({ item })}>{item}</ThemedText>
        </ThemedView>}
        renderSectionHeader={({ section }) => (
          <ThemedView style={styles.menuHeader}>
            <ThemedText type="title">{section.title}</ThemedText>
          </ThemedView>
        )}
        keyExtractor={item => `basicListEntry-${item}`}
        style={{ width: '100%', height: 685 }}
      />

      { <Modal presentationStyle='overFullScreen' isVisible={open} animationIn='slideInRight' animationOut='slideOutRight'
              >
        <Pressable onPress={() => setOpen(false)} style={{ flex: 1, backgroundColor: Colors.dark.background, opacity: 0.8 }} >
        <ThemedView style={styles.body}>
          <ThemedText type='title'>Paramètres</ThemedText>
          
          </ThemedView>
          </Pressable>
      </Modal>
      }
{ /** 
 * 

      <MenuDrawer
        open={!open}
        position={'right'}
        drawerContent={drawerContent()}
        drawerPercentage={98}
        animationTime={250}
        overlay={true}
        opacity={0.8}
      />
       */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    width: '100%',
    borderColor: 'red',
    borderWidth: 1,
  },
  animatedBox: {
    flex: 1,
    zIndex: 1,
    top: 130,
    left: 15,
    width: '100%',
    backgroundColor: Colors.dark.background,
    borderColor: 'grey',
    borderWidth: 1,
    overflow: 'scroll',

  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
