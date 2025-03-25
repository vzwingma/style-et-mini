/**
 * Modèle représentant une image d'un vetement dans le formulaire
 */
interface VetementImageModel {
    readonly id           : string;
    readonly contenu      : string;
    readonly hauteur      : number;
    readonly largeur      : number;
}


export default VetementImageModel;