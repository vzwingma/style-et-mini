import { StyleSheet, Pressable, View, ScrollView, Image } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '../../constants/Colors';
import { menusParametrages } from '../../constants/AppEnum';
import ParamEtatsVetements from './parametrages.component';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';

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

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuParametragesModel | null>(null);


  /** Ouverture/Fermeture du menu */
  function toggleOpen(menu: MenuParametragesModel ): void {
    setMenu(menu);
    setOpen(!open);
  };

  return (
    <>
      <View style={styles.container}>
        {
          (Object.keys(menusParametrages) as Array<keyof typeof menusParametrages>).map((keyGroupe, index) => (
            <View>
              <View key={index} style={styles.title}>
                <ThemedText type="subtitle" style={{ color: Colors.app.color }}>{keyGroupe}</ThemedText>
              </View>
              {menusParametrages[keyGroupe].map((itemParam, index) => (
                <View key={index} style={styles.menuItem} >
                  <Image source={itemParam.icone} style={styles.icon} />
                  <ThemedText type='default' onPress={() => toggleOpen(itemParam)}>{itemParam.titre}</ThemedText>
                </View>
              ))}
            </View>

          ))
        }
      </View>

      {<Modal presentationStyle='fullScreen' isVisible={open} animationIn='slideInRight' animationOut='slideOutRight' >
        <Pressable onPress={() => setOpen(false)}  >
          <View style={styles.body}>
            <View style={styles.menuItem}>
            <Image source={menu?.icone} style={styles.icon} />
            <ThemedText type='title'>{menu?.titre}</ThemedText>
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <ParamEtatsVetements />
            </ScrollView>
          </View>
        </Pressable>
      </Modal>}

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    zIndex: 0,
    width: '100%'
  },
  title: {
    padding: 10,
    borderColor: Colors.app.color,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 8,
    height: 50,
  },
  body: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.app.background,
    padding: 5,
  },
  icon: {
    marginRight: 5,
    width: 20,
    height: 20,
    tintColor: 'white',
},  
  menuItem: {
    flexDirection: 'row',
    padding: 10,
    height: 44,
    cursor: 'pointer',
  },
});
