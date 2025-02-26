import DressingModel from "./dressing.model";
import VetementCaracteristiquesModel from "./vetementCaracteristique.model";

/**
 * Modèle représentant un vetement avec le backend
 */
export default interface VetementModel {
    readonly id         : string;
    dressing            : DressingModel;
    readonly libelle    : string;
    readonly type       : VetementCaracteristiquesModel;
    readonly taille     : VetementCaracteristiquesModel;
    readonly usages     : VetementCaracteristiquesModel[];
    readonly couleurs   : string[];
    readonly image?     : string;
    readonly description: string;
}