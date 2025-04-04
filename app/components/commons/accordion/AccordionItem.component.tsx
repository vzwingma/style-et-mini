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
    const [ expanded, setExpanded ] = useState(toggleAllItems || false);
    
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
            <Image source={icon} style={styles.icon} />
          </View>
          <Ionicons name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} color="#bbb" />
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
      backgroundColor: Colors.app.color,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 25
    },
    groupeLabel: {
      paddingLeft: 5,
      paddingTop: 2,
      color: 'white',
    },
    icon: {
      marginTop: 2,
      marginRight: 5,
      width: 20,
      height: 20,
      color: 'white',
      tintColor: 'white',
  },
    accordBody: {
      flexDirection: 'row',
      flex: 1,
      flexWrap: 'wrap',
    }
  });
  