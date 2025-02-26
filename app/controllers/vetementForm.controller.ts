import { SERVICES_PARAMS, SERVICES_URL } from "@/constants/APIconstants";
import { alphanumSort } from "../components/commons/CommonsUtils";
import DressingModel from "../models/dressing.model";
import VetementModel from "../models/vetements.model";
import ErrorsFormVetementModel from "../models/form.errors.vetements.model";
import FormVetementModel, { transformFormToVetementModel } from "../models/form.vetements.model";
import ParamTailleVetementsModel from "../models/paramTailleVetements.model";
import ParamTypeVetementsModel from "../models/paramTypeVetements.model";
import ParamUsageVetementsModel from "../models/paramUsageVetements.model";
import { callPOSTBackend } from "../services/ClientHTTP.service";
import { showToast, ToastDuration } from "../components/commons/AndroidToast";


// Filtre les types de vêtements en fonction de la catégorie du dressing
export function getTypeVetementsForm(typeVetements: ParamTypeVetementsModel[], dressing: DressingModel): ParamTypeVetementsModel[] {
    return typeVetements
        .filter((type) => type.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((a, b) => alphanumSort(a.libelle, b.libelle));
}



// Filtre les tailles de mesures en fonction de la catégorie du dressing
export function getTaillesMesuresForm(taillesMesures: ParamTailleVetementsModel[], dressing: DressingModel, form: FormVetementModel | null): ParamTailleVetementsModel[] {
    if (form?.type === undefined || form?.type === null) {
        return [];
    }
    return taillesMesures
        .filter((taille) => taille.categorie === dressing.categorie)
        .filter((taille) => taille.type === form.type.typeTaille)
        .sort((a, b) => alphanumSort(a.libelle, b.libelle));
}


// Filtre les usages en fonction de la catégorie du dressing
export function getUsagesForm(usages: ParamUsageVetementsModel[], dressing: DressingModel): ParamUsageVetementsModel[] {
    return usages
        .filter((usage) => usage.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((a, b) => alphanumSort(a.libelle, b.libelle));
}

/**
 * Met à jour le libellé du formulaire de vêtement.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function initForm(dressing: DressingModel, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, dressing: dressing }
    });
}



/**
 * Met à jour le libellé du formulaire de vêtement.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function setLibelleForm(libelle: string, setForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, libelle: libelle }
    });
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
 * Enregistre la liste des usages de vêtements dans le formulaire
 * @param usageIdsListe liste des identifiants des usages sélectionnés
 * @param paramsUsagesVetements liste des usages de vêtements
 * @param setForm formulaire à mettre à jour
 */
export function setUsages(usageIdsListe: string[], paramsUsagesVetements: ParamUsageVetementsModel[], setForm: Function) {

    let usages: ParamUsageVetementsModel[] = [];
    usageIdsListe.forEach((usageId) => {
        let usageModel = paramsUsagesVetements.find((u) => u.id === usageId);
        if (usageModel !== undefined) {
            usages.push(usageModel);
        }
    }
    );
    setForm((form: FormVetementModel) => {
        return { ...form, usagesListe: usageIdsListe, usages: usages }
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

export function razAndcloseForm(setForm: React.Dispatch<React.SetStateAction<FormVetementModel | null>>,
    setErrorsForm: Function, onCloseForm: Function) {
    setForm(null);
    setErrorsForm(null);
    onCloseForm();
}



/**
 * Validation du formulaire
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
 */
export function validateForm(form: FormVetementModel | null, setForm: React.Dispatch<React.SetStateAction<FormVetementModel | null>>,
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
    if (!errors) {
        // Enregistrement du formulaire 
        saveVetement(form);
    }



    /**
     * sauvegarde du vêtement
     * @param form formulaire à sauvegarder
     */
    function saveVetement(form: FormVetementModel) {

        let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
                      { key: SERVICES_PARAMS.ID_VETEMENT, value: String(form.id) }
        ];

        const vetement: VetementModel = transformFormToVetementModel(form);
        console.log("Sauvegarde du vêtement", vetement);
        const url =  (form.id !== null && form.id !== "" && form.id !== undefined) ?
                        SERVICES_URL.SERVICE_VETEMENTS_BY_ID : SERVICES_URL.SERVICE_VETEMENTS;

         //  Appel au backend pour sauvegarder le vêtement
        callPOSTBackend(url, params, vetement)
        .then((response) => {
            console.log("Vêtement mis à jour avec succès", response);
            razAndcloseForm(setForm, setErrorsForm, onCloseForm);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur de chargement du dressing", ToastDuration.LONG);
            return false;
        });

    }
}