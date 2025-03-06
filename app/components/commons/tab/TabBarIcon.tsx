// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { CategorieDressingEnum } from '@/constants/AppEnum';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Surcharge de l'icone de la barre de navigation pour être paramétrable
 * @param {any} props Propriétés de l'icone
 * @returns {JSX.Element} Icone de la barre de navigation
 */
export function TabBarIcon({ style, ...rest }: any) {
    return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;  
}




/**
 * Retourne l'icône de l'onglet sélectionné
 * @param tab nom de l'onglet
 * @returns l'icône de l'onglet sélectionné
 */
export function getTabIcon(selectedTab : boolean, dressingCat? : CategorieDressingEnum): any {
  if(CategorieDressingEnum.ADULTE === dressingCat){
    if(selectedTab){
      return require('@/assets/icons/dress.png');
    }
    else{
      return require('@/assets/icons/dress-outline.png');
    }
  }
  else{
    if(selectedTab){
      return require('@/assets/icons/baby-clothing.png');
    }
    else{
      return require('@/assets/icons/baby-clothing-outline.png');
    }
  }
  }
