import { SaisonVetementEnum, StatutVetementEnum } from "@/constants/AppEnum";
import DressingModel from "./dressing.model";
import VetementCaracteristiquesModel from "./vetementCaracteristique.model";
import VetementImageModel from "./vetements.image.model";

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
    readonly saisons    : SaisonVetementEnum[];
    etat?               : VetementCaracteristiquesModel;
    
    readonly couleurs   : string;
    image?              : VetementImageModel | null;
    readonly description: string;
    statut              : StatutVetementEnum;
}
export default VetementModel;