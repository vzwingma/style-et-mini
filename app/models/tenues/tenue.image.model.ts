/**
 * Modèle représentant une image d'un vetement dans une tenue
 */
interface TenueImageModel {
    s3uri?              : string;
    readonly hauteur?   : number;
    readonly largeur?   : number;
}


export default TenueImageModel;