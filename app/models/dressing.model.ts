import { CategorieDressingEnum } from "@/app/constants/AppEnum";
import GenericModel from "./generic.model";

/**
 * Modèle représentant une taille de vetements
 */
interface DressingModel extends GenericModel{
    readonly categorie  : CategorieDressingEnum;
}
export default DressingModel;