import { StatutVetementEnum } from "@/constants/AppEnum";
import DressingModel from "./dressing.model";
import VetementCaracteristiquesModel from "./vetementCaracteristique.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface VetementModel {
    readonly id         : string;
    dressing            : DressingModel;
    readonly libelle    : string;
    readonly type       : VetementCaracteristiquesModel;
    readonly taille     : VetementCaracteristiquesModel;
    readonly usages     : VetementCaracteristiquesModel[];
    readonly etat?      : VetementCaracteristiquesModel;
    
    readonly couleurs   : string;
    readonly image?     : string;
    readonly description: string;
    readonly statut     : StatutVetementEnum;
}
export default VetementModel;