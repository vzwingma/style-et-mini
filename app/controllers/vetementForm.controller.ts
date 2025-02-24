import DressingModel from "../models/dressing.model";
import FormVetementModel from "../models/form.vetements.model";
import ParamTailleVetementsModel from "../models/paramTailleVetements.model";
import ParamTypeVetementsModel from "../models/paramTypeVetements.model";
import ParamUsageVetementsModel from "../models/paramUsageVetements.model";


// Filtre les types de vêtements en fonction de la catégorie du dressing
export function getTypeVetementsForm(typeVetements: ParamTypeVetementsModel[], dressing: DressingModel): ParamTypeVetementsModel[] {
    return typeVetements
        .filter((type) => type.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0);
}

// Filtre les tailles de mesures en fonction de la catégorie du dressing
export function getTaillesMesuresForm(taillesMesures: ParamTailleVetementsModel[], dressing: DressingModel): ParamTailleVetementsModel[] {
    return taillesMesures
        .filter((taille) => taille.categorie === dressing.categorie)
}


// Filtre les usages en fonction de la catégorie du dressing
export function getUsagesForm(usages: ParamUsageVetementsModel[], dressing: DressingModel): ParamUsageVetementsModel[] {
    return usages
        .filter((usage) => usage.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0);
}



/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type 
 * @param setForm 
 */
export function setTypeForm(type: ParamTypeVetementsModel, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return {
            ...form,
            type: type
        }
    });
}

/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param taille 
 * @param setForm 
 */
export function setTailleForm(taille: ParamTailleVetementsModel, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return {
            ...form,
            taille: taille
        }
    });
}

export function setUsages(usage: string[], setForm: Function) {
    setForm((form: FormVetementModel) => {
        return {
            ...form,
            usage: usage
        }
    });
}