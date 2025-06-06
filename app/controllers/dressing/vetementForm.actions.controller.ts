import { checkPriceFormat } from "../../components/commons/CommonsUtils";
import ErrorsFormVetementModel from "../../models/vetements/form.errors.vetements.model";
import FormVetementModel from "../../models/vetements/form.vetements.model";
import { CategorieDressingEnum, StatutVetementEnum } from "../../constants/AppEnum";
import { callDeleteVetementService, callSaveVetementService } from "../../services/vetementForm.service";
import { showToast, ToastDuration } from "../../components/commons/AndroidToast";
import APIResultFormVetementModel from "../../models/vetements/form.result.vetements.model";


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
    form: FormVetementModel | null,
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormVetementModel>>,
    validateFormCallBack: (resultat: APIResultFormVetementModel) => void) {

    console.log("Validation du formulaire", form);
    errors = false;
    if (form === null) {
        console.error("Le formulaire est vide");
        errors = true;
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return {
                ...errors, libelleInError: true
                , typeInError: true
                , tailleInError: true
                , usageInError: true
                , etatInError: true
                , marqueInError: true
            }
        });
        return;
    }

    errors = validateAttribute("libelle", form.libelle === undefined || form.libelle === ""
        , setErrorsForm, errors);
    errors = validateAttribute("type", form.type === undefined || form.type === null
        , setErrorsForm, errors);
    errors = validateAttribute("taille", form.taille === undefined || form.taille === null
        , setErrorsForm, errors);
    errors = validateAttribute("usage", form.usages === undefined || form.usages === null || form.usages.length === 0
        , setErrorsForm, errors);
    errors = validateAttribute("marque", form.marque === undefined || form.marque === null
        , setErrorsForm, errors);
    errors = validateAttribute("etat", form.dressing.categorie !== CategorieDressingEnum.ADULTE && (form.etat === undefined || form.etat === null)
        , setErrorsForm, errors);
    errors = validateAttribute("prixAchat", !checkPriceFormat(form.prixAchat)
        , setErrorsForm, errors);
    errors = validateAttribute("prixNeuf", !checkPriceFormat(form.prixNeuf)
        , setErrorsForm, errors);

    if (!errors) {
        // Enregistrement du formulaire 
        callSaveVetementService(form)
            .then((resultat) => {
                console.log("Vêtement enregistré avec succès", resultat);
                validateFormCallBack(resultat);
            })
            .catch((e) => {
                console.error('Une erreur s\'est produite lors de la connexion au backend', e);
                showToast("Erreur d'enregistrement du vêtement : " + e, ToastDuration.LONG);
                return false;
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
export function validateAttribute(attributeName: string, attributeCheckFail: boolean,
    setErrorsForm: React.Dispatch<React.SetStateAction<any>>, errors : boolean) : boolean {
    if (attributeCheckFail) {
        errors = true;
    }
    setErrorsForm((errors : any) => {
        return { ...errors, [attributeName + "InError"]: attributeCheckFail }
    });
    return errors;
}



/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param validateFormCallBack fonction de validation du formulaire
 * @returns si le formulaire est invalide
 */
export function archiveForm(form: FormVetementModel, validateFormCallBack: (resultat: APIResultFormVetementModel) => void) {

    console.log("Validation du formulaire pour archivage", form);
    form.statut = (form.statut === StatutVetementEnum.ACTIF ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF);
    console.log("Archivage du vêtement", form.id, form.statut);
    // Enregistrement du formulaire 
    callSaveVetementService(form)
        .then((resultat: APIResultFormVetementModel) => {
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
}


/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
export function deleteForm(form: FormVetementModel,
    validateFormCallBack: (resultDelete: APIResultFormVetementModel) => void) {
    console.log("Suppression du vêtement", form.id);
    // Enregistrement du formulaire 
    callDeleteVetementService(form)
        .then((resultDeleteVetement: APIResultFormVetementModel) => {
            console.log("Vêtement supprimé avec succès", resultDeleteVetement);
            validateFormCallBack(resultDeleteVetement);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur d'archivage du vêtement : " + e, ToastDuration.LONG);
            return false;
        });
}
