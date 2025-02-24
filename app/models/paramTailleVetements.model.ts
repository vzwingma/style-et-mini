import { CategorieDressingEnum, TypeTailleEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant une taille de vetements
 */
export default interface ParamTailleVetementsModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categorie  : CategorieDressingEnum;
    readonly type       : TypeTailleEnum;
}