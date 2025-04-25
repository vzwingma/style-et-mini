import { CaracteristiqueVetementEnum, CategorieDressingEnum, getLibelleSaisonVetementEnum, getLibelleStatutVetementEnum, SaisonVetementEnum, StatutVetementEnum } from "@/app/constants/AppEnum";
import { alphanumSort } from "../../components/commons/CommonsUtils";
import CapsuleCritereModel from "@/app/models/capsule/capsuleCritere";
import { VetementsFormParamsTypeProps } from "@/app/components/dressing/vetements/vetementForm.component";
import ParamGenericVetementsModel from "@/app/models/params/paramGenericVetements.model";
import DressingModel from "@/app/models/dressing.model";


/**
 * Sélectionne et met à jour les critères filtrés à partir des identifiants sélectionnés.
 *
 * @param selectedIdCriteres - Liste des identifiants des critères sélectionnés.
 * @param criteresDisponibles - Liste des critères disponibles de type `CapsuleCritereModel`.
 * @param setSelectedCriteres - Fonction de mise à jour pour définir les critères sélectionnés.
 *
 * Cette fonction filtre les critères disponibles en fonction des identifiants sélectionnés
 * et exclut ceux qui sont de type `isType`. Les critères filtrés sont ensuite passés à la
 * fonction `setSelectedCriteres` pour mise à jour.
 */
export function selectCriteres(selectedIdCriteres: string[], criteresDisponibles: CapsuleCritereModel[], setSelectedCriteres: Function): void {
  const selectCriteres = (criteresDisponibles
    .filter(critere => selectedIdCriteres.includes(critere.id))
    .filter(critere => !critere.isType));
  setSelectedCriteres(selectCriteres);
}



/**
 * Ajoute des critères à une liste en fonction des paramètres fournis.
 *
 * @param {VetementsFormParamsTypeProps} params - Les paramètres pour générer les critères.
 * @param {CaracteristiqueVetementEnum[]} params.paramsTypeVetements - Les types de vêtements à inclure dans les critères.
 * @param {CaracteristiqueVetementEnum[]} params.paramsTaillesMesures - Les tailles et mesures à inclure dans les critères.
 * @param {CaracteristiqueVetementEnum[]} params.paramsUsagesVetements - Les usages des vêtements à inclure dans les critères.
 * 
 * @returns {CapsuleCritereModel[]} Une liste de critères, comprenant les types, tailles, usages, statuts et saisons.
 */
export function addCriteresInList(dressing : DressingModel, { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements }: VetementsFormParamsTypeProps): CapsuleCritereModel[] {

  let filtres: CapsuleCritereModel[] = [];

  const filtresTypes = addCaracteristiqueInCriteria(dressing.categorie, paramsTypeVetements, CaracteristiqueVetementEnum.TYPES);
  const filtresTaille = addCaracteristiqueInCriteria(dressing.categorie, paramsTaillesMesures, CaracteristiqueVetementEnum.TAILLES);  
  const filtresUsages = addCaracteristiqueInCriteria(dressing.categorie, paramsUsagesVetements, CaracteristiqueVetementEnum.USAGES);

  const filtresStatut = addEnumsInFilter(Object.values(StatutVetementEnum));
  const filtresSaisons = addEnumsInFilter(Object.values(SaisonVetementEnum));

  // Recalcul des filtres disponibles
  return filtres.concat(
    filtresTypes.length ? { id: CaracteristiqueVetementEnum.TYPES, libelle: '', type: CaracteristiqueVetementEnum.TYPES, typeLibelle: CaracteristiqueVetementEnum.TYPES, isType: true } : [],
    filtresTypes,

    filtresTaille.length ? { id: CaracteristiqueVetementEnum.TAILLES, libelle: '', type: CaracteristiqueVetementEnum.TAILLES, typeLibelle: CaracteristiqueVetementEnum.TAILLES, isType: true } : [],
    filtresTaille,

    filtresUsages.length ? { id: CaracteristiqueVetementEnum.USAGES, libelle: '', type: CaracteristiqueVetementEnum.USAGES, typeLibelle: CaracteristiqueVetementEnum.USAGES, isType: true } : [],
    filtresUsages,

    filtresStatut.length ? { id: CaracteristiqueVetementEnum.STATUT, libelle: '', type: CaracteristiqueVetementEnum.STATUT, typeLibelle: CaracteristiqueVetementEnum.STATUT, isType: true } : [],
    filtresStatut,

    filtresSaisons.length ? { id: CaracteristiqueVetementEnum.SAISON, libelle: '', type: CaracteristiqueVetementEnum.SAISON, typeLibelle: CaracteristiqueVetementEnum.SAISON, isType: true } : [],
    filtresSaisons

    );
}


/**
 * Ajoute une caractéristique dans les filtres si elle n'est pas déjà présente.
 *
 * @param {VetementFiltreModel[]} filtres - La liste des filtres à mettre à jour.
 * @param {VetementCaracteristiquesModel[]} dataParams - La liste des caractéristiques des vêtements.
 * @param {CaracteristiqueVetementEnum} type - Le type de caractéristique de vêtement.
 */
function addCaracteristiqueInCriteria(categorie : CategorieDressingEnum, dataParams: ParamGenericVetementsModel[] | undefined, type: CaracteristiqueVetementEnum): CapsuleCritereModel[] {

  let criteresTypes: CapsuleCritereModel[] = [];
  if (!dataParams || dataParams.length === 0) {
    return criteresTypes;
  }

  dataParams
    .filter((value, index, self) => self.indexOf(value) === index)
    .filter(data => data !== null && data?.categories.includes(categorie))
    .forEach(data => {
      if (!criteresTypes.find(filtresTypes => filtresTypes.id === data.id)) {
        criteresTypes.push({
          id: data.id,
          libelle: data.libelle,
          type: type,
          typeLibelle: type + data.libelle
        });
      }
    });

  criteresTypes.sort((a, b) => alphanumSort(a.type + a.libelle, b.type + b.libelle)); // Tri par ordre alphabétique
  return criteresTypes;
}


/**
 * Ajoute une caractéristique dans les filtres si elle n'est pas déjà présente.
 *
 * @param {CapsuleCritereModel[]} criteres - La liste des criteres à mettre à jour.
 * @param {VetementCaracteristiquesModel[]} dataVetement - La liste des caractéristiques des vêtements.
 * @param {CaracteristiqueVetementEnum} type - Le type de caractéristique de vêtement.
 */
function addEnumsInFilter(dataEnums: StatutVetementEnum[] | SaisonVetementEnum[]): CapsuleCritereModel[] {

  if (dataEnums.filter((value, index, self) => self.indexOf(value) === index).length <= 1) {
    return [];
  }

  let filtresTypes: CapsuleCritereModel[] = [];
  dataEnums
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
