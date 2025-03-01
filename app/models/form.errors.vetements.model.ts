
/**
 * Modèle représentant les flags d'erreurs dans le formulaire
 */
interface ErrorsFormVetementModel {
    libelleInError  : boolean;
    libelleMessage  : string | null;

    typeInError  : boolean;
    typeMessage  : string | null;

    tailleInError  : boolean;
    tailleMessage  : string | null;

    usageInError  : boolean;
    usageMessage  : string | null;
}

export const defaultErrorsFormVetementModel: ErrorsFormVetementModel = {
    libelleInError: false,
    libelleMessage: null,
    typeInError: false,
    typeMessage: null,
    tailleInError: false,
    tailleMessage: null,
    usageInError: false,
    usageMessage: null
}

export default ErrorsFormVetementModel;