import ParamGenericVetementsModel from "./paramGenericVetements.model";

/**
 * Modèle représentant un état de vetements
 */
interface ParamEtatVetementsModel extends ParamGenericVetementsModel {
    readonly tri        : number;
}
export default ParamEtatVetementsModel;