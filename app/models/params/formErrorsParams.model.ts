
/**
 * Modèle représentant les flags d'erreurs dans le formulaire
 */
interface ErrorsFormParametrageModel {
    libelleInError  : boolean;
    readonly libelleMessage  : string;

    categoriesInError  : boolean;
    readonly categoriesMessage  : string;

    typesInError  : boolean;
    readonly typesMessage  : string;

    triInError  : boolean;
    readonly triMessage  : string;
}

export const defaultErrorsFormParametrageModel: ErrorsFormParametrageModel = {
    libelleInError  : false,
    libelleMessage  : "Le libellé du paramètre est obligatoire",
    
    categoriesInError : false,
    categoriesMessage : "Au moins une catégorie est obligatoire",
    
    typesInError     : false,
    typesMessage     : "Au moins un type est obligatoire",
    
    triInError   : false,
    triMessage   : "L'ordre du paramètre est obligatoire et doit être au format numérique",
}

export default ErrorsFormParametrageModel;