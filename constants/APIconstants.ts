

/**
 * L'URL de l'API.
 */
export const API_URL = process.env.BACKEND_URL ?? process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://192.168.1.145:5000/";
export const API_AUTH = process.env.BACKEND_AUTH ?? process.env.EXPO_PUBLIC_BACKEND_AUTH;


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
    ID_DRESSING         = "<IDD>",
    ID_VETEMENT         = "<IDV>"
}

/**
 * L'URI racine pour les requêtes API.
 */
const ROOT_URI = "api/v1";
const GET_PARAMS = ROOT_URI+"/params/vetements";


/**
 * URLs pour différents services.
 */
export enum SERVICES_URL {
    SERVICE_CONFIG = ROOT_URI+"/status",
    
    SERVICE_PARAMS_TYPE_VETEMENTS   = GET_PARAMS+"/types",
    SERVICE_PARAMS_TAILLES_MESURES  = GET_PARAMS+"/taillesMesures",
    SERVICE_PARAMS_USAGES           = GET_PARAMS+"/usages",
    SERVICE_PARAMS_ETATS           = GET_PARAMS+"/etats",

    SERVICE_DRESSINGS       = ROOT_URI+"/dressing",
    SERVICE_DRESSING_BY_ID  = SERVICE_DRESSINGS+"/"+SERVICES_PARAMS.ID_DRESSING,
    SERVICE_VETEMENTS       = SERVICE_DRESSING_BY_ID+"/vetements",
    SERVICE_VETEMENTS_BY_ID = SERVICE_VETEMENTS+"/"+SERVICES_PARAMS.ID_VETEMENT
}


/**
 * Paramètres clé-valeur pour les URL
 */
export interface KeyValueParams {
    key: SERVICES_PARAMS;
    value: string;
}
