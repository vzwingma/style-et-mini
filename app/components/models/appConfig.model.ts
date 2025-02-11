/**
 * Modèle représentant la configuration du backend.
 */
class BackendConfig {
    readonly status: string;

    /**
     * Constructeur
     */
    constructor({ status}: BackendConfig) {
        this.status = status;
    }
}
export default BackendConfig;