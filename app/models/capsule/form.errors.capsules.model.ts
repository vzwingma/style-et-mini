
/**
 * Modèle représentant les flags d'erreurs dans le formulaire
 */
interface ErrorsFormCapsuleModel {
    libelleInError  : boolean;
    readonly libelleMessage  : string;
}

export const defaultErrorsFormCapsuleModel: ErrorsFormCapsuleModel = {
    libelleInError  : false,
    libelleMessage  : "Le libellé de la capsule est obligatoire",
    
}

export default ErrorsFormCapsuleModel;