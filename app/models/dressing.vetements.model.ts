import { DressingType } from "@/constants/AppEnum";
import ParamTypeVetementsModel from "./paramTypeVetements.model";
import ParamTailleVetementsModel from "./paramTailleVetements.model";

/**
 * Modèle représentant un vetement
 */
export default interface DressingVetementModel {
    readonly _id: string;
    readonly libelle: string;
    readonly taille: ParamTailleVetementsModel;
    readonly type: ParamTypeVetementsModel;
}