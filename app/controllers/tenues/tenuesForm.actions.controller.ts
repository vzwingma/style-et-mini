import { StatutVetementEnum } from "../../constants/AppEnum";
import APIResultVetementModel from "../../models/vetements/form.result.vetements.model";
import FormTenueModel, { transformFormToTenueModel } from "../../models/tenues/form.tenue.model";
import ErrorsFormTenueModel from "../../models/tenues/form.errors.tenues.model";
import { callPOSTBackend } from "../../services/ClientHTTP.service";
import TenueModel from "../../models/tenues/tenue.model";
import { SERVICES_PARAMS, SERVICES_URL } from "../../constants/APIconstants";
import { showToast, ToastDuration } from "../../components/commons/AndroidToast";




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
    validateFormCallBack: (resultat: APIResultVetementModel) => void) {

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

    validateAttribute("libelle", form.libelle === undefined || form.libelle === ""
        , setErrorsForm);

    if (!errors) {
        // Enregistrement du formulaire 
        /*
        callSaveVetementService(form)
            .then((resultat) => {
                console.log("Tenue enregistrée avec succès", resultat);
                validateFormCallBack(resultat);
            })
            .catch((e) => {
                console.error('Une erreur s\'est produite lors de la connexion au backend', e);
                showToast("Erreur d'enregistrement de la tenue : " + e, ToastDuration.LONG);
                return false;
            }); */
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
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormTenueModel>>) {
    if (attributeCheckFail) {
        errors = true;
    }
    setErrorsForm((errors: ErrorsFormTenueModel) => {
        return { ...errors, [attributeName + "InError"]: attributeCheckFail }
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
export function saveForm(form: FormTenueModel,
    validateFormCallBack: (resultDelete: APIResultVetementModel) => void) {
    console.log("Enregistrement de la tenue", form.id);

    // Enregistrement du formulaire 
    const tenue: TenueModel = transformFormToTenueModel(form);
    const isEdition = (tenue.id !== null && tenue.id !== "" && tenue.id !== undefined);
    console.log((isEdition ? "Mise à jour" : "Création") + " de la tenue", tenue);

    const params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_VETEMENT, value: String(form.id) }
    ];
    const url = isEdition ? SERVICES_URL.SERVICE_TENUES_BY_ID : SERVICES_URL.SERVICE_TENUES;
    //  Appel au backend pour sauvegarder le vêtement
    callPOSTBackend(url, params, tenue)

        .then((resultDeleteVetement: APIResultVetementModel) => {
            console.log("Vêtement supprimé avec succès", resultDeleteVetement);
            validateFormCallBack(resultDeleteVetement);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur d'enregistrement de la tenue : " + e, ToastDuration.LONG);
            return false;
        });
}


/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param validateFormCallBack fonction de validation du formulaire
 * @returns si le formulaire est invalide
 */
export function archiveForm(form: FormTenueModel, validateFormCallBack: (resultat: APIResultVetementModel) => void) {

    console.log("Validation du formulaire pour archivage", form);
    form.statut = (form.statut === StatutVetementEnum.ACTIF ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF);
    console.log("Archivage du vêtement", form.id, form.statut);
    // Enregistrement du formulaire 
    /*
    callSaveVetementService(form)
        .then((resultat: APIResultVetementModel) => {
            if (resultat.updated) {
                resultat.updated = false;
                resultat.archived = true;
            }
            console.log("Vêtement archivé avec succès", resultat);
            validateFormCallBack(resultat);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur d'archivage du vêtement : " + e, ToastDuration.LONG);
            return false;
        });
        */
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
    validateFormCallBack: (resultDelete: APIResultVetementModel) => void) {
    console.log("Suppression du vêtement", form.id);
    // Enregistrement du formulaire 
    /*
    callDeleteVetementService(form)
        .then((resultDeleteVetement: APIResultVetementModel) => {
            console.log("Vêtement supprimé avec succès", resultDeleteVetement);
            validateFormCallBack(resultDeleteVetement);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur d'archivage du vêtement : " + e, ToastDuration.LONG);
            return false;
        }); */
}
