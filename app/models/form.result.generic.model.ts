
/**
 * Modèle représentant un résultat d'appel avec le backend
 */
interface APIResultFormModel {
    readonly id : string;
    readonly created?   : boolean;
    updated?            : boolean;
    archived?           : boolean;
    readonly deleted?   : boolean;
}
export default APIResultFormModel;