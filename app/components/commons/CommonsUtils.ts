import VetementModel from "@/app/models/vetements.model";

// Fonction de tri alphanumérique
export function alphanumSort(a: string, b: string) {
    return a.localeCompare(b, 'fr', { numeric: true });
}

// Fonction de tri numérique
export function triSort(a: number, b: number) {
    return a - b;
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