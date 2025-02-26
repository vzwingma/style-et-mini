import { CategorieDressingEnum as CategorieDressingEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant une taille de vetements
 */
export default interface DressingModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categorie  : CategorieDressingEnum;
}