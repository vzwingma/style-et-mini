import DressingModel from "../dressing.model";
import GenericModel from "../generic.model";
import CapsuleCritereModel from "./capsuleCritere";

interface CapsuleTemporelleModel extends GenericModel {
    dressing: DressingModel;
    criteres     : CapsuleCritereModel[];
    nbrVetements          : {
        capsule    : number;
        dressing?  : number;
    };   
    commentaire? : string;
}
export default CapsuleTemporelleModel;