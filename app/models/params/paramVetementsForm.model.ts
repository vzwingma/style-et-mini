import { CategorieDressingEnum, ParametragesVetementEnum, TypeTailleEnum } from "@/app/constants/AppEnum";

/**
 * Modèle représentant un type générique de param de vetements
 */
interface ParamVetementsFormModel {
    readonly id         : string;
    readonly typeParam  : ParametragesVetementEnum;
    libelle             : string;
    categories          : CategorieDressingEnum[];
    type?               : TypeTailleEnum; 
    tri?                : number;
    isModified          : boolean;

}



/**
 * Transforme un formulaire de type `ParamVetementsFormModel` en un objet paramétré
 * en fonction du type de paramétrage spécifié.
 *
 * @param form - Le modèle de formulaire contenant les données à transformer.
 * @param typeParametrage - Le type de paramétrage à appliquer, basé sur l'énumération `ParametragesVetementEnum`.
 * 
 * @returns Un objet `ParamVetementsFormModel` contenant les données transformées
 * selon le type de paramétrage.
 *
 * @remarks
 * - Les éléments communs (id, libelle, categories) sont copiés directement depuis le formulaire.
 * - Les éléments spécifiques sont ajoutés en fonction de la valeur de `typeParametrage` :
 *   - Pour `TYPE`, `TAILLES`, et `MARQUES`, la propriété `type` est ajoutée.
 *   - Pour `ETATS`, la propriété `tri` est ajoutée.
 * - Si le type de paramétrage ne correspond à aucun cas, aucun élément spécifique n'est ajouté.
 */
export function transformFormToParamVetements(form: ParamVetementsFormModel, typeParametrage: ParametragesVetementEnum) {

    // recopie des éléments communs
    let parametreVetements = {
        id         : form.id,
        libelle    : form.libelle,
        categories : form.categories,
    } as ParamVetementsFormModel;
    
    // Complétion des éléments spécifiques au type de paramétrage
    switch (typeParametrage) {
        case ParametragesVetementEnum.TYPE:
        case ParametragesVetementEnum.TAILLES:
        case ParametragesVetementEnum.MARQUES:
            parametreVetements = { ...parametreVetements, type: form.type };
            break;
        case ParametragesVetementEnum.ETATS:
            parametreVetements = { ...parametreVetements, tri: form.tri };
        default:
            break;
    }
    return parametreVetements;
}

export default ParamVetementsFormModel;