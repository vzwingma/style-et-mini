import { SaisonVetementEnum, StatutVetementEnum } from "@/app/constants/AppEnum";
import DressingModel from "../dressing.model";
import VetementCaracteristiquesModel from "./vetementCaracteristique.model";
import VetementImageModel from "./vetements.image.model";
import VetementPrixModel from "./vetements.prix.model";
import GenericModel from "../generic.model";

/**
 * Modèle représentant un vetement avec le backend
 */
interface VetementModel extends GenericModel {
    dressing            : DressingModel;
    image?              : VetementImageModel | null;

    readonly type       : VetementCaracteristiquesModel;
    readonly taille     : VetementCaracteristiquesModel;

    readonly usages     : VetementCaracteristiquesModel[];
    readonly saisons    : SaisonVetementEnum[];    
    readonly couleurs?  : string | null;

    etat?               : VetementCaracteristiquesModel;
    readonly collection?: string | null;
    readonly marque     : VetementCaracteristiquesModel;

    readonly prix?       : VetementPrixModel;
    readonly description?: string | null;
    statut               : StatutVetementEnum;
}
export default VetementModel;