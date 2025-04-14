import { showToast, ToastDuration } from "../components/commons/AndroidToast";
import { getUrlAPIParametres, SERVICES_PARAMS } from "../constants/APIconstants";
import { ParametragesVetementEnum, TypeTailleEnum } from "../constants/AppEnum";
import ErrorsFormParametrageModel from "../models/params/form.errors.params.model";
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
export function initForm(typeParametrage: ParametragesVetementEnum, parametreVetements: ParamGenericVetementsModel, setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>) {
    setForm(tranformParamVetementToForm(typeParametrage, parametreVetements));
}


/**
* Enregistre le type de vêtements dans le formulaire
* @param type type de vêtements
* @param setForm  fonction de mise à jour du formulaire
*/
export function setLibelleForm(libelle: string, setForm: React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>, 
                                setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormParametrageModel>>) {
    if(libelle) {
        setErrorsForm((errors: ErrorsFormParametrageModel) => {
            return { ...errors, libelleInError: false }
        })
    };
    setForm((form: ParamVetementsFormModel | null) => {
        if (!form) {
            return null; // Handle the case where form is null
        }
        return { ...form, isModified: true, libelle: libelle };
    });
}


/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setTypeForm(type: { id : TypeTailleEnum, libelle: string}, setForm: Function) {
    setForm((form: ParamVetementsFormModel) => {
        return { ...form, isModified: true, type: type.id }
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



/**
 * Réinitialise le formulaire en cours d'édition et ferme celui-ci.
 *
 * @param setParametreInEdition - Fonction permettant de définir l'identifiant du paramètre en cours d'édition.
 *                                Passez `null` pour indiquer qu'aucun paramètre n'est en cours d'édition.
 *
 * @remarks
 * Cette fonction est destinée à être utilisée pour réinitialiser l'état d'un formulaire
 * et fermer l'interface d'édition associée. Le code commenté suggère une gestion future
 * d'une boîte de dialogue modale pour confirmer l'annulation des modifications en cas
 * de formulaire modifié.
 *
 * @todo Implémenter la gestion d'une boîte de dialogue modale pour confirmer l'annulation
 *       des modifications si le formulaire a été modifié.
 */
export function razAndCloseForm(setParametreInEdition: (idParametreToEdit: string | null) => void) {
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
    setParametreInEdition(null);
}



let errors = false;
/**
 * Valide et enregistre un formulaire de paramètres de vêtements.
 * Si le formulaire a été modifié, il est transformé et enregistré.
 * Sinon, l'édition du formulaire est annulée.
 *
 * @param form - Le modèle du formulaire de paramètres de vêtements ou null.
 * @param setEditParametrage - Fonction pour mettre à jour l'état d'édition du paramétrage.
 * @param setForm - Fonction pour mettre à jour l'état du formulaire.
 */
export function validateForm(form: ParamVetementsFormModel | null,
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormParametrageModel>>,
    setEditParametrage: (idParametreToEdit: string | null) => void,
    refreshListeParametres: (typeParam: ParametragesVetementEnum) => void) {
    console.trace("Enregistrement du formulaire", form);
    if (!form?.isModified) {
        razAndCloseForm(setEditParametrage);
        return;
    }


    console.log("Validation du formulaire", form);
    errors = false;
    if (form === null) {
        console.error("Le formulaire est vide");
        errors = true;
        setErrorsForm((errors: ErrorsFormParametrageModel) => {
            return {
                ...errors, libelleInError: true, typeInError: true, triInError: true, categoriesInError: true
            }
        });
        return;
    }

    validateAttribute("libelle", form.libelle === undefined || form.libelle === "", setErrorsForm);
    validateAttribute("categories", form.categories === undefined || form.categories === null || form.categories.length === 0
        , setErrorsForm);
    if (form.typeParam === ParametragesVetementEnum.TAILLES || form.typeParam === ParametragesVetementEnum.MARQUES || form.typeParam === ParametragesVetementEnum.TYPES) {
        validateAttribute("type", form.type === undefined || form.type === null
            , setErrorsForm);
    };

    if (form.typeParam === ParametragesVetementEnum.TAILLES || form.typeParam === ParametragesVetementEnum.ETATS) {
        validateAttribute("tri", form.tri === null || isNaN(form.tri ? form.tri : NaN)
            , setErrorsForm);
    }
    if (!errors) {
        // Enregistrement du formulaire 
        saveParametresVetement(form)
            .then(() => {
                refreshListeParametres(form.typeParam);
            })
            .catch((e) => {
                console.error("Erreur lors de l'enregistrement du formulaire", e);
            });
    }
}

/**
 * Valide un attribut et met à jour les erreurs du formulaire en conséquence.
 *
 * @param attributeName - Le nom de l'attribut à valider.
 * @param attributeCheckFail - Indique si la validation de l'attribut a échoué (true si échec, false sinon).
 * @param setErrorsForm - Fonction permettant de mettre à jour l'état des erreurs du formulaire.
 * @param errorMessage - Le message d'erreur à associer à l'attribut en cas d'échec de validation.
 */
function validateAttribute(attributeName: string, attributeCheckFail: boolean, 
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormParametrageModel>>) {
    if (attributeCheckFail) {
        errors = true;
        setErrorsForm((errors: ErrorsFormParametrageModel) => {
            return { ...errors, [attributeName + "InError"]: true }
        });
    }
    else {
        setErrorsForm((errors: ErrorsFormParametrageModel) => {
            return { ...errors, [attributeName + "InError"]: false }
        });
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
function saveParametresVetement(form: ParamVetementsFormModel): Promise<ParametragesVetementEnum> {
    return new Promise((resolve, reject) => {

        const paramVetement: ParamGenericVetementsModel = transformFormToParamVetements(form, form.typeParam);

        const isEdition = (paramVetement.id !== null && paramVetement.id !== "" && paramVetement.id !== undefined);
        console.log((isEdition ? "Mise à jour" : "Création") + " du paramètre", form.typeParam, paramVetement);
        let params;
        if (isEdition) {
            params = [{ key: SERVICES_PARAMS.ID_PARAM, value: String(paramVetement.id) }];
        }
        //  Appel au backend pour sauvegarder le vêtement
        callPOSTBackend(getUrlAPIParametres(form), params, paramVetement)
            .then((response) => {
                console.log("Paramètrage ", form.typeParam, " de vêtements enregistrés avec succès", response);
                showToast("Paramètre " + form.typeParam + " enregistré avec succès", ToastDuration.SHORT);
                resolve(form.typeParam);
            })
            .catch((e) => {
                console.error('Une erreur s\'est produite lors de la connexion au backend', e);
                showToast("Erreur d'enregistrement du vêtement : " + e, ToastDuration.LONG);
                reject(e);
            });
    })
}