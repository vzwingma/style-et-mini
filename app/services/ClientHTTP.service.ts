import { API_AUTH, API_PWD, API_URL, API_VERBS, KeyValueParams, SERVICES_URL } from '@/app/constants/APIconstants';
import 'react-native-get-random-values';
import { v7 as uuidGen } from 'uuid';
import { Buffer } from 'buffer';
/** Client HTTP **/

let storageWatch = 0;


/**
 * Calcul de l'URL complétée
 * @param path  chemin de la ressource
 * @param params paramètres (optionnels)
 * @returns URL complétée
 */
function evaluateURL(path: string, params?: KeyValueParams[]): string {
    let fullURL = API_URL + path;
    if (params !== undefined && params !== null && params.length > 0) {
        params.forEach(param => {
            fullURL = fullURL.replace(param.key, param.value)
        })
    }
    return fullURL;
}


/**
 * Début du watch de la réponse
 */
function startWatch(): void {
    storageWatch = new Date().getTime();
}
/**
 * 
 * @returns header d'authentification
 */
const getAuthHeader = () => {
    return 'Basic ' + Buffer.from(API_AUTH + ':' + API_PWD, 'binary').toString('base64');
};
/**
 * Fin du watch de la réponse
 * @param traceId id de la trace
 * @param res réponse
 * @returns temps de réponse en ms
 */
function stopWatch(traceId: string, res: Response): number {
    let responseTime = new Date().getTime() - storageWatch;
    console.log("[WS traceId=" + traceId + "] < [" + res.status + (res.statusText !== null && res.statusText !== "" ? " - " + res.statusText : "") + "][t:" + responseTime + "ms]");
    return responseTime;
}


/**
 * Appel HTTP vers le backend
 * @param httpMethod méthode HTTP
 * @param path chemin de la ressource
 * @param params paramètres (optionnels)
 * @param body body de la requête (optionnel)
 * @returns réponse
 */
export function callGETBackend(path: SERVICES_URL, params?: KeyValueParams[]): Promise<any> {
    return callBackend(API_VERBS.GET, path, params);
}



/**
 * Effectue un appel POST vers le backend.
 *
 * @param {SERVICES_URL} path - Le chemin de l'URL du service.
 * @param {KeyValueParams[]} [params] - Les paramètres de la requête sous forme de paires clé-valeur.
 * @param {any} [body] - Le corps de la requête à envoyer.
 * @returns {Promise<any>} - Une promesse qui se résout avec la réponse du backend.
 */
export function callPOSTBackend(path: SERVICES_URL, params?: KeyValueParams[], body?: any): Promise<any> {
    return callBackend(API_VERBS.POST, path, params, body);
}

/**
 * Effectue un appel POST vers le backend.
 *
 * @param {SERVICES_URL} path - Le chemin de l'URL du service.
 * @param {KeyValueParams[]} [params] - Les paramètres de la requête sous forme de paires clé-valeur.
 * @param {any} [body] - Le corps de la requête à envoyer.
 * @returns {Promise<any>} - Une promesse qui se résout avec la réponse du backend.
 */
export function callPUTBackend(path: SERVICES_URL, params?: KeyValueParams[]): Promise<any> {
    return callBackend(API_VERBS.PUT, path, params);
}



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
export function callPUTBinaryBackend(fullURL: string, data?: any): Promise<boolean> {
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


/**
 * Appelle le backend avec une requête DELETE.
 *
 * @param {SERVICES_URL} path - Le chemin de l'URL du service.
 * @param {KeyValueParams[]} [params] - Les paramètres optionnels de la requête.
 * @returns {Promise<any>} - Une promesse qui se résout avec la réponse du backend.
 */
export function callDELETEBackend(path: SERVICES_URL, params?: KeyValueParams[]): Promise<any> {
    return callBackend(API_VERBS.DELETE, path, params);
}


/**
 * Appel HTTP vers le backend
 * @param httpMethod méthode HTTP
 * @param path chemin de la ressource
 * @param params paramètres (optionnels)
 * @param body body de la requête (optionnel)
 * @returns réponse
 */
function callBackend(verb: API_VERBS, path: SERVICES_URL, params?: KeyValueParams[], body?: JSON): Promise<any> {
    // Calcul de l'URL complétée
    const fullURL = evaluateURL(path, params);

    let traceId = uuidGen().replaceAll("-", "");
    console.log("[WS traceId=" + traceId + "] > [" + fullURL + "]");
    // Début du watch
    startWatch();

    return fetch(fullURL, {
            method: verb,
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Authorization': getAuthHeader(),
            }),
            body: JSON.stringify(body)
        })
        .then(res => {
            // Fin du watch
            stopWatch(traceId, res);
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.status + "/" + res.statusText);
            }
        })
        .then(data => {
            if (data.status === "ERR") {
                throw new Error(data);
            }
            return data;
        })
        .catch(e => {
            console.error("[WS traceId=" + traceId + "] < Erreur lors de l'appel HTTP [" + fullURL + "]", e);
            throw new Error(e);
        })
}