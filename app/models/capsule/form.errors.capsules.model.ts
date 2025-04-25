
/**
 * Modèle représentant les flags d'erreurs dans le formulaire
 */
interface ErrorsFormCapsuleModel {
    libelleInError  : boolean;
    readonly libelleMessage  : string;

    criteresInError  : boolean;
    readonly criteresMessage  : string;

    nbVetementsInError  : boolean;
    readonly nbVetementsMessage  : string;
}

export const defaultErrorsFormCapsuleModel: ErrorsFormCapsuleModel = {
    libelleInError  : false,
    libelleMessage  : "Le libellé est obligatoire",
 
    criteresInError  : false,
    criteresMessage  : "Au moins un critère est obligatoire",

    nbVetementsInError  : false,
    nbVetementsMessage  : "Le nombre de vêtements est obligatoire",
}

export default ErrorsFormCapsuleModel;