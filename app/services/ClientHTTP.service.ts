import { API_AUTH, API_URL, API_VERBS, KeyValueParams, SERVICES_URL } from '@/constants/APIconstants';
import 'react-native-get-random-values';
import { v7 as uuidGen } from 'uuid';



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
 * Appel HTTP vers le backend
 * @param httpMethod méthode HTTP
 * @param path chemin de la ressource
 * @param params paramètres (optionnels)
 * @param body body de la requête (optionnel)
 * @returns réponse
 */
export function callPOSTBackend(path: SERVICES_URL, params?: KeyValueParams[], body?: any): Promise<any> {
    return callBackend(API_VERBS.POST, path, params, body);
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
            'Authorization': 'Basic ' + API_AUTH
        }),
        body: JSON.stringify(body)
    })
        .then(res => {
            // Fin du watch
            stopWatch(traceId, res);
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            if (data.status === "ERR") {
                throw new Error(data.message);
            }
            return data;
        })
        .catch(e => {
            console.error("[WS traceId=" + traceId + "] < Erreur lors de l'appel HTTP [" + fullURL + "]", e);
            e.message += ' @ url:' + fullURL; 
            throw new Error(e);
        })
}