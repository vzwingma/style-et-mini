import { API_VERBS } from '@/app/constants/APIconstants';
import 'react-native-get-random-values';
import { v7 as uuidGen } from 'uuid';
import { startWatch, stopWatch } from './ClientHTTP.service';
/** Client HTTP **/



/**
 * Effectue un appel HTTP PUT vers un backend avec des données binaires (FormData).
 *
 * @param {SERVICES_URL} path - Le chemin ou l'URL du service backend à appeler.
 * @param {KeyValueParams[]} [params] - Une liste optionnelle de paramètres clé-valeur à ajouter à l'URL.
 * @param {FormData} [data] - Les données binaires à envoyer dans le corps de la requête.
 * @returns {Promise<any>} Une promesse qui se résout avec la réponse du backend en cas de succès,
 * ou qui est rejetée avec un message d'erreur en cas d'échec.
 *
 * @throws {Error} Si une erreur réseau ou une erreur HTTP se produit.
 * ```
 */
export function callPUTS3Backend(fullURL: string, data?: any): Promise<boolean> {
    // Calcul de l'URL complétée
    let traceId = uuidGen().replaceAll("-", "");


    console.log("[WS traceId=" + traceId + "] > [" + fullURL + "]");
    // Début du watch
    startWatch();

    return fetch(fullURL, {
        method: API_VERBS.PUT,
        mode: "cors",
        body: data
    })
    .then(res => {
        // Fin du watch
        stopWatch(traceId, res);
        if (res.status >= 200 && res.status < 300) {
            return res.ok;
        } else {
            throw new Error(res.status + "/" + res.statusText);
        }
    })
}

