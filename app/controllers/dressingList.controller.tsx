import { CaracteristiqueVetementEnum} from "../constants/AppEnum";
import DressingListFiltreModel from "../models/vetements/vetementFiltre.model";
import VetementModel from "../models/vetements/vetements.model";
/**
 * Groupe les vêtements par type.
 *
 * @param {VetementModel[]} vetements - La liste des vêtements à grouper.
 * @returns {Map<VetementCaracteristiquesModel, VetementModel[]>} Une map où la clé est le type de vêtement et la valeur est un tableau de vêtements de ce type.
 */
export function groupeVetementByType(vetements: VetementModel[]): Map<string, VetementModel[]> {
  const map = new Map<string, VetementModel[]>();

  vetements.forEach((vetement) => {
    const type = vetement.type.id;
    if (map.has(type)) {
      map.get(type)?.push(vetement);
    } else {
      map.set(type, [vetement]);
    }
  });
  return map;
}




/**
 * Filtre les vêtements dans le dressing en fonction des filtres sélectionnés.
 *
 * @param {VetementModel[]} vetementsInDressing - La liste des vêtements dans le dressing.
 * @param {DressingListFiltreModel[]} selectedFiltres - La liste des filtres sélectionnés.
 * @returns {VetementModel[]} - La liste des vêtements filtrés.
 *
 * Cette fonction regroupe les filtres par type de caractéristique de vêtement, puis filtre les vêtements
 * en fonction de chaque groupe de filtres. Si aucun filtre n'est sélectionné, elle retourne la liste complète
 * des vêtements dans le dressing.
 */
export function setVetementsFiltres(vetementsInDressing: VetementModel[], selectedFiltres: DressingListFiltreModel[]): VetementModel[] {

  if(selectedFiltres.length === 0) {
    return vetementsInDressing;
  }

  const groupedFiltres = new Map<CaracteristiqueVetementEnum, DressingListFiltreModel[]>();

  selectedFiltres.forEach(filtre => {
    if (groupedFiltres.has(filtre.type)) {
      groupedFiltres.get(filtre.type)?.push(filtre);
    } else {
      groupedFiltres.set(filtre.type, [filtre]);
    }
  });

  groupedFiltres.forEach((filtres, type) => {
    vetementsInDressing = vetementsInDressing.filter(vetement => {
      return filtres.some(filtre => filtreVetementByCaracteristique(vetement, type, filtre));
    });
  });

  return vetementsInDressing;
};


/**
 * Filtre un vêtement en fonction d'une caractéristique spécifique.
 *
 * @param vetement - Le modèle de vêtement à filtrer.
 * @param type - Le type de caractéristique à utiliser pour le filtrage.
 * @param filtre - Le modèle de filtre contenant les critères de filtrage.
 * @returns `true` si le vêtement correspond aux critères de filtrage, sinon `false`.
 */
function filtreVetementByCaracteristique(vetement: VetementModel, type: CaracteristiqueVetementEnum, filtre: DressingListFiltreModel): boolean {
  if (type === CaracteristiqueVetementEnum.TYPES) {
    return vetement.type.id === filtre.id;
  } else if (type === CaracteristiqueVetementEnum.TAILLES) {
    return vetement.taille.id === filtre.id;
  } else if (type === CaracteristiqueVetementEnum.USAGES) {
    return vetement.usages.some(usage => usage.id === filtre.id);
  } else if (type === CaracteristiqueVetementEnum.STATUT) {
    return vetement.statut === filtre.libelle;
  } else if (type === CaracteristiqueVetementEnum.MARQUES) {
    return vetement.marque?.id === filtre.id;
  } else if (type === CaracteristiqueVetementEnum.SAISON) {
    return vetement.saisons?.some(saison => saison === filtre.id) || vetement.saisons === undefined || vetement.saisons?.length < 1;
  }
  return false;
  }
