
/**
 * Modèle représentant une caracatéristique de vetements
 */
export default interface VetementCaracteristiquesModel {
    readonly id         : string;
    readonly libelle    : string;
    // Ajout de la propriété petite pour les tailles
    readonly petite?    : boolean;
}