
/**
 * Modèle représentant les flags d'erreurs dans le formulaire
 */
interface ErrorsFormVetementModel {
    libelleInError  : boolean;
    readonly libelleMessage  : string;

    typeInError  : boolean;
    readonly typeMessage  : string;

    tailleInError  : boolean;
    readonly tailleMessage  : string;

    usageInError  : boolean;
    readonly usageMessage  : string;

    marqueInError  : boolean;
    readonly marqueMessage  : string;

    etatInError  : boolean;
    readonly etatMessage  : string; 
    
    prixNeufInError  : boolean;
    readonly prixNeufMessage  : string;

    prixAchatInError  : boolean;
    readonly prixAchatMessage  : string;
}

export const defaultErrorsFormVetementModel: ErrorsFormVetementModel = {
    libelleInError  : false,
    libelleMessage  : "Le libellé du vêtement est obligatoire",
    
    typeInError     : false,
    typeMessage     : "Le type de vêtement est obligatoire",
    
    tailleInError   : false,
    tailleMessage   : "La taille du vêtement est obligatoire",
    
    usageInError    : false,
    usageMessage    : "Au moins un usage est obligatoire",

    marqueInError   : false,
    marqueMessage   : "La marque est obligatoire",

    etatInError     : false,
    etatMessage     : "L'état du vêtement est obligatoire",

    prixNeufInError : false,
    prixNeufMessage : "Le prix doit être un nombre",

    prixAchatInError: false,
    prixAchatMessage: "Le prix doit être un nombre"
}

export default ErrorsFormVetementModel;