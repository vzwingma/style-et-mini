

/**
 * L'URL de l'API.
 */
export const API_URL = process.env.BACKEND_URL ?? process.env.EXPO_PUBLIC_BACKEND_URL ?? "http://localhost:5000/";
export const API_AUTH = process.env.BACKEND_AUTH ?? process.env.EXPO_PUBLIC_BACKEND_AUTH;

/**
 * Paramètres pour les services.
 */
export const enum SERVICES_PARAMS {
    IDX         = "<IDX>",
    TYPE        = "<TYPE>"
}

/**
 * L'URI racine pour les requêtes API.
 */
const ROOT_URI = "api/v1";
const GET_PARAMS = ROOT_URI+"/params";


/**
 * URLs pour différents services.
 */
export enum SERVICES_URL {
    GET_CONFIG = ROOT_URI+"/status",
    
    GET_PARAM_TYPE_VETEMENTS = GET_PARAMS+"/typeVetements",
    GET_PARAM_TAILLES_MESURES = GET_PARAMS+"/taillesMesures",
    
    GET_DRESSINGS = ROOT_URI+"/dressing",
    GET_DRESSING_BY_ID = GET_DRESSINGS+"/"+SERVICES_PARAMS.IDX
}


/**
 * Paramètres clé-valeur pour les URL
 */
export interface KeyValueParams {
    key: SERVICES_PARAMS;
    value: string;
}
