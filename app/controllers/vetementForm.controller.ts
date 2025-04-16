import { alphanumSort, checkPriceFormat, numSort } from "../components/commons/CommonsUtils";
import DressingModel from "../models/dressing.model";
import VetementModel from "../models/vetements/vetements.model";
import ErrorsFormVetementModel from "../models/vetements/form.errors.vetements.model";
import FormVetementModel, { transformVetementToFormModel } from "../models/vetements/form.vetements.model";
import { VetementsFormParamsTypeProps } from "../components/dressing/vetementForm.component";
import { CategorieDressingEnum, SaisonVetementEnum, StatutVetementEnum } from "../constants/AppEnum";
import * as ImagePicker from 'expo-image-picker';
import ParamGenericVetementsModel from "../models/params/paramGenericVetements.model";
import { callDeleteVetementService, callSaveVetementService } from "../services/vetementForm.service";
import { showToast, ToastDuration } from "../components/commons/AndroidToast";
import ImageResizer from 'react-native-image-resizer';
import APIResultVetementModel from "../models/vetements/form.result.vetements.model";


// Filtre les types de vêtements en fonction de la catégorie du dressing
export function getTypeVetementsForm(typeVetements: ParamGenericVetementsModel[], dressing: DressingModel): ParamGenericVetementsModel[] {
    return typeVetements
        .filter((type) => type.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((t1, t2) => alphanumSort(t1.libelle, t2.libelle));
}



// Filtre les tailles de mesures en fonction de la catégorie du dressing et du type de vêtement
export function getTaillesMesuresForm(taillesMesures: ParamGenericVetementsModel[], dressing: DressingModel, form: FormVetementModel | null): ParamGenericVetementsModel[] {
    if (form?.type === undefined || form?.type === null) {
        return [];
    }
    return taillesMesures
        .filter((taille) => taille.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .filter((taille) => taille.type === form.type.type)
        .sort((t1, t2) => numSort(t1.tri, t2.tri));
}


// Filtre les usages en fonction de la catégorie du dressing
export function getUsagesForm(usages: ParamGenericVetementsModel[], dressing: DressingModel): ParamGenericVetementsModel[] {
    return usages
        .filter((usage: ParamGenericVetementsModel) => usage.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((u1, u2) => alphanumSort(u1.libelle, u2.libelle));
}



// Filtre les état en fonction de la catégorie du dressing
export function getEtatsForm(etats: ParamGenericVetementsModel[], dressing: DressingModel): ParamGenericVetementsModel[] {
    return etats
        .filter((etat: ParamGenericVetementsModel) => etat.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .sort((e1, e2) => numSort(e1.tri, e2.tri));
}


// Filtre les marques en fonction de la catégorie du dressing et du type de vêtement
export function getMarquesForm(marques: ParamGenericVetementsModel[], dressing: DressingModel, form: FormVetementModel | null): ParamGenericVetementsModel[] {
    if (form?.type === undefined || form?.type === null) {
        return [];
    }
    return marques
        .filter((marque: ParamGenericVetementsModel) => marque.categories
            .filter((cat) => cat === dressing.categorie)
            .length > 0)
        .filter((marque) => marque.type === form.type.type)
        .sort((m1, m2) => alphanumSort(m1.libelle, m2.libelle));
}


/**
 * Met à jour le libellé du formulaire de vêtement.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function initForm(dressing: DressingModel, vetementInEdition: VetementModel | null,
    setForm: Function,
    { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements, paramsEtatVetements, paramsMarquesVetements }: VetementsFormParamsTypeProps) {

    if (vetementInEdition !== null && vetementInEdition !== undefined) {

        setForm((form: FormVetementModel) => transformVetementToFormModel(form, vetementInEdition, dressing,
            { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements, paramsMarquesVetements, paramsEtatVetements }));
    }
    else {
        setForm(() => {
            return { dressing: dressing, usagesListe: [], saisons: [], statut: StatutVetementEnum.ACTIF }
        });
    }
}


/**
 * Lance une bibliothèque d'images pour permettre à l'utilisateur de sélectionner une image
 * et met à jour le formulaire avec l'image sélectionnée.
 *
 * @param setForm - Fonction utilisée pour mettre à jour l'état du formulaire avec l'image sélectionnée.
 * 
 * @remarks
 * Cette fonction utilise `ImagePicker.launchImageLibraryAsync` pour ouvrir la bibliothèque d'images.
 * Elle permet l'édition de l'image avant la sélection et garantit une qualité maximale.
 * Si l'utilisateur annule la sélection, aucune action n'est effectuée.
 * 
 * @returns Une promesse qui se résout une fois que l'image est sélectionnée et le formulaire mis à jour.
 */
export const pickImageForm = async (setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) => {

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0,
        legacy: true
    });
    if (!result.canceled) {
        await ImageResizer.createResizedImage(result.assets[0].uri, 250, 250, "JPEG", 90, 0).then((compressedImage) => {
            // compress image will be low size which will be use to upload to server
            setImageForm(compressedImage, setForm);
          }).catch((err) => {
            console.log("Erreur lors du redimensionnement", err);
          });
        
    }
};
/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setImageForm(image: ImagePicker.ImagePickerAsset, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return {
            ...form, image: {
                localUri: image.uri,
                largeur: image.width,
                hauteur: image.height
            }
        }
    });
}


/**
 * Met à jour le libellé du formulaire de vêtement.
 *
 * @param libelle - Le nouveau libellé à définir dans le formulaire.
 * @param setForm - La fonction de mise à jour de l'état du formulaire.
 */
export function setLibelleForm(libelle: string, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>, setErrorsForm: Function) {
    setForm((form: FormVetementModel) => {
        return { ...form, libelle: libelle }
    });
    if (libelle) {
        setErrorsForm((errors: ErrorsFormVetementModel) => {
            return { ...errors, libelleInError: false }
        });
    }
}

/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setTypeForm(type: ParamGenericVetementsModel, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, type: type }
    });
}

/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param taille 
 * @param setForm 
 */
export function setTailleForm(taille: ParamGenericVetementsModel, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, taille: taille }
    });
}



/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param petiteTaille 
 * @param setForm 
 */
export function setPetiteTailleForm(petiteTaille: boolean, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
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
export function setUsagesForm(usageIdsListe: string[], paramsUsagesVetements: ParamGenericVetementsModel[], setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>, setErrorsForm: Function) {

    let usages: ParamGenericVetementsModel[] = [];
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
export function setEtatForm(etat: ParamGenericVetementsModel, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, etat: etat }
    });
}


/**
 * Enregistre la taille de vêtements dans le formulaire
 * @param saisonsString 
 * @param setForm 
 */
export function setSaisonForm(saisonsString: string[], setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    let saisons: SaisonVetementEnum[] = [];
    saisonsString.forEach((saison) => {
        let saisonModel = Object.values(SaisonVetementEnum).find((s) => s === saison);
        if (saisonModel !== undefined) {
            saisons.push(saisonModel);
        }
    });
    setForm((form: FormVetementModel) => {
        return { ...form, saisons: saisons }
    })
}

/**
 * Enregistre les couleurs de vêtements dans le formulaire
 * @param couleurs liste des couleurs
 * @param setForm formulaire à mettre à jour
 */
export function setCouleursForm(couleurs: string, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
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
export function setDescriptionForm(description: string, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, description: description }
    });
}


/**
 * Enregistre la collection de vêtements dans le formulaire
 * @param marque description du vêtement
 * @param setForm formulaire à mettre à jour
 */
export function setMarqueForm(marque: ParamGenericVetementsModel, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, marque: marque }
    });
}

/**
 * Enregistre la collection de vêtements dans le formulaire
 * @param collection description du vêtement
 * @param setForm formulaire à mettre à jour
 */
export function setCollectionForm(collection: string, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, collection: collection }
    });
}

/**
 * Enregistre la collection de vêtements dans le formulaire
 * @param prix description du vêtement
 * @param setForm formulaire à mettre à jour
 */
export function setPrixNeufForm(prix: string, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, prixNeuf: prix?.replace(",", ".") }
    });
}

/**
 * Enregistre la collection de vêtements dans le formulaire
 * @param prix description du vêtement
 * @param setForm formulaire à mettre à jour
 */
export function setPrixAchatForm(prix: string, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
    setForm((form: FormVetementModel) => {
        return { ...form, prixAchat: prix?.replace(",", ".") }
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
    form: FormVetementModel | null,
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormVetementModel>>,
    validateFormCallBack: (resultat: APIResultVetementModel) => void) {

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

    validateAttribute("libelle", form.libelle === undefined || form.libelle === ""
        , setErrorsForm);
    validateAttribute("type", form.type === undefined || form.type === null
        , setErrorsForm);
    validateAttribute("taille", form.taille === undefined || form.taille === null
        , setErrorsForm);
    validateAttribute("usage", form.usages === undefined || form.usages === null || form.usages.length === 0
        , setErrorsForm);
    validateAttribute("marque", form.marque === undefined || form.marque === null
        , setErrorsForm);
    validateAttribute("etat", form.dressing.categorie !== CategorieDressingEnum.ADULTE && (form.etat === undefined || form.etat === null)
        , setErrorsForm);
    validateAttribute("prixAchat", !checkPriceFormat(form.prixAchat)
        , setErrorsForm);
    validateAttribute("prixNeuf", !checkPriceFormat(form.prixNeuf)
        , setErrorsForm);

    if (!errors) {
        // Enregistrement du formulaire 
        callSaveVetementService(form)
            .then((resultat) => {
                console.log("Vêtement enregistrés avec succès", resultat);
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
function validateAttribute(attributeName: string, attributeCheckFail: boolean,
    setErrorsForm: React.Dispatch<React.SetStateAction<ErrorsFormVetementModel>>) {
    if (attributeCheckFail) {
        errors = true;
    }
    setErrorsForm((errors: ErrorsFormVetementModel) => {
        return { ...errors, [attributeName + "InError"]: attributeCheckFail }
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
export function archiveForm(form: FormVetementModel, validateFormCallBack: (resultat: APIResultVetementModel) => void) {

    console.log("Validation du formulaire pour archivage", form);
    form.statut = (form.statut === StatutVetementEnum.ACTIF ? StatutVetementEnum.ARCHIVE : StatutVetementEnum.ACTIF);
    console.log("Archivage du vêtement", form.id, form.statut);
    // Enregistrement du formulaire 
    callSaveVetementService(form)
        .then((resultat : APIResultVetementModel) => {
            if(resultat.updated){
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
    validateFormCallBack: (resultDelete: APIResultVetementModel) => void) {
    console.log("Suppression du vêtement", form.id);
    // Enregistrement du formulaire 
    callDeleteVetementService(form)
        .then((resultDeleteVetement: APIResultVetementModel) => {
            console.log("Vêtement supprimé avec succès", resultDeleteVetement);
            validateFormCallBack(resultDeleteVetement);
        })
        .catch((e) => {
            console.error('Une erreur s\'est produite lors de la connexion au backend', e);
            showToast("Erreur d'archivage du vêtement : " + e, ToastDuration.LONG);
            return false;
        });
}
