import ParamVetementsFormModel from "../models/params/paramVetementsForm.model";
import { ID_NEW_ELEMENT, ParametragesVetementEnum } from "./AppEnum";


/**
 * L'URL de l'API.
 */
export const API_URL  = process.env.BACKEND_URL  ?? process.env.EXPO_PUBLIC_BACKEND_URL  ?? "http://192.168.1.145:5000/";
export const API_AUTH = process.env.BACKEND_AUTH ?? process.env.EXPO_PUBLIC_BACKEND_AUTH ?? "dev";
export const API_PWD  = process.env.BACKEND_PWD  ?? process.env.EXPO_PUBLIC_BACKEND_PWD  ?? "dev";

export const API_S3_URL = process.env.S3_URL ?? process.env.EXPO_PUBLIC_S3_URL ?? "https://d31c3dsgaaj32d.cloudfront.net/";


export enum API_VERBS {
    GET     = "GET",
    POST    = "POST",
    PUT     = "PUT",
    DELETE  = "DELETE"
}

/**
 * Paramètres pour les services.
 */
export const enum SERVICES_PARAMS {
    ID_DRESSING = "<IDD>",
    ID_VETEMENT = "<IDV>",
    ID_PARAM    = "<IDP>",
    ID_TENUE    = "<IDT>",
    ID_CAPSULE  = "<IDC>",
}

/**
 * L'URI racine pour les requêtes API.
 */
const ROOT_URI   = "api/v1";
const GET_PARAMS = ROOT_URI+"/params/vetements/";


/**
 * URLs pour différents services.
 */
export enum SERVICES_URL {
    SERVICE_CONFIG = ROOT_URI+"/status",
    
    SERVICE_PARAMS_TYPE_VETEMENTS   = GET_PARAMS + ParametragesVetementEnum.TYPES,
    SERVICE_PARAMS_TAILLES_MESURES  = GET_PARAMS + ParametragesVetementEnum.TAILLES,
    SERVICE_PARAMS_USAGES           = GET_PARAMS + ParametragesVetementEnum.USAGES,
    SERVICE_PARAMS_MARQUES          = GET_PARAMS + ParametragesVetementEnum.MARQUES,
    SERVICE_PARAMS_ETATS            = GET_PARAMS + ParametragesVetementEnum.ETATS,

    SERVICE_DRESSINGS       = ROOT_URI              +"/dressing",
    SERVICE_DRESSING_BY_ID  = SERVICE_DRESSINGS     +"/"+SERVICES_PARAMS.ID_DRESSING,
    SERVICE_VETEMENTS       = SERVICE_DRESSING_BY_ID+"/vetements",
    SERVICE_VETEMENTS_BY_ID = SERVICE_VETEMENTS     +"/"+SERVICES_PARAMS.ID_VETEMENT,
    SERVICE_VETEMENTS_IMAGE = SERVICE_VETEMENTS_BY_ID+"/image",

    SERVICE_TENUES          = SERVICE_DRESSING_BY_ID+"/tenues",
    SERVICE_TENUES_BY_ID    = SERVICE_TENUES +"/"+SERVICES_PARAMS.ID_TENUE,

    SERVICE_CAPSULES        = SERVICE_DRESSING_BY_ID+"/capsules",
    SERVICE_CAPSULES_BY_ID  = SERVICE_CAPSULES +"/"+SERVICES_PARAMS.ID_CAPSULE,
}



/**
 * Retourne l'URL du service API correspondant au type de paramètre fourni.
 *
 * @param form - Objet contenant les informations nécessaires pour déterminer l'URL.
 *   - `typeParam` : Le type de paramètre (exemple : TYPE, TAILLES, MARQUES, etc.).
 *   - `id` : Identifiant optionnel pour un paramètre spécifique.
 *
 * @returns L'URL du service API sous forme de `SERVICES_PARAMS` si le type de paramètre est valide,
 *          ou `null` si le type de paramètre est inconnu.
 *
 * @remarks
 * - Si un `id` est fourni dans le formulaire, il sera ajouté à l'URL générée.
 * - En cas de type de paramètre inconnu, une erreur sera loguée dans la console.
 */
export function getUrlAPIParametres(form: ParamVetementsFormModel) : SERVICES_URL | null {
    let url = '';
    switch (form.typeParam) {
        case ParametragesVetementEnum.TYPES:
            url = SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS;
            break;
        case ParametragesVetementEnum.TAILLES:
            url = SERVICES_URL.SERVICE_PARAMS_TAILLES_MESURES;
            break;
        case ParametragesVetementEnum.MARQUES:
            url = SERVICES_URL.SERVICE_PARAMS_MARQUES;
            break;
        case ParametragesVetementEnum.ETATS:
            url = SERVICES_URL.SERVICE_PARAMS_ETATS;
            break;
        case ParametragesVetementEnum.USAGES:
            url = SERVICES_URL.SERVICE_PARAMS_USAGES;
            break;
        default:
            console.error("Type de paramètre inconnu", form.typeParam);
            return null;
    };
    if(form.id !== null && form.id !== undefined && form.id !== ID_NEW_ELEMENT) {
        url = url + "/" + SERVICES_PARAMS.ID_PARAM;
    }
    return url as SERVICES_URL;
}
/**
 * Paramètres clé-valeur pour les URL
 */
export interface KeyValueParams {
    key: SERVICES_PARAMS;
    value: string;
}
