import { CategorieDressingEnum, TypeTailleEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant un type de vetements
 */
export default interface ParamTypeVetementsModel {

    readonly id         : string;
    readonly libelle    : string;
    readonly categories : CategorieDressingEnum[];
    readonly typeTaille : TypeTailleEnum
}