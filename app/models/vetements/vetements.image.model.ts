import TenueImageModel from "../tenues/tenue.image.model";

/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
interface VetementImageModel extends TenueImageModel {
    localUri?           : string;
    displayUri?         : string;
}


export default VetementImageModel;