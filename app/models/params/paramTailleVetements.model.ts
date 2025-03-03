import { CategorieDressingEnum, TypeTailleEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant une taille de vetements
 */
interface ParamTailleVetementsModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categorie  : CategorieDressingEnum;
    readonly tri        : number;
    readonly type       : TypeTailleEnum;
}
export default ParamTailleVetementsModel;