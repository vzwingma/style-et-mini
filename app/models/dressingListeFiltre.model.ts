import { CaracteristiqueVetementEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant un filtre pour la liste des vêtements
 */
export default interface DressingListFiltreModel {
    readonly id             : string;
    readonly libelle        : string;
    readonly type           : CaracteristiqueVetementEnum;
}