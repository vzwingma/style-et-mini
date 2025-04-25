import APIResultFormModel from "../form.result.generic.model";
import VetementModel from "./vetements.model";

/**
 * Modèle représentant un résultat d'appel avec le backend
 */
interface APIResultFormVetementModel extends APIResultFormModel {
    vetement?           : VetementModel;
}
export default APIResultFormVetementModel;