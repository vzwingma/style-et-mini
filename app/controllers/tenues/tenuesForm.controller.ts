import { StatutVetementEnum } from "../../constants/AppEnum";
import FormTenueModel, { transformFormToTenueModel, transformTenueToFormModel } from "../../models/tenues/form.tenue.model";
import ErrorsFormTenueModel from "../../models/tenues/form.errors.tenues.model";
import { callDELETEBackend, callPOSTBackend } from "../../services/ClientHTTP.service";
import TenueModel from "../../models/tenues/tenue.model";
import { SERVICES_PARAMS, SERVICES_URL } from "../../constants/APIconstants";
import { showToast, ToastDuration } from "../../components/commons/AndroidToast";
import DressingModel from "@/app/models/dressing.model";
import APIResultFormTenueModel from "@/app/models/tenues/form.result.tenue.model";
import VetementModel from "@/app/models/vetements/vetements.model";
import { validateAttribute } from "../dressing/vetementForm.actions.controller";


/**
 * Initialise le formulaire pour une tenue en édition ou crée un formulaire par défaut.
 *
 * @param dressing - Le modèle de dressing contenant les informations nécessaires.
 * @param tenueInEdition - La tenue actuellement en édition, ou `null` si aucune tenue n'est en cours d'édition.
 * @param setForm - Fonction permettant de mettre à jour l'état du formulaire.
 *
 * Si une tenue est en cours d'édition (`tenueInEdition` n'est pas `null` ou `undefined`), 
 * le formulaire est initialisé avec les données de cette tenue transformées en modèle de formulaire.
 * Sinon, un formulaire par défaut est créé avec le dressing fourni et un statut actif.
 */
export function initForm(dressing: DressingModel, tenueInEdition: TenueModel | null,
    setForm: Function) {

    if (tenueInEdition !== null && tenueInEdition !== undefined) {
        setForm((form: FormTenueModel) => transformTenueToFormModel(form, tenueInEdition, dressing));
    }
    else {
        setForm(() => { return { dressing: dressing, statut: StatutVetementEnum.ACTIF }});
    }
}


/**
 * Met à jour le libellé du formulaire de vêtement.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function setLibelleForm(libelle: string, setForm: React.Dispatch<React.SetStateAction<FormTenueModel>>, setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormTenueModel>>) {
    setForm((form: FormTenueModel) => {
        return { ...form, libelle: libelle }
    });
    if (libelle) {
        setErrorsForm((errors: ErrorsFormTenueModel) => {
            return { ...errors, libelleInError: false }
        });
    }
}



/**
 * Ajoute un vêtement au formulaire de tenue.
 *
 * @param vetement - Le modèle du vêtement à ajouter.
 * @param setForm - Fonction permettant de mettre à jour l'état du formulaire de tenue.
 * @param setErrorsForm - Fonction permettant de mettre à jour l'état des erreurs du formulaire de tenue.
 */
export function addRemoveVetementForm(vetement: VetementModel, setForm: React.Dispatch<React.SetStateAction<FormTenueModel>>, selected?: boolean) {

    if(!selected) {
        setForm((form: FormTenueModel) => {
            return {
                ...form,
                vetements: form.vetements
                    ? form.vetements.filter(v => v.id !== vetement.id)
                    : []
            }
        });
    }
    else{
    // Si le vêtement n'est pas déjà présent dans le formulaire, on l'ajoute
    setForm((form: FormTenueModel) => {
        let updatedVetements = form.vetements || [];
        if (!updatedVetements.some(v => v.id === vetement.id)) {
            updatedVetements = [...updatedVetements, vetement];
        }
        return {
            ...form,
            vetements: updatedVetements
        }
    });
    }
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
    form: FormTenueModel | null,
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormTenueModel>>,
    validateFormCallBack: (resultat: APIResultFormTenueModel) => void) {

    console.log("Validation du formulaire", form);
    errors = false;
    if (form === null) {
        console.error("Le formulaire est vide");
        errors = true;
        setErrorsForm((errors: ErrorsFormTenueModel) => {
            return {
                ...errors, libelleInError: true
            }
        });
        return;
    }

    errors = validateAttribute("libelle", form.libelle === undefined || form.libelle === "", setErrorsForm, errors);

    if (!errors) {
        // Enregistrement du formulaire 
        callSaveTenueService(form)
            .then((resultat) => {
                console.log("Tenue enregistrée avec succès", resultat);
                validateFormCallBack(resultat);
            })
            .catch((e) => {
                console.error('Une erreur s\'est produite lors de la connexion au backend', e);
                showToast("Erreur d'enregistrement de la tenue : " + e, ToastDuration.LONG);
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
function callSaveTenueService(form: FormTenueModel) {
    // Enregistrement du formulaire 
    const tenue: TenueModel = transformFormToTenueModel(form);
    const isEdition = (tenue.id !== null && tenue.id !== "" && tenue.id !== undefined);
    console.log((isEdition ? "Mise à jour" : "Création") + " de la tenue", tenue);

    const params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_TENUE, value: String(form.id) }
    ];
    const url = isEdition ? SERVICES_URL.SERVICE_TENUES_BY_ID : SERVICES_URL.SERVICE_TENUES;
    //  Appel au backend pour sauvegarder le vêtement
    return callPOSTBackend(url, params, tenue)
}


/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param validateFormCallBack fonction de validation du formulaire
 * @returns si le formulaire est invalide
 */
export function archiveForm(form: FormTenueModel, validateFormCallBack: (resultat: APIResultFormTenueModel) => void) {

    console.log("Validation du formulaire pour archivage", form);
    form.statut = (form.statut === StatutVetementEnum.ACTIF ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF);
    console.log("Archivage du vêtement", form.id, form.statut);
    // Enregistrement du formulaire 

    callSaveTenueService(form)
        .then((resultat: APIResultFormTenueModel) => {
            if (resultat.updated) {
                resultat.updated = false;
                resultat.archived = true;
            }
            console.log("Tenue archivée avec succès", resultat);
            validateFormCallBack(resultat);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur :" + e, ToastDuration.LONG);
            return false;
        });
}


/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
export function deleteForm(form: FormTenueModel,
    validateFormCallBack: (resultDelete: APIResultFormTenueModel) => void) {
    console.log("Suppression du vêtement", form.id);

    let params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_TENUE, value: String(form.id) }
    ];

    //  Appel au backend pour supprimer le vêtement
    callDELETEBackend(SERVICES_URL.SERVICE_TENUES_BY_ID, params)
        .then((resultDeleteTenue: APIResultFormTenueModel) => {
            console.log("Tenue supprimé avec succès", resultDeleteTenue);
            validateFormCallBack(resultDeleteTenue);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur : " + e, ToastDuration.LONG);
            return false;
        }); 
}
