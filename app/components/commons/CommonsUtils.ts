import VetementModel from "@/app/models/vetements.model";

// Fonction de tri alphanumérique
export function alphanumSort(a: string, b: string) {
    return a.localeCompare(b, 'fr', { numeric: true });
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