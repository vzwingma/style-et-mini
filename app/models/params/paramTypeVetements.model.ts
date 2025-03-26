import { TypeTailleEnum } from "@/constants/AppEnum";
import ParamGenericVetementsModel from "./paramGenericVetements.model";

/**
 * Modèle représentant un type de vetements
 */
interface ParamTypeVetementsModel extends ParamGenericVetementsModel {
    readonly typeTaille : TypeTailleEnum
}
export default ParamTypeVetementsModel;