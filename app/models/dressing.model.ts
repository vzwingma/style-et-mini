import { CategorieDressingEnum as CategorieDressingEnum } from "@/constants/AppEnum";
import DressingVetementModel from "./dressing.vetements.model";

/**
 * Modèle représentant une taille de vetements
 */
export default interface DressingModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categorie  : CategorieDressingEnum;
    vetements           : DressingVetementModel[];
}