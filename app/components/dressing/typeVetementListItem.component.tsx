import TypeVetementsModel from "@/app/models/typeVetements.model";
import { View } from "react-native";
import { ThemedText } from "../commons/ThemedText";


// Définition des propriétés d'un équipement Domoticz
export type TypeVetementListItemProps = {
    typeVetements: TypeVetementsModel;
};



/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const TypeVetementListItem = ({ typeVetements }: TypeVetementListItemProps) => {

    return (
        <View key={typeVetements.id}>
            <ThemedText type="subtitle">{typeVetements.libelle}</ThemedText> 
        </View>
    );
};

