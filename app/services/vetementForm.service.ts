import { SERVICES_PARAMS, SERVICES_URL } from "../constants/APIconstants";
import VetementModel from "../models/vetements/vetements.model";
import FormVetementModel, { transformFormToVetementModel } from "../models/vetements/form.vetements.model";
import { callDELETEBackend, callPOSTBackend, callPUTBackend } from "./ClientHTTP.service";
import { showToast, ToastDuration } from "../components/commons/AndroidToast";
import APIResultVetementModel from "../models/vetements/form.result.vetements.model";
import { callPUTS3Backend } from "./ClientS3.service";



/**
 * sauvegarde du vêtement
 * @param form formulaire à sauvegarder
 */
export function callSaveVetementService(form: FormVetementModel): Promise<any> {

    let params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_VETEMENT, value: String(form.id) }
    ];

    const vetement: VetementModel = transformFormToVetementModel(form);

    if (form.image?.localUri !== null && form.image?.localUri !== undefined) {
        console.log("Enregistrement de l'image du vêtement", vetement.id ?? "[NOUVEAU]");
        return saveVetementsImage(form.image?.localUri, params)
            .then((uriImage: string) => {
                if (vetement.image) {
                    vetement.image.s3uri = uriImage;
                }
                return vetement;
            })
            .then((vetement: VetementModel) => {
                return saveVetementAttributs(vetement, params);
            })
            .catch((e) => {
                console.error('Une erreur s\'est produite lors de la connexion au backend', e);
                showToast(e, ToastDuration.LONG);
                return false;
            });
    } else {
        return saveVetementAttributs(vetement, params);
    }
}

/**
 * Enregistre une image de vêtement dans un stockage S3 en utilisant une URL d'image et des paramètres spécifiques.
 *
 * @param formImageURL - URL de l'image du formulaire à enregistrer.
 * @param params - Tableau de paramètres contenant une clé (`SERVICES_PARAMS`) et une valeur associée.
 * @returns Une promesse qui se résout avec l'URI S3 de l'image enregistrée ou se rejette en cas d'erreur.
 *
 * @throws Une erreur est levée si une étape échoue, comme la récupération de l'URL S3 ou l'envoi de l'image.
 */
function saveVetementsImage(formImageURL: string, params: { key: SERVICES_PARAMS; value: string; }[]): Promise<string> {

    return new Promise((resolve, reject) => {
        //  Appel au backend pour récupérer une URL S3
        callPUTBackend(SERVICES_URL.SERVICE_VETEMENTS_IMAGE, params)
            .then(async (response) => {
                const urlS3 : string = response.url;
                const uriImage : string = response.s3uri
                console.debug("Enregistrement de l'image du vêtement ", uriImage, " dans S3", urlS3);

                fetch(formImageURL)
                    .then((response) => response.blob())
                    .then((bufferImage) => callPUTS3Backend(urlS3, bufferImage))
                    .then((responseToS3) => {
                        console.log("Image du vêtement enregistrée avec succès dans S3", responseToS3);
                        resolve(uriImage);
                    })
                    .catch((e) => {
                        console.error('Une erreur s\'est produite lors de la connexion au S3', e);
                        showToast("Err : S3 : " + e, ToastDuration.LONG);
                        reject(e);
                    })
            })
            .catch((e) => {
                console.error('Une erreur s\'est produite lors de la connexion au backend', e);
                showToast("Err : Presigned : " + e, ToastDuration.LONG);
                reject(e);
            });
    });
}


/**
 * Sauvegarde les attributs d'un vêtement en appelant un service backend.
 * 
 * @param vetement - Le modèle du vêtement à sauvegarder.
 * @param params - Tableau de paramètres contenant une clé et une valeur pour le service.
 * @param formProps - Objet contenant les propriétés du formulaire :
 *   - `form` : Les données actuelles du formulaire.
 *   - `setForm` : Fonction pour mettre à jour les données du formulaire.
 *   - `setErrorsForm` : Fonction pour définir les erreurs du formulaire.
 *   - `onCloseForm` : Fonction pour fermer le formulaire.
 * 
 * @remarks
 * Cette fonction détermine si le vêtement est en mode création ou mise à jour
 * en fonction de la présence d'un identifiant (`id`) dans le modèle du vêtement.
 * Elle effectue un appel POST au backend pour sauvegarder les données et gère
 * les retours en affichant des notifications de succès ou d'erreur.
 * 
 * @throws Une erreur est affichée dans la console et une notification est montrée
 * si l'appel au backend échoue.
 */
function saveVetementAttributs(vetement: VetementModel, params: { key: SERVICES_PARAMS; value: string; }[]): Promise<APIResultVetementModel> {

    const isEdition = (vetement.id !== null && vetement.id !== "" && vetement.id !== undefined);
    console.log((isEdition ? "Mise à jour" : "Création") + " du vêtement", vetement);
    const url = isEdition ? SERVICES_URL.SERVICE_VETEMENTS_BY_ID : SERVICES_URL.SERVICE_VETEMENTS;
    //  Appel au backend pour sauvegarder le vêtement
    return callPOSTBackend(url, params, vetement)
}



/**
 * Supprime un vêtement à partir du formulaire donné.
 *
 * @param {FormVetementModel} form - Le modèle de formulaire contenant les informations du vêtement à supprimer.
 * @param {Function} setForm - Fonction pour mettre à jour l'état du formulaire.
 * @param {Function} setErrorsForm - Fonction pour mettre à jour les erreurs du formulaire.
 * @param {Function} validateFormCallBack - Fonction pour fermer le formulaire.
 *
 * @returns {void}
 *
 * @description
 * Cette fonction envoie une requête DELETE au backend pour supprimer le vêtement spécifié.
 * Si la suppression est réussie, un message de succès est affiché et le formulaire est réinitialisé et fermé.
 * En cas d'erreur, un message d'erreur est affiché.
 */
export function callDeleteVetementService(form: FormVetementModel) : Promise<APIResultVetementModel> {

    let params = [
        { key: SERVICES_PARAMS.ID_DRESSING, value: String(form.dressing.id) },
        { key: SERVICES_PARAMS.ID_VETEMENT, value: String(form.id) }
    ];

    console.log("Suppression du vêtement", form);
    //  Appel au backend pour supprimer le vêtement
    return callDELETEBackend(SERVICES_URL.SERVICE_VETEMENTS_BY_ID, params);
}
