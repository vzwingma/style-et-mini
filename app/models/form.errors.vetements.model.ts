
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

    etatInError  : boolean;
    etatMessage  : string | null;    
}

export const defaultErrorsFormVetementModel: ErrorsFormVetementModel = {
    libelleInError  : false,
    libelleMessage  : null,
    typeInError     : false,
    typeMessage     : null,
    tailleInError   : false,
    tailleMessage   : null,
    usageInError    : false,
    usageMessage    : null,
    etatInError     : false,
    etatMessage     : null
}

export default ErrorsFormVetementModel;