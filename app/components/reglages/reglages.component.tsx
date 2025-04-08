import { StyleSheet, Pressable, View } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '../../constants/Colors';
import { MenuParametragesEnum } from '../../constants/AppEnum';

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


  const menus = [
    MenuParametragesEnum.MENU_TYPE_VETEMENTS,
    MenuParametragesEnum.MENU_TAILLES,
    MenuParametragesEnum.MENU_USAGES,
    MenuParametragesEnum.MENU_ETATS,
    MenuParametragesEnum.MENU_MARQUES,
  ];



  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <ThemedText type="subtitle" style={{ color: Colors.app.color }}>Paramétrages</ThemedText>
      </View>

      {
        menus.map((item, index) => (
          <View key={index} style={styles.menuItem} >
            <ThemedText type='default' onPress={() => toggleOpen({ item })}>{item}</ThemedText>
          </View>
        ))
      }


      {<Modal presentationStyle='overFullScreen' isVisible={open} animationIn='slideInRight' animationOut='slideOutRight'>
        <Pressable onPress={() => setOpen(false)} style={{ flex: 1, backgroundColor: Colors.dark.background, opacity: 0.8 }} >
          <View style={styles.body}>
            <ThemedText type='title'>Paramètres</ThemedText>

          </View>
        </Pressable>
      </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    width: '100%'
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    color: Colors.app.color,
    padding: 5,
    borderColor: Colors.app.color,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 8,
  },
  body: {
    flex: 1,
    width: '100%',
  },
  menuItem: {
    padding: 10,
    height: 44,
    cursor: 'pointer',
  },
});
