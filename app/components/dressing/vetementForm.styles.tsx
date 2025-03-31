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
    body: {
        width: '100%',
        backgroundColor: Colors.app.background
    },
    // Formulaire
    form: {
        padding: 10,
        margin: 0,
        backgroundColor: Colors.app.backgroundLight
    },
    photo: {
        backgroundColor: Colors.app.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10,
        cursor: 'pointer',
        margin: 10,
    },
    // Label de formulaire
    label: {
        width: 100,
        marginTop: 15,
        marginBottom: 5
    },
    // Champ de formulaire
    inputError: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: 'red',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        color: Colors.dark.text,
        flex: 3,
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        color: Colors.dark.text,
        flex: 3,
        fontSize: Fonts.app.size,
    },
    // Dropdown de sélection
    dropdown: {
        marginTop: 5,
        marginBottom: 5,
        flex: 3,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%',
    },
    dropdownInError: {
        marginTop: 5,
        marginBottom: 5,
        flex: 3,
        padding: 10,
        borderColor: 'red',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%'
    },
    filtre: {
        flex: 1,
        marginTop: 5,
        padding: 0,
        backgroundColor: Colors.app.backgroundLight,
    },
    icon: {
        marginRight: 5,
        width: 20,
        height: 20,
        tintColor: 'white',
    },
    iconSmall: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        tintColor: Colors.app.color,
        width: 40,
        height: 40,
        borderColor: Colors.app.color,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.app.backgroundLight,
    },
    iconBig: {
        tintColor: 'gray',
        width: 240,
        height: 240,
        backgroundColor: Colors.app.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10,
        cursor: 'pointer',
        margin: 10,
    },


    // Style de la liste déroulante d'un dropdown
    listStyle: {
        backgroundColor: Colors.app.backgroundLight,
    },
    // Style des éléments de la liste déroulante d'un dropdown
    listItemStyle: {
        margin: 0,
        padding: 0,
        height: 'auto',
        color: Colors.dark.text,
        fontFamily: "BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
        fontSize: Fonts.app.size,
    },
    placeholderStyle: {
        fontSize: Fonts.app.size,
        fontWeight: 'normal',
        color: 'gray',
    },
    placeholderErrorStyle: {
        fontSize: Fonts.app.size,
        color: 'red',
    },
    // Items sélectionnés dans un dropdown multi-sélection
    selectedStyle: {
        borderColor: Colors.app.color,
        borderWidth: 2,
        borderRadius: 8,
        margin: 1,
        paddingLeft: 10,
        marginTop: 5,
        marginRight: 5,
        padding: 1,
        cursor: 'pointer',
    },
    selectedTextStyle: {
        fontSize: Fonts.app.size,
        color: Colors.dark.text
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    iconMenuStyle: {
        width: 26,
        height: 26,
        tintColor: 'white',
        marginLeft: 15,
    },
    iconItemStyle: {
        width: 30,
        height: 30,
        tintColor: 'white',
        margin: 10
    },
    inputSearchStyle: {
        height: 40,
        fontSize: Fonts.app.size,
        backgroundColor: 'red',
    },
});
