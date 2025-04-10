import { CategorieDressingEnum, TypeTailleEnum } from "@/app/constants/AppEnum";

/**
 * Modèle représentant un type générique de param de vetements
 */
interface ParamVetementsFormModel {
    readonly id         : string;
    libelle             : string;
    categories          : CategorieDressingEnum[];
    type?               : TypeTailleEnum; 
    tri?                : number;

}
export default ParamVetementsFormModel;