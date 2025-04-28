import VetementModel from "@/app/models/vetements/vetements.model";

/**
 * Calcule la valeur totale des prix des vêtements dans une liste donnée.
 *
 * @param {VetementModel[]} Vetements - Liste des modèles de vêtements à analyser.
 * @param {"achat" | "neuf"} type - Type de prix à calculer ("achat" ou "neuf").
 * @returns {number | null} La somme des prix des vêtements si la liste n'est pas vide,
 *                          ou `null` si la liste est vide.
 */
export function getDressingValue(Vetements: VetementModel[], type: "achat" | "neuf"): number | null {
  if (Vetements.length === 0) {
    return null;
  }

  const totalPrice = Vetements.reduce((acc, vetement) => {
    const price = vetement.prix?.[type] ?? 0;
    return acc + (isNaN(price) ? 0 : price);
  }, 0);

  return Math.round(totalPrice);
}

/**
 * Calcule le nombre de vêtements ayant un prix défini pour un type donné.
 *
 * @param Vetements - Tableau des modèles de vêtements à analyser.
 * @param type - Type de prix à vérifier ("achat" ou "neuf").
 * @returns Le nombre de vêtements avec un prix défini pour le type donné, ou `null` si le tableau est vide.
 */
export function getNbVetementsAvecPrix(Vetements: VetementModel[], type: "achat" | "neuf"): number | null {
  if (Vetements.length === 0) {
    return null;
  }
  return Vetements.filter((vetement) => vetement.prix?.[type] !== undefined && vetement.prix?.[type] !== null).length;
}


export function getNbVetementAvecCollections(vetements: VetementModel[]): number {
  if (vetements.length === 0) {
    return 0;
  }
  
  const collections: Set<string> = new Set();
  vetements
    .filter((vetement) => vetement.collection === undefined || vetement.collection === null || vetement.collection === "")
    .forEach((vetement) => {
      collections.add(vetement.id + "-" + vetement.libelle);
    });
  
  console.log("Vetements sans collection : ", collections);
  return vetements.length - collections.size;
}

/**
 * Calcule le nombre de vêtements ayant un prix défini pour un type donné.
 *
 * @param Vetements - Tableau des modèles de vêtements à analyser.
 * @param type - Type de prix à vérifier ("achat" ou "neuf").
 * @returns Le nombre de vêtements avec un prix défini pour le type donné, ou `null` si le tableau est vide.
 */
export function getCollections(Vetements: VetementModel[]): number {
  if (Vetements.length === 0) {
    return 0;
  }
  
  
  const collections: Set<string> = new Set();
  Vetements.map((vetement) => vetement.collection)
    .filter((collection) => collection !== undefined && collection !== null)
    .filter((collection) => collection !== "")
    .sort()
    .forEach((collection) => {
      collections.add(collection);
    });
  
  console.log("Collections vetements : ", collections);
  return collections.size;
}
