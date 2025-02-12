/**
 * Modèle représentant la configuration du backend.
 */
class BackendConfigModel {
    readonly status: string;

    /**
     * Constructeur
     */
    constructor({ status}: BackendConfigModel) {
        this.status = status;
    }
}
export default BackendConfigModel;