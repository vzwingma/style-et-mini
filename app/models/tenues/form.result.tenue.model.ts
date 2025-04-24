import APIResultFormModel from "../form.result.generic.model";
import TenueModel from "./tenue.model";

/**
 * Modèle représentant un résultat d'appel avec le backend
 */
interface APIResultFormTenueModel extends APIResultFormModel {
    tenue?              : TenueModel;
}
export default APIResultFormTenueModel;