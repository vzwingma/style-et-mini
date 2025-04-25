
/**
 * Modèle représentant les flags d'erreurs dans le formulaire
 */
interface ErrorsFormCapsuleModel {
    libelleInError  : boolean;
    readonly libelleMessage  : string;

    criteresInError  : boolean;
    readonly criteresMessage  : string;
}

export const defaultErrorsFormCapsuleModel: ErrorsFormCapsuleModel = {
    libelleInError  : false,
    libelleMessage  : "Le libellé est obligatoire",
 
    criteresInError  : false,
    criteresMessage  : "Au moins un critère est obligatoire",
}

export default ErrorsFormCapsuleModel;