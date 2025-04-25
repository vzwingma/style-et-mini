import { CaracteristiqueVetementEnum, StatutVetementEnum } from "../../constants/AppEnum";
import { callDELETEBackend, callPOSTBackend } from "../../services/ClientHTTP.service";
import { SERVICES_PARAMS, SERVICES_URL } from "../../constants/APIconstants";
import { showToast, ToastDuration } from "../../components/commons/AndroidToast";
import DressingModel from "@/app/models/dressing.model";
import CapsuleTemporelleModel from "@/app/models/capsule/capsuleTemporelle.model";
import FormCapsuleModel, { transformCapsuleToFormModel, transformFormToCapsuleModel } from "@/app/models/capsule/form.capsule.model";
import ErrorsFormCapsuleModel from "@/app/models/capsule/form.errors.capsules.model";
import APIResultFormCapsuleModel from "@/app/models/capsule/form.result.capsule.model";
import { validateAttribute } from "../dressing/vetementForm.actions.controller";
import CapsuleCritereModel from "@/app/models/capsule/capsuleCritere";


export function initForm(dressing: DressingModel, capsuleInEdition: CapsuleTemporelleModel | null,
    setForm: Function) {

    if (capsuleInEdition !== null && capsuleInEdition !== undefined) {
        setForm((form: FormCapsuleModel) => transformCapsuleToFormModel(form, capsuleInEdition, dressing));
    }
    else {
        setForm(() => { 
            return {dressing: dressing, 
                    criteres: [ {
                                    id: StatutVetementEnum.ACTIF, 
                                    libelle: StatutVetementEnum.ACTIF, 
                                    type: CaracteristiqueVetementEnum.STATUT, 
                                    typeLibelle: CaracteristiqueVetementEnum.STATUT+StatutVetementEnum.ACTIF
                                }],
                    statut: StatutVetementEnum.ACTIF }});
    }
}


/**
 * Met à jour le libellé du formulaire.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function setLibelleForm(libelle: string, setForm: React.Dispatch<React.SetStateAction<FormCapsuleModel>>, setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormCapsuleModel>>) {
    setForm((form: FormCapsuleModel) => {
        return { ...form, libelle: libelle }
    });
    if (libelle) {
        setErrorsForm((errors: ErrorsFormCapsuleModel) => {
            return { ...errors, libelleInError: false }
        });
    }
}

/**
 * Met à jour le libellé du formulaire.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function setCriteres(criteres: CapsuleCritereModel[], setForm: React.Dispatch<React.SetStateAction<FormCapsuleModel>>, setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormCapsuleModel>>) {

    setForm((form: FormCapsuleModel) => {
        return { ...form, criteres: criteres }
    }); 
    if (criteres && criteres.length > 0) {
        setErrorsForm((errors: ErrorsFormCapsuleModel) => {
            return { ...errors, criteresInError: false }
        });
    }
}


/**
 * Met à jour le nombre de vêtements dans le formulaire et réinitialise les erreurs associées.
 *
 * @param nbVetements - Une chaîne de caractères représentant le nombre de vêtements. Si la valeur n'est pas un nombre valide ou est inférieure à 0, elle sera remplacée par 0.
 * @param setForm - Fonction de mise à jour de l'état du formulaire (`React.Dispatch<React.SetStateAction<FormCapsuleModel>>`).
 * @param setErrorsForm - Fonction de mise à jour de l'état des erreurs du formulaire (`React.Dispatch<React.SetStateAction<ErrorsFormCapsuleModel>>`).
 */
export function setNbVetementsForm(nbVetements: string, setForm: React.Dispatch<React.SetStateAction<FormCapsuleModel>>, setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormCapsuleModel>>) {
    
    let nbVetementsInt = parseInt(nbVetements, 10);
    if (isNaN(nbVetementsInt) || nbVetementsInt < 0) {
        nbVetementsInt = 0
    }
    // Vérification que triInt est un nombre valide avant de l'utiliser
    setForm((form: FormCapsuleModel) => {
        return { ...form, nbreVetements: nbVetementsInt }
    });
    setErrorsForm((errors: ErrorsFormCapsuleModel) => {
        return { ...errors, nbVetementsInError: false }
    });
}


let errors = false;
/**
 * Validation du formulaire
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
export function validateForm(
    form: FormCapsuleModel | null,
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormCapsuleModel>>,
    validateFormCallBack: (resultat: APIResultFormCapsuleModel) => void) {

    console.log("Validation du formulaire", form);
    errors = false;
    if (form === null) {
        console.error("Le formulaire est vide");
        errors = true;
        setErrorsForm((errors: ErrorsFormCapsuleModel) => {
            return {
                ...errors, libelleInError: true, criteresInError: true
            }
        });
        return;
    }

    // Validation du formulaire
    errors = validateAttribute("libelle", form.libelle === undefined || form.libelle === "", setErrorsForm, errors);
    errors = validateAttribute("criteres", form.criteres === undefined || form.criteres.length === 0, setErrorsForm, errors);
    errors = validateAttribute("nbreVetements", form.nbreVetements === undefined || isNaN(form.nbreVetements), setErrorsForm, errors);

    if (!errors) {
        console.log("Formulaire valide", form);
        // Enregistrement du formulaire 
        callSaveCapsuleService(form)
            .then((resultat) => {
                console.log("Capsule enregistrée avec succès", resultat);
                validateFormCallBack(resultat);
            })
            .catch((e) => {
                console.error('Une erreur s\'est produite lors de la connexion au backend', e);
                showToast("Erreur d'enregistrement de la capsule : " + e, ToastDuration.LONG);
                return false;
            });
    }
}


/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
function callSaveCapsuleService(form: FormCapsuleModel) : Promise<APIResultFormCapsuleModel>{
    // Enregistrement du formulaire 
    const capsule: CapsuleTemporelleModel = transformFormToCapsuleModel(form);
    const isEdition = (capsule.id !== null && capsule.id !== "" && capsule.id !== undefined);
    console.log((isEdition ? "Mise à jour" : "Création") + " de la capsule", capsule);

    const params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_CAPSULE, value: String(form.id) }
    ];
    const url = isEdition ? SERVICES_URL.SERVICE_CAPSULES_BY_ID : SERVICES_URL.SERVICE_CAPSULES;
    //  Appel au backend pour sauvegarder la capsule
    return callPOSTBackend(url, params, capsule)
}


/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
export function deleteForm(form: FormCapsuleModel,
    validateFormCallBack: (resultDelete: APIResultFormCapsuleModel) => void) {
    console.log("Suppression de la capsule", form.id);

    let params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_CAPSULE, value: String(form.id) }
    ];

    //  Appel au backend pour supprimer le vêtement
    callDELETEBackend(SERVICES_URL.SERVICE_CAPSULES_BY_ID, params)
        .then((resultDeleteCapsule: APIResultFormCapsuleModel) => {
            console.log("Capsule supprimé avec succès", resultDeleteCapsule);
            validateFormCallBack(resultDeleteCapsule);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur : " + e, ToastDuration.LONG);
            return false;
        }); 
}
