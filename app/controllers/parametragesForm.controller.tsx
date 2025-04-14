import { showToast, ToastDuration } from "../components/commons/AndroidToast";
import { getUrlAPIParametres, SERVICES_PARAMS, SERVICES_URL } from "../constants/APIconstants";
import { ParametragesVetementEnum, TypeTailleEnum } from "../constants/AppEnum";
import ParamGenericVetementsModel from "../models/params/paramGenericVetements.model";
import ParamVetementsFormModel, { tranformParamVetementToForm, transformFormToParamVetements } from "../models/params/paramVetementsForm.model";
import { callPOSTBackend } from "../services/ClientHTTP.service";



    /**
     * Initialise le formulaire avec les paramètres des vêtements donnés.
     *
     * @param parametreVetements - Un objet contenant les informations des vêtements, 
     * incluant `id`, `libelle`, `categories` et `type`.
     * @param setForm - Une fonction permettant de définir l'état du formulaire avec les données fournies.
     */
    export function initForm(typeParametrage : ParametragesVetementEnum ,parametreVetements : ParamGenericVetementsModel, setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>) {
        setForm(tranformParamVetementToForm(typeParametrage, parametreVetements));
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



export function razAndCloseForm(form : ParamVetementsFormModel | null, 
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
export function validateForm(form : ParamVetementsFormModel | null, 
                             setEditParametrage: (value: React.SetStateAction<boolean>) => void, 
                             setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>) {
    console.trace("Enregistrement du formulaire", form);
    if(form?.isModified) {
        saveParametresVetement(form, setEditParametrage, setForm);
    }
    else{
        razAndCloseForm(form, setEditParametrage, setForm);
    }
}



/**
 * Enregistre les paramètres d'un vêtement en appelant le backend.
 *
 * @param form - Le modèle de formulaire contenant les paramètres du vêtement à enregistrer.
 * @param setEditParametrage - Fonction permettant de mettre à jour l'état d'édition du paramétrage.
 * @param setForm - Fonction permettant de réinitialiser ou de mettre à jour le formulaire.
 *
 * Cette fonction transforme le formulaire en un modèle générique de paramètres de vêtements,
 * puis détermine s'il s'agit d'une création ou d'une mise à jour. Elle effectue un appel POST
 * au backend pour sauvegarder les données. En cas de succès, un message de confirmation est affiché
 * et le formulaire est réinitialisé. En cas d'erreur, un message d'erreur est affiché.
 */
function saveParametresVetement(form : ParamVetementsFormModel, 
                                setEditParametrage: (value: React.SetStateAction<boolean>) => void, 
                                setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>) {
    
    const paramVetement : ParamGenericVetementsModel = transformFormToParamVetements(form, form.typeParam);

    const isEdition = (paramVetement.id !== null && paramVetement.id !== "" && paramVetement.id !== undefined);
    console.log((isEdition ? "Mise à jour" : "Création") + " du paramètre", form.typeParam, paramVetement);

    let params = [
        { key: SERVICES_PARAMS.ID_PARAM, value: String(form.id) },
    ];

    //  Appel au backend pour sauvegarder le vêtement
    callPOSTBackend(getUrlAPIParametres(form), params, paramVetement)
        .then((response) => {
            console.log("Paramètrage ", response, " de vêtements enregistrés avec succès", response);
            showToast("Paramètre "+ form.typeParam+" enregistré avec succès", ToastDuration.SHORT);
            razAndCloseForm(form, setEditParametrage, setForm);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur d'enregistrement du vêtement : " + e, ToastDuration.LONG);
            return false;
        });
}