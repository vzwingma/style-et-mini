import { TypeTailleEnum } from "../constants/AppEnum";
import ParamGenericVetementsModel from "../models/params/paramGenericVetements.model";
import ParamVetementsFormModel from "../models/params/paramVetementsForm.model";



    /**
     * Initialise le formulaire avec les paramètres des vêtements donnés.
     *
     * @param parametreVetements - Un objet contenant les informations des vêtements, 
     * incluant `id`, `libelle`, `categories` et `type`.
     * @param setForm - Une fonction permettant de définir l'état du formulaire avec les données fournies.
     */
    export function initForm(parametreVetements : ParamGenericVetementsModel, setForm: Function) {
        console.log("initForm", parametreVetements);
        setForm({
            id          : parametreVetements.id,
            libelle     : parametreVetements.libelle,
            categories  : parametreVetements.categories,
            type        : parametreVetements.type,
        });
    }


    /**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setLibelleForm(libelle: string, setForm: Function) {
    setForm((form: ParamVetementsFormModel) => {
        return { ...form, type: libelle }
    });
}


/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setTypeForm(type: TypeTailleEnum, setForm: Function) {
    setForm((form: ParamVetementsFormModel) => {
        return { ...form, type: type }
    });
}

/**
 * 
 * @param categories : tableau de catégories
 * @param setForm fonction de mise à jour du formulaire
 */
export function setCategoriesForm(categories: string[], setForm: Function) {
    setForm((form: ParamVetementsFormModel) => {
        return { ...form, categories: categories }
    });
}