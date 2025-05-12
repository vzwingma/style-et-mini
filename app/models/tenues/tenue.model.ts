import { StatutVetementEnum } from "@/app/constants/AppEnum";
import DressingModel from "../dressing.model";
import GenericModel from "../generic.model";
import TenueVetementModel from "./tenue.vetements.model";
import TenueImageModel from "./tenue.image.model";

/**
 * Modèle représentant une tenue avec le backend
 */
interface TenueModel extends GenericModel {
    dressing            : DressingModel;
    vetements?          : TenueVetementModel[] | null;
    statut              : StatutVetementEnum | null;
    image?              : TenueImageModel | null;
}
export default TenueModel;