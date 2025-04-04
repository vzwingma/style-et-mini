import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, useState } from "react";
import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from "react-native";

if(Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}


type AccordionItemPros = PropsWithChildren<{
    title: string;
    icon?: any;
  }>;



/**
 * Composant `AccordionItem` qui représente un élément d'accordéon.
 * 
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Le contenu à afficher dans le corps de l'accordéon.
 * @param {string} props.title - Le titre affiché dans l'en-tête de l'accordéon.
 * 
 * @returns {JSX.Element} Un élément JSX représentant un élément d'accordéon.
 * 
 * @remarks
 * - Le composant utilise un état local pour gérer l'expansion ou la rétraction de l'accordéon.
 * - Une icône `Ionicons` est utilisée pour indiquer l'état (ouvert/fermé) de l'accordéon.
 */
export default function AccordionItem({ children, title, icon }: AccordionItemPros): JSX.Element {
    const [ expanded, setExpanded ] = useState(false);
  
    function toggleItem() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    }
  
    const body = <View style={styles.accordBody}>{ children }</View>;
  
    return (
      <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
          <Text style={styles.groupeLabel}>{ title }</Text>
          <Image source={icon} style={styles.icon} />
          <Ionicons name={ expanded ? 'chevron-up' : 'chevron-down' }
                size={20} color="#bbb" />
        </TouchableOpacity>
        { expanded && body }
      </View>
    );
  }



  const styles = StyleSheet.create({
    accordContainer: {
      paddingTop: 4,
    },
    accordHeader: {
      backgroundColor: Colors.app.color,
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    groupeLabel: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.app.color,
        padding: 5,
        color: 'white',
    },
    icon: {
      marginTop: 5,
      marginRight: 5,
      width: 20,
      height: 20,
      color: 'white',
      tintColor: 'white',
  },
    accordBody: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textSmall: {
      fontSize: 16
    },
    seperator: {
      height: 12
    }
  });
  