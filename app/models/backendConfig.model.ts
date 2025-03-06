/**
 * Modèle représentant la configuration du backend.
 */

interface BackendConfigModel {
    readonly status: string;
    readonly version?: string;
    readonly env?: string;
}
export default  BackendConfigModel;