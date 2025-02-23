import ParamTypeVetementsModel from "@/app/models/paramTypeVetements.model";
import { View } from "react-native";
import { ThemedText } from "../commons/ThemedText";
import ParamTailleVetementsModel from "@/app/models/paramTailleVetements.model";


// Définition des propriétés du composant
export type TypeVetementListItemProps = {
    typeVetements: ParamTypeVetementsModel;
};

export type TailleVetementListItemProps = {
    tailleVetements: ParamTailleVetementsModel;
};


/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const TypeVetementListItem = ({ typeVetements }: TypeVetementListItemProps) => {

    return (
        <View key={typeVetements._id}>
            <ThemedText type="subtitle">{typeVetements._id} - {typeVetements.libelle}</ThemedText> 
        </View>
    );
};


/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const TailleVetementListItem = ({ tailleVetements }: TailleVetementListItemProps) => {

    return (
        <View key={tailleVetements._id}>
            <ThemedText type="subtitle">{tailleVetements._id} - {tailleVetements.libelle}</ThemedText> 
        </View>
    );
};
