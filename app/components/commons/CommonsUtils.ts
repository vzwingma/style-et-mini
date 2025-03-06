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
export function getTypeVetementIcon(typeVetements : string): any {
    typeVetements = typeVetements.toLocaleLowerCase();
    switch(typeVetements){
        case 'body':
            return require('@/assets/icons/body-outline.png');
        case 'robe':
            return require('@/assets/icons/dress-outline.png');
        case 'pantalon':
            return require('@/assets/icons/pants-outline.png');
        case 'short':
            return require('@/assets/icons/shorts-outline.png');
        case 'manteau':
            return require('@/assets/icons/coat-outline.png');
        case 'tshirt':
            return require('@/assets/icons/tshirt-outline.png');
        case 'chaussures':
            return require('@/assets/icons/shoes-outline.png');
        default:
            return require('@/assets/icons/clothes-outline.png');
    }
 }