import { StatutVetementEnum } from "@/app/constants/AppEnum";
import DressingModel from "../dressing.model";
import GenericModel from "../generic.model";

interface CapsuleTemporelleModel extends GenericModel {
    dressing: DressingModel;
    nombreVetements?: number;
    statut?: StatutVetementEnum;
}
export default CapsuleTemporelleModel;