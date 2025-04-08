import { Colors, Fonts } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    titleIcon: {
        color: Colors.dark.text, 
        borderColor: Colors.app.color, 
        borderWidth: 2, 
        borderRadius: 20
    },
    groupeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    /** Filtre  */
    filtresBar: {
        alignItems: 'center',
        marginTop: 3,
        padding: 0,
        justifyContent: 'center',
    },    
    // Dropdown de sélection
    dropdown: {
        padding: 8,
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 8,
        alignItems: 'flex-start',
        cursor: 'pointer',
        marginRight: 5
    },
    icon: {
        marginRight: 5,
        width: 20,
        height: 20,
        color: 'white',
        tintColor: 'white',
    },
    // Style de la liste déroulante des filtres
    listStyle: {
        backgroundColor: Colors.app.backgroundLight,
    },
    // Style des éléments de la liste déroulante des filtres
    listItemStyle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        margin: 0,
        padding: 3,
        height: 'auto',
        fontFamily: "BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
    },
    listTypeStyle: {
        borderBottomColor: Colors.app.color, borderBottomWidth: 1,
        borderTopColor: Colors.app.color, borderTopWidth: 1,
        marginTop: 10,
    },
    placeholderStyle: {
        fontWeight: 'light',
        color: 'gray',
    },
    // Items sélectionnés dans le dropdown filtre
    selectedStyle: {
        borderColor: Colors.app.color,
        borderWidth: 1,
        borderRadius: 8,
        padding: 1,
        margin: 2,
        cursor: 'pointer',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    selectedTextStyle: {
        fontSize: Fonts.app.size,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        fontSize: Fonts.app.size,
        color: Colors.dark.text,
    },
});