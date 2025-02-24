import ParamTypeVetementsModel from "./paramTypeVetements.model";
import ParamTailleVetementsModel from "./paramTailleVetements.model";

/**
 * Modèle représentant un vetement
 */
export default interface DressingVetementModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly type       : ParamTypeVetementsModel;
    readonly taille     : ParamTailleVetementsModel;
}