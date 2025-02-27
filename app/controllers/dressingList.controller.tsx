import VetementModel from "../models/vetements.model";
/**
 * Groupe les vêtements par type.
 *
 * @param {VetementModel[]} vetements - La liste des vêtements à grouper.
 * @returns {Map<VetementCaracteristiquesModel, VetementModel[]>} Une map où la clé est le type de vêtement et la valeur est un tableau de vêtements de ce type.
 */
export function groupeVetementByType(vetements: VetementModel[]): Map<string, VetementModel[]> {
  const map = new Map<string, VetementModel[]>();

  vetements.forEach((vetement) => {
    const type = vetement.type.libelle;
    if (map.has(type)) {
      map.get(type)?.push(vetement);
    } else {
      map.set(type, [vetement]);
    }
  });
  return map;
}