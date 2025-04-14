import { CategorieDressingEnum, TypeTailleEnum } from "@/app/constants/AppEnum";

/**
 * Modèle représentant un type générique de param de vetements
 */
interface ParamGenericVetementsModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categories : CategorieDressingEnum[];
    readonly type?      : TypeTailleEnum; 
    readonly tri?       : number;
}
export default ParamGenericVetementsModel;