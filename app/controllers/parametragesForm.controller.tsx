import { ParametragesVetementEnum, TypeTailleEnum } from "../constants/AppEnum";
import ParamGenericVetementsModel from "../models/params/paramGenericVetements.model";
import ParamVetementsFormModel, { transformFormToParamVetements } from "../models/params/paramVetementsForm.model";



    /**
     * Initialise le formulaire avec les paramètres des vêtements donnés.
     *
     * @param parametreVetements - Un objet contenant les informations des vêtements, 
     * incluant `id`, `libelle`, `categories` et `type`.
     * @param setForm - Une fonction permettant de définir l'état du formulaire avec les données fournies.
     */
    export function initForm(typeParametrage : ParametragesVetementEnum,parametreVetements : ParamGenericVetementsModel, setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>) {
        setForm({
            id          : parametreVetements.id,
            typeParam   : typeParametrage,
            libelle     : parametreVetements.libelle,
            categories  : parametreVetements.categories,
            type        : parametreVetements.type,
            tri         : parametreVetements.tri,
            isModified  : false,
        });
    }


    /**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setLibelleForm(libelle: string, setForm: Function) {
    setForm((form: ParamVetementsFormModel) => {
        return { ...form, isModified: true, libelle: libelle }
    });
}


/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setTypeForm(type: TypeTailleEnum, setForm: Function) {
    setForm((form: ParamVetementsFormModel) => {
        return { ...form, isModified: true, type: type }
    });
}

/**
 * 
 * @param categories : tableau de catégories
 * @param setForm fonction de mise à jour du formulaire
 */
export function setCategoriesForm(categories: string[], setForm: Function) {
    setForm((form: ParamVetementsFormModel) => {
        return { ...form, isModified: true, categories: categories }
    });
}


    /**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
    export function setTriForm(tri: string, setForm: Function) {
        let triInt = parseInt(tri, 10);
        if (isNaN(triInt)) {
            console.error("La valeur de tri n'est pas un nombre valide :", tri);
            triInt = 0; // ou une autre valeur par défaut si nécessaire
        }
        // Vérification que triInt est un nombre valide avant de l'utiliser
        setForm((form: ParamVetementsFormModel) => {
            return { ...form, isModified: true, tri: triInt }
        });
    }



export function cancelForm(form : ParamVetementsFormModel | null, 
                           setEditParametrage: (value: React.SetStateAction<boolean>) => void, 
                           setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>) {
    /*
    TODO : A revoir Modal in modal
    if(form?.isModified) {
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous annuler vos modifications ?'}
            ackModalCallback={() => {
                setEditParametrage(false);
                setForm(null);
            }}
            showModal={Math.random()} />;
        setModalDialog(dialog);
    }
    else{

   
    } */
    setEditParametrage(false);
    setForm(null);
}


/**
 * Valide et enregistre un formulaire de paramètres de vêtements.
 * Si le formulaire a été modifié, il est transformé et enregistré.
 * Sinon, l'édition du formulaire est annulée.
 *
 * @param form - Le modèle du formulaire de paramètres de vêtements ou null.
 * @param setEditParametrage - Fonction pour mettre à jour l'état d'édition du paramétrage.
 * @param setForm - Fonction pour mettre à jour l'état du formulaire.
 */
export function validateForm(form : ParamVetementsFormModel | null, setEditParametrage: (value: React.SetStateAction<boolean>) => void, setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>) {
    console.log("Enregistrement du formulaire", form);
    if(form?.isModified) {
        const paramVetement = transformFormToParamVetements(form, form.typeParam);
        console.log("Enregistrement du paramètre", paramVetement);
    }
    else{
        cancelForm(form, setEditParametrage, setForm);
    }
}