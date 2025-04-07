/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
interface VetementImageModel {
    localUri?           : string;
    s3uri?              : string;
    displayUri?         : string;
    readonly hauteur?   : number;
    readonly largeur?   : number;
}


export default VetementImageModel;