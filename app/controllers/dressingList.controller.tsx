import { CaracteristiqueVetementEnum, StatutVetementEnum } from "@/constants/AppEnum";
import DressingListFiltreModel from "../models/dressingListeFiltre.model";
import VetementCaracteristiquesModel from "../models/vetementCaracteristique.model";
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



/**
 * Sélectionne les filtres disponibles en fonction des identifiants de filtres sélectionnés.
 *
 * @param {string[]} selectedIdFiltres - Les identifiants des filtres sélectionnés.
 * @param {DressingListFiltreModel[]} filtresDisponibles - La liste des filtres disponibles.
 * @param {Function} setSelectedFiltres - La fonction pour mettre à jour les filtres sélectionnés.
 * @returns {void}
 */
export function selectFilters(selectedIdFiltres: string[], filtresDisponibles: DressingListFiltreModel[], setSelectedFiltres: Function ): void {
  setSelectedFiltres(filtresDisponibles.filter(filtre => selectedIdFiltres.includes(filtre.id)));
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

      return filtres.some(filtre => {
        if (type === CaracteristiqueVetementEnum.TYPE) {
          return vetement.type.id === filtre.id;
        } else if (type === CaracteristiqueVetementEnum.TAILLES) {
          return vetement.taille.id === filtre.id;
        } else if (type === CaracteristiqueVetementEnum.USAGES) {
          return vetement.usages.some(usage => usage.id === filtre.id);
        } else if (type === CaracteristiqueVetementEnum.STATUT) {
          return vetement.statut === filtre.libelle;
        }
        return false;
      });
    });
  });

  return vetementsInDressing;
};


/**
 * 
 * @param vetements 
 * @returns 
 */
export function getFiltersAvailables(vetements: VetementModel[]): DressingListFiltreModel[] {

  let filtres: DressingListFiltreModel[] = [];

  // Recalcul des filtres disponibles
  addCaracteristiqueInFilter(filtres, vetements.map(vetement => vetement.type), CaracteristiqueVetementEnum.TYPE);
  addCaracteristiqueInFilter(filtres, vetements.map(vetement => vetement.taille), CaracteristiqueVetementEnum.TAILLES);
  addCaracteristiqueInFilter(filtres, vetements.flatMap(vetement => vetement.usages), CaracteristiqueVetementEnum.USAGES);

  const dataStatuts: StatutVetementEnum[] = vetements.map(vetement => vetement.statut);
  addStatutInFilter(filtres, dataStatuts);
  filtres.sort((a, b) => (a.type + a.libelle).localeCompare((b.type + b.libelle))); // Tri par ordre alphabétique

  return filtres;
}


/**
 * Ajoute une caractéristique dans les filtres si elle n'est pas déjà présente.
 *
 * @param {DressingListFiltreModel[]} filtres - La liste des filtres à mettre à jour.
 * @param {VetementCaracteristiquesModel[]} dataVetement - La liste des caractéristiques des vêtements.
 * @param {CaracteristiqueVetementEnum} type - Le type de caractéristique de vêtement.
 */
function addCaracteristiqueInFilter(filtres: DressingListFiltreModel[],
  dataVetement: VetementCaracteristiquesModel[],
  type: CaracteristiqueVetementEnum) {

  dataVetement.filter((value, index, self) => self.indexOf(value) === index)
    .forEach(data => {
      if (!filtres.find(filtre => filtre.id === data.id)) {
        filtres.push({
          id: data.id,
          libelle: data.libelle,
          type: type,
        });
      }
    });
}


/**
 * Ajoute une caractéristique dans les filtres si elle n'est pas déjà présente.
 *
 * @param {DressingListFiltreModel[]} filtres - La liste des filtres à mettre à jour.
 * @param {VetementCaracteristiquesModel[]} dataVetement - La liste des caractéristiques des vêtements.
 * @param {CaracteristiqueVetementEnum} type - Le type de caractéristique de vêtement.
 */
function addStatutInFilter(filtres: DressingListFiltreModel[], dataStatuts: StatutVetementEnum[]) {

  if (dataStatuts.length <= 1) {
    return
  }

  dataStatuts.filter((value, index, self) => self.indexOf(value) === index)
    .forEach(data => {

      const idStatut = data === StatutVetementEnum.ACTIF ? '1' : '2';

      if (!filtres.find(filtre => filtre.id === idStatut)) {
        filtres.push({
          id: idStatut,
          libelle: data,
          type: CaracteristiqueVetementEnum.STATUT
        });
      }
    });
}
