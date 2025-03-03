import { View } from "react-native";
import { ThemedText } from "../commons/ThemedText";



/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParamListItem = ({ keyItem, libelle }: any) => {

    return (
        <View key={keyItem}>
            <ThemedText type="subtitle">{keyItem}</ThemedText> 
            <ThemedText type="default">{libelle}</ThemedText>
        </View>
    );
};
