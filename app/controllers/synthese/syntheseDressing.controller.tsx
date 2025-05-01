import { alphanumSort } from "@/app/components/commons/CommonsUtils";
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
    return 0;
  }
  return Vetements.filter((vetement) => vetement.prix?.[type] !== undefined && vetement.prix?.[type] !== null).length;
}


/**
 * Calcule le nombre de vêtements ayant un prix défini pour un type donné.
 *
 * @param Vetements - Tableau des modèles de vêtements à analyser.
 * @param type - Type de prix à vérifier ("achat" ou "neuf").
 * @returns Le nombre de vêtements avec un prix défini pour le type donné, ou `null` si le tableau est vide.
 */
export function getVetementsSansPrix(Vetements: VetementModel[], type: "achat" | "neuf"): string[] {
  if (Vetements.length === 0) {
    return [];
  }
  return Vetements.filter((vetement) => vetement.prix?.[type] === undefined || vetement.prix?.[type] === null || vetement.prix?.[type] === 0 )
                  .map((vetement) => vetement.libelle)
                  .sort(alphanumSort);
}

/**
 * Calcule le nombre de vêtements associés à une collection.
 *
 * @param vetements - Liste des modèles de vêtements à analyser.
 * @returns Le nombre de vêtements ayant une collection définie.
 *
 * Cette fonction filtre les vêtements qui n'ont pas de collection définie
 * (valeurs `undefined`, `null` ou chaîne vide) et les regroupe dans un ensemble
 * unique basé sur leur identifiant et libellé. Elle retourne ensuite la différence
 * entre le nombre total de vêtements et le nombre de vêtements sans collection.
 */
export function getNbVetementAvecCollections(vetements: VetementModel[]): number {
  if (vetements.length === 0) {
    return 0;
  }
  
  const sansCollection = getLibelleVetementsSansCollections(vetements);
  return vetements.length - sansCollection.length;
}



/**
 * Retourne une liste des libellés des vêtements qui ne sont associés à aucune collection.
 * 
 * @param vetements - Tableau des modèles de vêtements à analyser.
 * @returns Une liste triée et sans doublons des libellés des vêtements n'ayant pas de collection.
 */
export function getLibelleVetementsSansCollections(vetements: VetementModel[]): string[] {
  if (vetements.length === 0) {
    return [];
  }
  
  return vetements.filter((vetement) => vetement.collection === undefined || vetement.collection === null || vetement.collection === "")
                  .map((vetement) => vetement.libelle)
                  .filter((libelle, index, self) => self.indexOf(libelle) === index) // Filtre les doublons
                  .sort(alphanumSort);
};



/**
 * Calcule le nombre de vêtements ayant un prix défini pour un type donné.
 *
 * @param Vetements - Tableau des modèles de vêtements à analyser.
 * @param type - Type de prix à vérifier ("achat" ou "neuf").
 * @returns Le nombre de vêtements avec un prix défini pour le type donné, ou `null` si le tableau est vide.
 */
export function getCollections(Vetements: VetementModel[]): string[] {
  
  if (Vetements.length === 0) {
    return [];
  }

  const collections: Set<string> = new Set();
  Vetements.map((vetement) => vetement.collection)
    .filter((collection) => collection !== undefined && collection !== null)
    .filter((collection) => collection !== "")
    .sort((a, b) => a.localeCompare(b))
    .forEach((collection) => {
      collections.add(collection);
    });
  return Array.from(collections);
}
