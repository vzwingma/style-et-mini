import APIResultFormModel from "../form.result.generic.model";
import CapsuleTemporelleModel from "./capsuleTemporelle.model";

/**
 * Modèle représentant un résultat d'appel avec le backend
 */
interface APIResultFormCapsuleModel extends APIResultFormModel {
    capsule? : CapsuleTemporelleModel;
}
export default APIResultFormCapsuleModel;