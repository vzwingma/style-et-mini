import DressingModel from "../dressing.model";
import GenericModel from "../generic.model";
import VetementImageModel from "../vetements/vetements.image.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface TenueVetementModel extends GenericModel {
    image?              : VetementImageModel | null;
}
export default TenueVetementModel;