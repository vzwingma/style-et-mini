import { CategorieDressingEnum } from "@/app/constants/AppEnum";

/**
 * Modèle représentant un type générique de param de vetements
 */
interface ParamGenericVetementsModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categories : CategorieDressingEnum[];
}
export default ParamGenericVetementsModel;