import ParamGenericVetementsChaussuresModel from "./paramGenericVetementsChaussures.model";

/**
 * Modèle représentant une taille de vetements
 */
interface ParamTailleVetementsModel extends ParamGenericVetementsChaussuresModel {
    readonly tri        : number;
}
export default ParamTailleVetementsModel;