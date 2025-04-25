import { CaracteristiqueVetementEnum, getLibelleSaisonVetementEnum, getLibelleStatutVetementEnum, SaisonVetementEnum, StatutVetementEnum } from "@/app/constants/AppEnum";
import VetementCaracteristiquesModel from "../../models/vetements/vetementCaracteristique.model";
import VetementModel from "../../models/vetements/vetements.model";
import { alphanumSort } from "../../components/commons/CommonsUtils";
import VetementFiltreModel from "../../models/vetements/vetementFiltre.model";


/**
 * Sélectionne les filtres disponibles en fonction des identifiants de filtres sélectionnés.
 *
 * @param {string[]} selectedIdFiltres - Les identifiants des filtres sélectionnés.
 * @param {DressingListFiltreModel[]} filtresDisponibles - La liste des filtres disponibles.
 * @param {Function} setSelectedFiltres - La fonction pour mettre à jour les filtres sélectionnés.
 * @returns {void}
 */
export function selectFilters(selectedIdFiltres: string[], filtresDisponibles: VetementFiltreModel[], setSelectedFiltres: Function): void {
  const selectTypeFiltre = (filtresDisponibles
    .filter(filtre => selectedIdFiltres.includes(filtre.id))
    .filter(filtre => !filtre.isType));
  setSelectedFiltres(selectTypeFiltre);
}



/**
 * Génère une liste de filtres disponibles à partir d'une liste de vêtements.
 *
 * @param vetements - Liste des modèles de vêtements à analyser.
 * @returns Une liste de modèles de filtres pour le dressing, triée par ordre alphabétique.
 *
 * Cette fonction effectue les opérations suivantes :
 * - Ajoute les caractéristiques des vêtements (type, taille, usages) aux filtres.
 * - Ajoute les valeurs des énumérations (statut, saisons) aux filtres.
 * - Trie les filtres par ordre alphabétique en fonction de leur type et libellé.
 */
export function calculFiltresPossibles(vetements: VetementModel[]): VetementFiltreModel[] {

  let filtres: VetementFiltreModel[] = [];

  const filtresTypes = addCaracteristiqueInFilter(vetements.map(vetement => vetement.type), CaracteristiqueVetementEnum.TYPES);
  const filtresTaille = addCaracteristiqueInFilter(vetements.map(vetement => vetement.taille), CaracteristiqueVetementEnum.TAILLES);  
  const filtresUsages = addCaracteristiqueInFilter(vetements.flatMap(vetement => vetement.usages), CaracteristiqueVetementEnum.USAGES);
  const filtresMarques = addCaracteristiqueInFilter(vetements.map(vetement => vetement.marque), CaracteristiqueVetementEnum.MARQUES);
  const filtresStatut = addEnumsInFilter(vetements.map(vetement => vetement.statut));
  const filtresSaisons = addEnumsInFilter(vetements.flatMap(vetement => vetement.saisons));

  // Recalcul des filtres disponibles
  return filtres.concat(
    filtresTypes.length ? { id: CaracteristiqueVetementEnum.TYPES, libelle: '', type: CaracteristiqueVetementEnum.TYPES, typeLibelle: CaracteristiqueVetementEnum.TYPES, isType: true } : [],
    filtresTypes,

    filtresTaille.length ? { id: CaracteristiqueVetementEnum.TAILLES, libelle: '', type: CaracteristiqueVetementEnum.TAILLES, typeLibelle: CaracteristiqueVetementEnum.TAILLES, isType: true } : [],
    filtresTaille,

    filtresUsages.length ? { id: CaracteristiqueVetementEnum.USAGES, libelle: '', type: CaracteristiqueVetementEnum.USAGES, typeLibelle: CaracteristiqueVetementEnum.USAGES, isType: true } : [],
    filtresUsages,

    filtresMarques.length ? { id: CaracteristiqueVetementEnum.MARQUES, libelle: '', type: CaracteristiqueVetementEnum.MARQUES, typeLibelle: CaracteristiqueVetementEnum.MARQUES, isType: true } : [],
    filtresMarques,

    filtresStatut.length ? { id: CaracteristiqueVetementEnum.STATUT, libelle: '', type: CaracteristiqueVetementEnum.STATUT, typeLibelle: CaracteristiqueVetementEnum.STATUT, isType: true } : [],
    filtresStatut,

    filtresSaisons.length ? { id: CaracteristiqueVetementEnum.SAISON, libelle: '', type: CaracteristiqueVetementEnum.SAISON, typeLibelle: CaracteristiqueVetementEnum.SAISON, isType: true } : [],
    filtresSaisons);
}


/**
 * Ajoute une caractéristique dans les filtres si elle n'est pas déjà présente.
 *
 * @param {VetementFiltreModel[]} filtres - La liste des filtres à mettre à jour.
 * @param {VetementCaracteristiquesModel[]} dataVetement - La liste des caractéristiques des vêtements.
 * @param {CaracteristiqueVetementEnum} type - Le type de caractéristique de vêtement.
 */
function addCaracteristiqueInFilter(dataVetement: VetementCaracteristiquesModel[], type: CaracteristiqueVetementEnum): VetementFiltreModel[] {

  let filtresTypes: VetementFiltreModel[] = [];
  dataVetement
    .filter((value, index, self) => self.indexOf(value) === index)
    .filter(data => data !== null && data !== undefined)
    .forEach(data => {
      if (!filtresTypes.find(filtresTypes => filtresTypes.id === data.id)) {
        filtresTypes.push({
          id: data.id,
          libelle: data.libelle,
          type: type,
          typeLibelle: type + data.libelle
        });
      }
    });

  filtresTypes.sort((a, b) => alphanumSort(a.type + a.libelle, b.type + b.libelle)); // Tri par ordre alphabétique
  return filtresTypes;
}


/**
 * Ajoute une caractéristique dans les filtres si elle n'est pas déjà présente.
 *
 * @param {VetementFiltreModel[]} filtres - La liste des filtres à mettre à jour.
 * @param {VetementCaracteristiquesModel[]} dataVetement - La liste des caractéristiques des vêtements.
 * @param {CaracteristiqueVetementEnum} type - Le type de caractéristique de vêtement.
 */
function addEnumsInFilter(dataStatuts: StatutVetementEnum[] | SaisonVetementEnum[]): VetementFiltreModel[] {

  if (dataStatuts.filter((value, index, self) => self.indexOf(value) === index).length <= 1) {
    return [];
  }

  let filtresTypes: VetementFiltreModel[] = [];
  dataStatuts
    .filter((value, index, self) => self.indexOf(value) === index)
    .filter(data => data !== null && data !== undefined)
    .forEach(data => {

      const isStatut = Object.values(StatutVetementEnum).includes(data as StatutVetementEnum);
      const type = isStatut ? CaracteristiqueVetementEnum.STATUT : CaracteristiqueVetementEnum.SAISON;
      const libelle = isStatut ? getLibelleStatutVetementEnum(data as StatutVetementEnum) : getLibelleSaisonVetementEnum(data as SaisonVetementEnum);
      if (!filtresTypes.find(filtresTypes => filtresTypes.id === data)) {
        filtresTypes.push({
          id: data,
          libelle: libelle,
          type: type,
          typeLibelle: type + libelle
        });
      }
    });
  filtresTypes.sort((a, b) => alphanumSort(a.type + a.libelle, b.type + b.libelle)); // Tri par ordre alphabétique
  return filtresTypes;
}
