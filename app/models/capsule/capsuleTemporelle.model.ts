import DressingModel from "../dressing.model";
import GenericModel from "../generic.model";
import CapsuleCritereModel from "./capsuleCritere";

interface CapsuleTemporelleModel extends GenericModel {
    dressing: DressingModel;
    criteres     : CapsuleCritereModel[];
    nbrVetements          : {
        capsule    : number | 0;
        dressing   : number | 0;
    };   
}
export default CapsuleTemporelleModel;