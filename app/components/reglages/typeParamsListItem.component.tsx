import { View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";



/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParamListItem = ({ libelle, content }: any) => {

    return (
        <View>
            <ThemedText type="subtitle">{libelle}</ThemedText> 

            <ThemedText type="default">{content}</ThemedText>
        </View>
    );
};
