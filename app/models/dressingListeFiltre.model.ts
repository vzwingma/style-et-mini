import { CaracteristiqueVetementEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant un filtre pour la liste des vêtements
 */
 interface DressingListFiltreModel {
    readonly id             : string;
    readonly libelle        : string;
    readonly typeLibelle    : string;
    readonly type           : CaracteristiqueVetementEnum;
}
export default DressingListFiltreModel;