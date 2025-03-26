import { TypeTailleEnum } from "@/constants/AppEnum";
import ParamGenericVetementsModel from "./paramGenericVetements.model";

/**
 * Modèle représentant une taille de vetements
 */
interface ParamTailleVetementsModel extends ParamGenericVetementsModel {
    readonly tri        : number;
    readonly type       : TypeTailleEnum;
}
export default ParamTailleVetementsModel;