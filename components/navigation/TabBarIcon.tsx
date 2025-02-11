// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Surcharge de l'icone de la barre de navigation pour être paramétrable
 * @param {any} props Propriétés de l'icone
 * @returns {JSX.Element} Icone de la barre de navigation
 */
export function TabBarIcon({ style, ...rest }: any) {
    return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;  
}




