import { CategorieDressingEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant une taille de vetements
 */
interface DressingModel {
    readonly id         : string;
    readonly libelle    : string;
    readonly categorie  : CategorieDressingEnum;
}
export default DressingModel;