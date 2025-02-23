import TypeVetementsModel from "@/app/models/typeVetements.model";
import { View } from "react-native";
import { ThemedText } from "../commons/ThemedText";
import TailleVetementsModel from "@/app/models/tailleVetements.model";


// Définition des propriétés du composant
export type TypeVetementListItemProps = {
    typeVetements: TypeVetementsModel;
};

export type TailleVetementListItemProps = {
    tailleVetements: TailleVetementsModel;
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
