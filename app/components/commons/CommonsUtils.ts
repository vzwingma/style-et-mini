import VetementImageModel from "@/app/models/vetements.image.model";
import VetementModel from "@/app/models/vetements.model";

// Fonction de tri alphanumérique
/**
 * Trie deux chaînes de caractères en utilisant un ordre alphanumérique.
 * 
 * Cette fonction utilise `localeCompare` avec les paramètres de la langue française
 * et l'option `numeric` activée, ce qui permet de comparer les chaînes en tenant
 * compte des valeurs numériques dans les chaînes.
 * 
 * @param a - La première chaîne à comparer.
 * @param b - La seconde chaîne à comparer.
 * @returns Un nombre négatif si `a` précède `b`, un nombre positif si `a` suit `b`,
 *          ou 0 si les deux chaînes sont égales.
 */
export function alphanumSort(a: string, b: string) {
    return a.localeCompare(b, 'fr', { numeric: true });
}

// Fonction de tri numérique
/**
 * Trie deux nombres dans l'ordre croissant.
 *
 * @param a - Le premier nombre à comparer.
 * @param b - Le second nombre à comparer.
 * @returns Une valeur négative si `a` est inférieur à `b`, 
 *          une valeur positive si `a` est supérieur à `b`, 
 *          ou 0 si les deux sont égaux.
 */
export function numSort(a: number, b: number) {
    return a - b;
}




/**
 * Redimensionne une image en fonction d'une taille maximale tout en conservant son ratio.
 *
 * @param image - L'image à redimensionner, représentée par un objet `VetementImageModel`.
 *                Doit contenir les propriétés `contenu`, `largeur` et `hauteur`.
 * @param maxSize - La taille maximale (en pixels) pour la largeur ou la hauteur de l'image.
 * @returns Une nouvelle instance de `VetementImageModel` avec les dimensions redimensionnées
 *          tout en conservant le ratio d'origine. Si l'image ou son contenu est invalide,
 *          retourne l'image d'origine.
 */
export function resizeImage(image: VetementImageModel, maxSize : number): VetementImageModel {
    if (image?.contenu) {
        const ratioImage = image.largeur / image.hauteur;
        if(ratioImage > 1) {
            return {
                ...image,
                contenu: image.contenu,
                largeur: maxSize,
                hauteur: maxSize / ratioImage
            }
        } else {
            return {
                ...image,
                contenu: image.contenu,
                largeur: maxSize * ratioImage,
                hauteur: maxSize
            }
        }
    }
    return image;
}



// Fonction de tri des vêtements
export function vetementSort(a: VetementModel, b: VetementModel) {
    if (a.taille.libelle === b.taille.libelle) {

        if (a.taille.petite === b.taille.petite) {
            return alphanumSort(a.libelle, b.libelle);
        }
        return a.taille.petite ? -1 : 1;
    }
    else {
        return alphanumSort(a.taille.libelle, b.taille.libelle);
    };
}


/**
 * Retourne l'icône du type de vêtement (cf. https://www.flaticon.com/)
 * @param typeVetements nom du type de vêtement
 * @returns l'icône 
 */
export function getTypeVetementIcon(typeVetements: string): any {
    typeVetements = typeVetements.toLocaleLowerCase();
    switch (typeVetements) {
        case 'accessoires':
            return require('@/assets/icons/accessories-outline.png');
        case 'accessoire de bain':
            return require('@/assets/icons/swimming-outline.png');
        case 'body':
            return require('@/assets/icons/body-outline.png');
        case 'chaussettes':
            return require('@/assets/icons/socks-outline.png');
        case 'chaussures':
            return require('@/assets/icons/shoes-outline.png');
        case 'culotte/shorty':
            return require('@/assets/icons/underwear-outline.png');
        case 'débardeur':
            return require('@/assets/icons/undershirt-outline.png');
        case 'gilet':
            return require('@/assets/icons/sweater-outline.png');            
        case 'legging':
            return require('@/assets/icons/leggins-outline.png');
        case 'maillot de bain':
            return require('@/assets/icons/swim-clothes-outline.png');
        case 'manteau':
            return require('@/assets/icons/coat-outline.png');
        case 'pantalon':
            return require('@/assets/icons/pants-outline.png');
        case 'pyjama':
            return require('@/assets/icons/pyjama-outline.png');
        case 'robe':
            return require('@/assets/icons/dress2-outline.png');
        case 'short':
            return require('@/assets/icons/shorts-outline.png');
        case 'sweat':
            return require('@/assets/icons/sweat-shirt-outline.png');
        case 't-shirt':
            return require('@/assets/icons/tshirt-outline.png');
        case 'tshirt':
            return require('@/assets/icons/tshirt-outline.png');
        default:
            return require('@/assets/icons/clothes-outline.png');
    }
}