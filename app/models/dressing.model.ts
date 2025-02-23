import { DressingType } from "@/constants/AppEnum";

/**
 * Modèle représentant une taille de vetements
 */
export default interface DressingModel {
    readonly _id: string;
    readonly libelle: string;
    readonly type: DressingType;
}