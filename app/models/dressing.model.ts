import { DressingType } from "@/constants/AppEnum";
import DressingVetementModel from "./dressing.vetements.model";

/**
 * Modèle représentant une taille de vetements
 */
export default interface DressingModel {
    readonly _id: string;
    readonly libelle: string;
    readonly type: DressingType;
    vetements: DressingVetementModel[];
}