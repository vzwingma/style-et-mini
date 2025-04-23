import GenericModel from "../generic.model";

/**
 * Modèle représentant une caracatéristique de vetements
 */
interface VetementCaracteristiquesModel extends GenericModel {
    // Ajout de la propriété petite pour les tailles
    readonly petite?    : boolean;
}
export default VetementCaracteristiquesModel;