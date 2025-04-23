
/**
 * Modèle représentant les flags d'erreurs dans le formulaire
 */
interface ErrorsFormTenueModel {
    libelleInError  : boolean;
    readonly libelleMessage  : string;
}

export const defaultErrorsFormTenueModel: ErrorsFormTenueModel = {
    libelleInError  : false,
    libelleMessage  : "Le libellé de la tenue est obligatoire",
    
}

export default ErrorsFormTenueModel;