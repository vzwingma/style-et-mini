import DressingModel from "../dressing.model";
import GenericModel from "../generic.model";

interface CapsuleTemporelleModel extends GenericModel {
    dressing: DressingModel;
    nombreVetements?: number;
}
export default CapsuleTemporelleModel;