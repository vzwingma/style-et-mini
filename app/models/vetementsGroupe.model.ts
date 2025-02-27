import VetementCaracteristiquesModel from "./vetementCaracteristique.model";
import VetementModel from "./vetements.model";

/**
 * Modèle représentant un groupe de vetements avec le backend
 */
export default interface VetementGroupeModel {
    readonly type       : VetementCaracteristiquesModel;
    readonly vetements? : VetementModel[];
}