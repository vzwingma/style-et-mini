import { CategorieDressingEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant un type d'usage de vetements
 */
export default interface ParamUsageVetementsModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categories : CategorieDressingEnum[];
}