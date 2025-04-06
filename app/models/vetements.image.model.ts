/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
interface VetementImageModel {
    readonly id?        : string;
    readonly nom?       : string;
    readonly hauteur?   : number;
    readonly largeur?   : number;
    readonly base64?    : Buffer;
}


export default VetementImageModel;