import { StyleSheet, View, Image } from 'react-native'
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '../../constants/Colors';
import { menusParametrages } from '../../constants/AppEnum';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';
import { ParametragesListComponent } from './parametragesList.component';

/**
 * Composant principal pour l'écran de réglages.
 *
 * @returns {JSX.Element} Le composant de l'écran de réglages.
 *
 * @component
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export const ReglagesComponent: React.FC = () => {

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
          (Object.keys(menusParametrages) as Array<keyof typeof menusParametrages>).map((keyGroupe) => (
            <View key={keyGroupe} >
              <View style={styles.title}>
                <ThemedText type="subtitle" style={{ color: Colors.app.color }}>{keyGroupe}</ThemedText>
              </View>
              {menusParametrages[keyGroupe].map((itemParam) => (
                <View key={itemParam.titre} style={styles.menuItem} >
                  <Image source={itemParam.icone} style={styles.icon} />
                  <ThemedText type='default' onPress={() => toggleOpen(itemParam)}>{itemParam.titre}</ThemedText>
                </View>
              ))}
            </View>

          ))
        }
      </View>

      {<Modal presentationStyle='overFullScreen' isVisible={open} 
              animationIn='slideInRight' animationOut='slideOutRight'
              propagateSwipe={true}
              onBackdropPress={() => setOpen(false)}
              style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>          
      {
        (menu !== null && menu !== undefined) && <ParametragesListComponent typeParametrage={menu} closeDrawer={() => setOpen(false)} />
      }

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
    flexDirection: 'row',
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
