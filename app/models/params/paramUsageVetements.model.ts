import { CategorieDressingEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant un type d'usage de vetements
 */
interface ParamUsageVetementsModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categories : CategorieDressingEnum[];
}
export default ParamUsageVetementsModel;