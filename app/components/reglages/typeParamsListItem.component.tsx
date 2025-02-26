import { View } from "react-native";
import { ThemedText } from "../commons/ThemedText";



/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParamListItem = ({ key, libelle }: any) => {

    return (
        <View key={key}>
            <ThemedText type="subtitle">{key}</ThemedText> 
            <ThemedText type="default">{libelle}</ThemedText>
        </View>
    );
};
