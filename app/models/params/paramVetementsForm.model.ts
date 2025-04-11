import { CategorieDressingEnum, ParametragesVetementEnum, TypeTailleEnum } from "@/app/constants/AppEnum";
import ParamGenericVetementsModel from "./paramGenericVetements.model";

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
export function transformFormToParamVetements(form: ParamVetementsFormModel, typeParametrage: ParametragesVetementEnum) : ParamGenericVetementsModel {

    // recopie des éléments communs
    let parametreVetements = {
        id         : form.id,
        libelle    : form.libelle,
        categories : form.categories,
    } as ParamGenericVetementsModel;
    
    // Complétion des éléments spécifiques au type de paramétrage
    switch (typeParametrage) {
        case ParametragesVetementEnum.TAILLES:
            parametreVetements = { ...parametreVetements, type: form.type, tri: form.tri };
            break;
        case ParametragesVetementEnum.TYPES:
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

/**
 * Transforme un objet de type `ParamGenericVetementsModel` en un objet de type `ParamVetementsFormModel`.
 *
 * @param typeParametrage - Le type de paramétrage associé, de type `ParametragesVetementEnum`.
 * @param parametreVetements - L'objet contenant les paramètres génériques des vêtements, de type `ParamGenericVetementsModel`.
 * @returns Un objet de type `ParamVetementsFormModel` contenant les informations transformées.
 */
export function tranformParamVetementToForm(typeParametrage : ParametragesVetementEnum, parametreVetements: ParamGenericVetementsModel) {
    return {
        id          : parametreVetements.id,
        typeParam   : typeParametrage,
        libelle     : parametreVetements.libelle,
        categories  : parametreVetements.categories,
        type        : parametreVetements.type,
        tri         : parametreVetements.tri,
        isModified  : false,
    } as ParamVetementsFormModel;
}


export default ParamVetementsFormModel;