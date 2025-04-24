import { alphanumSort, numSort } from "../../components/commons/CommonsUtils";
import DressingModel from "../../models/dressing.model";
import VetementModel from "../../models/vetements/vetements.model";
import ErrorsFormVetementModel from "../../models/vetements/form.errors.vetements.model";
import FormVetementModel, { transformVetementToFormModel } from "../../models/vetements/form.vetements.model";
import { VetementsFormParamsTypeProps } from "../../components/dressing/vetementForm.component";
import { SaisonVetementEnum, StatutVetementEnum } from "../../constants/AppEnum";
import * as ImagePicker from 'expo-image-picker';
import ParamGenericVetementsModel from "../../models/params/paramGenericVetements.model";
import { showToast, ToastDuration } from "../../components/commons/AndroidToast";
import * as ImageManipulator from 'expo-image-manipulator';

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
 * Initialise le formulaire pour un vêtement en édition ou crée un formulaire vide.
 *
 * @param dressing - Le modèle de dressing contenant les informations globales.
 * @param vetementInEdition - Le modèle de vêtement en cours d'édition, ou `null` si aucun vêtement n'est en édition.
 * @param setForm - Fonction permettant de mettre à jour l'état du formulaire.
 * @param params - Les paramètres nécessaires pour transformer ou initialiser le formulaire :
 *   - `paramsTypeVetements` : Les types de vêtements disponibles.
 *   - `paramsTaillesMesures` : Les tailles et mesures disponibles.
 *   - `paramsUsagesVetements` : Les usages possibles des vêtements.
 *   - `paramsEtatVetements` : Les états possibles des vêtements.
 *   - `paramsMarquesVetements` : Les marques disponibles pour les vêtements.
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
        quality: 1,
        legacy: true
    });
    if (!result.canceled) {

        try {
            const image = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{resize: { width: 250 }}],
                { format: ImageManipulator.SaveFormat.JPEG }
            );
            console.log("Image redimensionnée", image);
            setImageForm(image, setForm);

        }
        catch (e) {
            console.error("Erreur de redimensionnement de l'image", e);
            showToast("Erreur de redimensionnement de l'image : " + e, ToastDuration.LONG);
            setImageForm(result.assets[0], setForm);
        };


    };
};


/**
 * Enregistre le type de vêtements dans le formulaire
 * @param type type de vêtements
 * @param setForm  fonction de mise à jour du formulaire
 */
export function setImageForm(image: any, setForm: React.Dispatch<React.SetStateAction<FormVetementModel>>) {
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