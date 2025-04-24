import { CaracteristiqueVetementEnum } from "@/app/constants/AppEnum";
import GenericModel from "../generic.model";

/**
 * Modèle représentant un filtre pour la liste des vêtements
 */
 interface VetementFiltreModel extends GenericModel {
    readonly type           : CaracteristiqueVetementEnum;
    readonly typeLibelle?   : string;
    readonly isType?        : boolean;
}
export default VetementFiltreModel;