import { CaracteristiqueVetementEnum } from "@/app/constants/AppEnum";
import GenericModel from "../generic.model";

/**
 * Modèle représentant un critère de capsule
 */
 interface CapsuleCritereModel extends GenericModel {
    readonly type           : CaracteristiqueVetementEnum;
    readonly typeLibelle?   : string;
    readonly isType?        : boolean;
}
export default CapsuleCritereModel;