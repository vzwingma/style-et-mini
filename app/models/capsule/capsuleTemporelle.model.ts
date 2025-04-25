import { StatutVetementEnum } from "@/app/constants/AppEnum";
import DressingModel from "../dressing.model";
import GenericModel from "../generic.model";
import CapsuleCritereModel from "./capsuleCritere";

interface CapsuleTemporelleModel extends GenericModel {
    dressing: DressingModel;
    criteres     : CapsuleCritereModel[];
    nombreVetements?: number;
    statut?: StatutVetementEnum;
}
export default CapsuleTemporelleModel;