import VetementModel from "./vetements.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface APIResultVetementModel {
    readonly idVetement : string;
    vetement?           : VetementModel;
    readonly created?   : boolean;
    updated?            : boolean;
    archived?           : boolean;
    readonly deleted?   : boolean;
}
export default APIResultVetementModel;