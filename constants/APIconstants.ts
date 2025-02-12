

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
    DRESSING    = "<CMD>"
}

/**
 * L'URI racine pour les requêtes API.
 */
export const ROOT_URI = "api/v1";


/**
 * URLs pour différents services.
 */
export enum SERVICES_URL {
    GET_CONFIG = ROOT_URI+"/status",
    GET_TYPE_VETEMENTS = ROOT_URI+"/typeVetements",
}



/**
 * Paramètres clé-valeur pour les URL
 */
export interface KeyValueParams {
    key: SERVICES_PARAMS;
    value: string;
}
