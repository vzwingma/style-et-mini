import VetementModel from "./vetements.model";

/**
 * Modèle représentant un résultat d'appel avec le backend
 */
interface APIResultFormVetementModel {
    readonly id         : string;
    vetement?           : VetementModel;
    readonly created?   : boolean;
    updated?            : boolean;
    archived?           : boolean;
    readonly deleted?   : boolean;
}
export default APIResultFormVetementModel;