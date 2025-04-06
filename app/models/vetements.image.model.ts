/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
interface VetementImageModel {
    readonly id?        : string;
    readonly uri?       : string;
    readonly hauteur?   : number;
    readonly largeur?   : number;
}


export default VetementImageModel;