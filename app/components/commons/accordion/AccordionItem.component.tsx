import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { PropsWithChildren, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



type AccordionItemPros = PropsWithChildren<{
    title: string;
    icon?: any;
    toggleAllItems?: boolean;
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
export default function AccordionItem({ children, title, icon, toggleAllItems }: AccordionItemPros): JSX.Element {
    const [ expanded, setExpanded ] = useState(toggleAllItems ?? false);
    
    useEffect(() => {
      if (toggleAllItems !== undefined) {
        setExpanded(toggleAllItems);
      }
    }
    , [ toggleAllItems ]);

    function toggleItem() {
      setExpanded(!expanded);
    }
  
    return (
      <View style={styles.accordContainer}>
        <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
          <View style={styles.accordHeader}>
            <Text style={styles.groupeLabel}>{ title }</Text>
            <Image source={icon} style={[styles.icon, {marginRight: 15}]} />
          </View>
          <Ionicons name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} style={[styles.icon]} />
        </TouchableOpacity>
        { expanded && <View style={styles.accordBody}>{ children }</View> }
      </View>
    );
  }



  const styles = StyleSheet.create({
    accordContainer: {
      paddingTop: 4
    },
    accordHeader: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 35,
      backgroundColor: Colors.app.color,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    groupeLabel: {
      paddingLeft: 15,
      paddingTop: 6,
      color: 'white',
      fontSize: 16,

    },
    icon: {
      marginTop: 5,
      marginRight: 5,
      width: 25,
      height: 25,
      color: 'white',
      tintColor: 'white',
  },
    accordBody: {
      flexDirection: 'row',
      flex: 1,
      flexWrap: 'wrap',
    }
  });
  