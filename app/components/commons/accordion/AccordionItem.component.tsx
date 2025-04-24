import { Colors } from "@/app/constants/Colors";
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
          <View style={styles.accordHeaderTitre}>
            <Text style={styles.groupeLabel}>{ title }</Text>
            <Image source={icon} style={[styles.icon, {marginRight: 15}]} />
          </View>
          <Ionicons name={ expanded ? 'chevron-up' : 'chevron-down' } size={20} style={[styles.icon]} />
        </TouchableOpacity>
        { expanded && <View style={styles.accordBody}>{ children }</View> }
      </View>
    );
  }



  export const styles = StyleSheet.create({
    accordContainer: {
      borderColor: Colors.app.background,
      borderWidth: 1,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 8,
      marginBottom: 2,
    },
    accordHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.app.color,
      borderTopLeftRadius: 8,
      borderBottomRightRadius: 8,
    },
    accordHeaderTitre: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.app.color,
      borderTopLeftRadius: 8,
      padding: 2,
    },
    groupeLabel: {
      paddingLeft: 10,
      paddingTop: 5,
      color: 'white',
      fontSize: 16,
    },
    icon: {
      margin: 5,
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
  