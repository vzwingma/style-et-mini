import { SERVICES_PARAMS, SERVICES_URL } from "@/constants/APIconstants";
import { alphanumSort, triSort } from "../components/commons/CommonsUtils";
import DressingModel from "../models/dressing.model";
import VetementModel from "../models/vetements.model";
import ErrorsFormVetementModel from "../models/form.errors.vetements.model";
import FormVetementModel, { transformFormToVetementModel } from "../models/form.vetements.model";
import ParamTailleVetementsModel from "../models/params/paramTailleVetements.model";
import ParamTypeVetementsModel from "../models/params/paramTypeVetements.model";
import ParamUsageVetementsModel from "../models/params/paramUsageVetements.model";
import { callDELETEBackend, callPOSTBackend } from "../services/ClientHTTP.service";
import { showToast, ToastDuration } from "../components/commons/AndroidToast";
import { VetementsFormParamsTypeProps } from "../components/dressing/vetementForm.component";
import ParamEtatVetementsModel from "../models/params/paramEtatVetements.model";
import { CategorieDressingEnum, StatutVetementEnum } from "@/constants/AppEnum";
import * as ImagePicker from 'expo-image-picker';
import { v7 as uuidGen } from 'uuid';

// Filtre les types de vêtements en fonction de la catégorie du dressing
export function getTypeVetementsForm(typeVetements: ParamTypeVetementsModel[], dressing: DressingModel): ParamTypeVetementsModel[] {
    return typeVetements
        .filter((type) => type.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((t1, t2) => alphanumSort(t1.libelle, t2.libelle));
}



// Filtre les tailles de mesures en fonction de la catégorie du dressing
export function getTaillesMesuresForm(taillesMesures: ParamTailleVetementsModel[], dressing: DressingModel, form: FormVetementModel | null): ParamTailleVetementsModel[] {
    if (form?.type === undefined || form?.type === null) {
        return [];
    }
    return taillesMesures
        .filter((taille) => taille.categorie === dressing.categorie)
        .filter((taille) => taille.type === form.type.typeTaille)
        .sort((t1, t2) => triSort(t1.tri, t2.tri));
}


// Filtre les usages en fonction de la catégorie du dressing
export function getUsagesForm(usages: ParamUsageVetementsModel[], dressing: DressingModel): ParamUsageVetementsModel[] {
    return usages
        .filter((usage: ParamUsageVetementsModel) => usage.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((u1, u2) => alphanumSort(u1.libelle, u2.libelle));
}



// Filtre les état en fonction de la catégorie du dressing
export function getEtatsForm(etats: ParamEtatVetementsModel[], dressing: DressingModel): ParamEtatVetementsModel[] {
    return etats
        .filter((etat: ParamEtatVetementsModel) => etat.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((e1, e2) => triSort(e1.tri, e2.tri));
}

/**
 * Met à jour le libellé du formulaire de vêtement.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function initForm(dressing: DressingModel, vetementInEdition: VetementModel | null,
    setForm: Function,
    { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements, paramsEtatVetements }: VetementsFormParamsTypeProps) {

    if (vetementInEdition !== null && vetementInEdition !== undefined) {

        setForm((form: FormVetementModel) => {
            return {
                ...form,
                id: vetementInEdition.id,
                imageContent: vetementInEdition.image,
                libelle: vetementInEdition.libelle,
                dressing: dressing,
                type: paramsTypeVetements?.find((type) => type.id === vetementInEdition.type.id),
                taille: paramsTaillesMesures?.find((taille) => taille.id === vetementInEdition.taille.id),
                petiteTaille: vetementInEdition.taille.petite,
                usagesListe: vetementInEdition.usages.map((usage) => usage.id),
                usages: vetementInEdition.usages.map((usage) => paramsUsagesVetements?.find((u) => u.id === usage.id)),
                saisons: vetementInEdition.saisons ?? [],
                etat: paramsEtatVetements?.find((etat) => etat.id === vetementInEdition.etat?.id),
                couleurs: vetementInEdition.couleurs,
                description: vetementInEdition.description,
                statut: vetementInEdition.statut ?? StatutVetementEnum.ACTIF
            }
        });
    }
    else {
        setForm(() => {
            return { dressing: dressing, usagesListe: [], saisons: [] }
        });
    }
}


export const pickImageForm = async (setForm: Function) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
    });
    if (!result.canceled) {
        setImageForm(result.assets[0].uri, setForm);
    }
};
/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setImageForm(image: string, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, imageId: uuidGen(), imageContent: image }
    });
}


/**
 * Met à jour le libellé du formulaire de vêtement.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function setLibelleForm(libelle: string, setForm: Function, setErrorsForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, libelle: libelle }
    });
    if (libelle) {
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, libelleInError: false, libelleMessage: null }
        });
    }
}

/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setTypeForm(type: ParamTypeVetementsModel, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, type: type }
    });
}

/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param taille 
 * @param setForm 
 */
export function setTailleForm(taille: ParamTailleVetementsModel, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, taille: taille }
    });
}



/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param petiteTaille 
 * @param setForm 
 */
export function setPetiteTailleForm(petiteTaille: boolean, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, petiteTaille: petiteTaille }
    });
}


/**
 * Enregistre la liste des usages de vêtements dans le formulaire
 * @param usageIdsListe liste des identifiants des usages sélectionnés
 * @param paramsUsagesVetements liste des usages de vêtements
 * @param setForm formulaire à mettre à jour
 */
export function setUsagesForm(usageIdsListe: string[], paramsUsagesVetements: ParamUsageVetementsModel[], setForm: Function, setErrorsForm: Function) {

    let usages: ParamUsageVetementsModel[] = [];
    usageIdsListe.forEach((usageId) => {
        let usageModel = paramsUsagesVetements.find((u) => u.id === usageId);
        if (usageModel !== undefined) {
            usages.push(usageModel);
            setErrorsForm((errors: ErrorsFormVetementModel) => {
                return { ...errors, usageInError: false, usageMessage: null }
            });
        }
    }
    );
    setForm((form: FormVetementModel) => {
        return { ...form, usagesListe: usageIdsListe, usages: usages }
    });
}

/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param etat 
 * @param setForm 
 */
export function setEtatForm(etat: ParamEtatVetementsModel, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, etat: etat }
    });
}


/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param saisonsString 
 * @param setForm 
 */
export function setSaisonForm(saisons: string[], setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, saisons: saisons }
    });
}

/**
 * Enregistre les couleurs de vêtements dans le formulaire
 * @param couleurs liste des couleurs
 * @param setForm formulaire à mettre à jour
 */
export function setCouleursForm(couleurs: string, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, couleurs: couleurs }
    }
    );
}

/**
 * Enregistre la description de vêtements dans le formulaire
 * @param description description du vêtement
 * @param setForm formulaire à mettre à jour
 */
export function setDescriptionForm(description: string, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, description: description }
    });
}



/**
 * Validation du formulaire
 */

export function razAndcloseForm(
    form: FormVetementModel,
    setForm: Function,
    setErrorsForm: Function, onCloseForm: Function) {
    initForm(form?.dressing, null, setForm, {});
    setErrorsForm(null);
    onCloseForm();
}


/**
 * sauvegarde du vêtement
 * @param form formulaire à sauvegarder
 */
function saveVetement(form: FormVetementModel,
    setForm: Function,
    setErrorsForm: Function,
    onCloseForm: Function) {

    let params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_VETEMENT, value: String(form.id) }
    ];

    const vetement: VetementModel = transformFormToVetementModel(form);
    const isEdition = (vetement.id !== null && vetement.id !== "" && vetement.id !== undefined);
    console.log((isEdition ? "Mise à jour" : "Création") + " du vêtement", vetement);
    const url = isEdition ? SERVICES_URL.SERVICE_VETEMENTS_BY_ID : SERVICES_URL.SERVICE_VETEMENTS;

    //  Appel au backend pour sauvegarder le vêtement
    callPOSTBackend(url, params, vetement)
        .then((response) => {
            console.log("Vêtement enregistré avec succès", response);
            showToast("Vêtement enregistré avec succès", ToastDuration.SHORT);
            razAndcloseForm(form, setForm, setErrorsForm, onCloseForm);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur d'enregistrement du vêtement : " + e, ToastDuration.LONG);
            return false;
        });
}

/**
 * Validation du formulaire
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
export function validateForm(form: FormVetementModel | null,
    setForm: Function,
    setErrorsForm: Function,
    onCloseForm: Function) {

    console.log("Validation du formulaire", form);

    let errors = false;
    if (form === null) {
        console.error("Le formulaire est vide");
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return {
                ...errors, libelleInError: true, libelleMessage: "Le libellé du vêtement est obligatoire"
                , typeInError: true, typeMessage: "Le type de vêtement est obligatoire"
                , tailleInError: true, tailleMessage: "La taille du vêtement est obligatoire"
                , usageInError: true, usageMessage: "Au moins un usage est obligatoire"
                , etatInError: true, etatMessage: "Au moins un état est obligatoire"
            }
        });
        return;
    }
    if (form.libelle === undefined || form.libelle === "") {
        errors = true;
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, libelleInError: true, libelleMessage: "Le libellé du vêtement est obligatoire" }
        });
    }
    else {
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, libelleInError: false, libelleMessage: null }
        });
    }

    if (form.type === undefined || form.type === null) {
        errors = true;
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, typeInError: true, typeMessage: "Le type de vêtement est obligatoire" }
        });
    }
    else {
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, typeInError: false, typeMessage: null }
        });
    }

    if (form.taille === undefined || form.taille === null) {
        errors = true;
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, tailleInError: true, tailleMessage: "La taille du vêtement est obligatoire" }
        });
    }
    else {
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, tailleInError: false, tailleMessage: null }
        });
    }

    if (form.usages === undefined || form.usages === null || form.usages.length === 0) {
        errors = true;
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, usageInError: true, usageMessage: "Au moins un usage est obligatoire" }
        });
    }
    else {
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, usageInError: false, usageMessage: null }
        });
    }

    if (CategorieDressingEnum.ADULTE !== form.dressing.categorie && (form.etat === undefined || form.etat === null)) {
        errors = true;
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, etatInError: true, etatMessage: "L'état du vêtement est obligatoire" }
        });
    }
    else {
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, etatInError: false, etatMessage: null }
        });
    }

    if (!errors) {
        // Enregistrement du formulaire 
        saveVetement(form, setForm, setErrorsForm, onCloseForm);
    }
}

export type FormModelProps = {
    form: FormVetementModel,
    setForm: Function,
    setErrorForm: Function,
    onCloseForm: Function
};

/**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
export function archiveForm(form: FormVetementModel,
    setForm: Function,
    setErrorsForm: Function,
    onCloseForm: Function) {

    console.log("Validation du formulaire pour archivage", form);
    form.statut = (form.statut === StatutVetementEnum.ACTIF ? StatutVetementEnum.ARCHIVE :  StatutVetementEnum.ACTIF);
    console.log("Archivage du vêtement", form.id, form.statut);
    // Enregistrement du formulaire 
    saveVetement(form, setForm, setErrorsForm, onCloseForm);

}


/**
 * Supprime un vêtement à partir du formulaire donné.
 *
 * @param {FormVetementModel} form - Le modèle de formulaire contenant les informations du vêtement à supprimer.
 * @param {Function} setForm - Fonction pour mettre à jour l'état du formulaire.
 * @param {Function} setErrorsForm - Fonction pour mettre à jour les erreurs du formulaire.
 * @param {Function} onCloseForm - Fonction pour fermer le formulaire.
 *
 * @returns {void}
 *
 * @description
 * Cette fonction envoie une requête DELETE au backend pour supprimer le vêtement spécifié.
 * Si la suppression est réussie, un message de succès est affiché et le formulaire est réinitialisé et fermé.
 * En cas d'erreur, un message d'erreur est affiché.
 */
function deleteVetement(form: FormVetementModel,
    setForm: Function,
    setErrorsForm: Function,
    onCloseForm: Function) {

    let params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_VETEMENT, value: String(form.id) }
    ];

    const isEdition = (form.id !== null && form.id !== "" && form.id !== undefined);
    console.log("Suppression du vêtement", form);
    //  Appel au backend pour supprimer le vêtement
    callDELETEBackend(SERVICES_URL.SERVICE_VETEMENTS_BY_ID, params)
        .then((response) => {
            console.log("Vêtement supprimé avec succès", response);
            showToast("Vêtement supprimé avec succès", ToastDuration.SHORT);
            razAndcloseForm(form, setForm, setErrorsForm, onCloseForm);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur de suppression du vêtement : " + e, ToastDuration.LONG);
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
    setForm: Function,
    setErrorsForm: Function,
    onCloseForm: Function) {
    console.log("Suppression du vêtement", form.id);
    // Enregistrement du formulaire 
    deleteVetement(form, setForm, setErrorsForm, onCloseForm);

}
