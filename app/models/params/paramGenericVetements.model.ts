import { CategorieDressingEnum, TypeTailleEnum } from "@/app/constants/AppEnum";
import GenericModel from "../generic.model";

/**
 * Modèle représentant un type générique de param de vetements
 */
interface ParamGenericVetementsModel extends GenericModel{
    readonly categories : CategorieDressingEnum[];
    readonly type?      : TypeTailleEnum; 
    readonly tri?       : number;
    readonly nombreVetements?: number;
}
export default ParamGenericVetementsModel;