import { CaracteristiqueVetementEnum } from "@/app/constants/AppEnum";

/**
 * Modèle représentant un filtre pour la liste des vêtements
 */
 interface VetementFiltreModel {
    readonly id             : string;
    readonly libelle        : string;
    readonly type           : CaracteristiqueVetementEnum;
    readonly typeLibelle?   : string;
    readonly isType?        : boolean;
}
export default VetementFiltreModel;