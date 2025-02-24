import ParamTypeVetementsModel from "./paramTypeVetements.model";
import ParamTailleVetementsModel from "./paramTailleVetements.model";
import ParamUsageVetementsModel from "./paramUsageVetements.model";

/**
 * Modèle représentant un vetement dans le formulaire
 */
export default interface FormVetementModel {
    id         : string;
    libelle    : string;
    type       : ParamTypeVetementsModel;
    taille     : ParamTailleVetementsModel;
    usage      : string[];
    couleur    : string;
    description: string;
}