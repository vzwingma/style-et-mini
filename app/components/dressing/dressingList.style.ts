import { Colors, Fonts } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.app.color,
        padding: 5
    },

    groupeLabel: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.app.color,
        padding: 5,
        margin: 5,
    },
    groupeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
    },
    /** Filtre  */
    filtresBar: {
        alignItems: 'center',
        width: '100%',
        marginTop: 5,
        padding: 0,
        flexDirection: 'row',
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
        marginRight: 5,
    },
    icon: {
        marginRight: 5,
        width: 20,
        height: 20,
        color: 'white',
        tintColor: 'white',
    },
    // Style de la liste déroulante d'un dropdown
    listStyle: {
        backgroundColor: Colors.app.backgroundLight,
    },
    // Style des éléments de la liste déroulante d'un dropdown
    listItemStyle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        margin: 0,
        padding: 3,
        height: 'auto',
        fontFamily: "BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
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
        height: 40,
        fontSize: Fonts.app.size,
        backgroundColor: 'red',
    },
});