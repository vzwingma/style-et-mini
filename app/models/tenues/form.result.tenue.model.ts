import TenueModel from "./tenue.model";

/**
 * Modèle représentant un résultat d'appel avec le backend
 */
interface APIResultFormTenueModel {
    readonly id : string;
    tenue?              : TenueModel;
    readonly created?   : boolean;
    updated?            : boolean;
    archived?           : boolean;
    readonly deleted?   : boolean;
}
export default APIResultFormTenueModel;