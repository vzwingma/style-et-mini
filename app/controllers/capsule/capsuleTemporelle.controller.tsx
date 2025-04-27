import { ACTION_COUNT, SERVICES_PARAMS, SERVICES_URL } from "@/app/constants/APIconstants";
import CapsuleTemporelleModel from "../../models/capsule/capsuleTemporelle.model";
import { callGETBackend } from "@/app/services/ClientHTTP.service";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import VetementModel from "@/app/models/vetements/vetements.model";
import { CaracteristiqueVetementEnum } from "@/app/constants/AppEnum";
import CapsuleCritereModel from "@/app/models/capsule/capsuleCritere";
import { filtreVetementByCaracteristique } from "../dressing/dressingList.controller";



/**
 * Charge les tenues d'un dressing spécifique et met à jour l'état correspondant.
 *
 * @param idDressing - L'identifiant unique du dressing à charger.
 * @param setCapsules - Fonction de mise à jour de l'état pour définir les tenues chargées.
 * @returns Une promesse qui se résout une fois que les tenues sont chargées et l'état mis à jour.
 *
 * @remarks
 * Cette fonction effectue un appel au backend pour récupérer les tenues associées
 * à un dressing donné. En cas de succès, elle met à jour l'état avec les données
 * récupérées. En cas d'erreur, un message d'erreur est affiché via un toast.
 *
 */
export function loadCapsulesDressing(idDressing : string) : Promise<CapsuleTemporelleModel[]> {

    let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];
    // Appel du service externe de chargement du dressing
    return callGETBackend(SERVICES_URL.SERVICE_CAPSULES, params)
      .then((capsules: CapsuleTemporelleModel[]) => {
        console.log("Dressing ", capsules?.at(0)?.dressing.libelle ?? idDressing, "chargé : ", capsules?.length, "capsules");
        return capsules;
      })
      .catch((e) => {
        console.error('Une erreur s\'est produite lors du chargement des capsules', e);
        showToast("Erreur : Chargement des capsules", ToastDuration.LONG);
        return [] as CapsuleTemporelleModel[];
      });
  }

  
  /**
   * Charge le nombre de capsules dans un dressing spécifique.
   *
   * @param idDressing - L'identifiant unique du dressing à interroger.
   * @returns Une promesse qui résout avec le nombre de capsules dans le dressing.
   */
  export function loadNbCapsulesDressing(idDressing : string) : Promise<number> {

    let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];
    // Appel du service externe de chargement du dressing
    return callGETBackend((SERVICES_URL.SERVICE_CAPSULES + ACTION_COUNT) as SERVICES_URL, params);
  }
/**
 * Évalue et met à jour le nombre de vêtements associés à chaque capsule temporelle.
 *
 * @param capsules - Liste des capsules temporelles à évaluer.
 * @param vetements - Liste des vêtements à analyser pour déterminer leur association avec les capsules.
 * @returns La liste des capsules temporelles mise à jour avec le nombre de vêtements associés.
 */
export function evaluateNbVetementsCapsules(capsules: CapsuleTemporelleModel[], vetements: VetementModel[]) : CapsuleTemporelleModel[] {
    capsules.forEach((capsule) => {
        capsule.nbrVetements.dressing = applyCriteresOnVetements(capsule.criteres, vetements).length;
    });
    return capsules;
}


/**
 * Applique une liste de critères sur une collection de vêtements et retourne les vêtements filtrés.
 *
 * @param {CapsuleCritereModel[]} criteres - Liste des critères à appliquer. Chaque critère est associé à un type de caractéristique.
 * @param {VetementModel[]} vetements - Liste des vêtements à filtrer.
 * @returns {VetementModel[]} - Liste des vêtements qui correspondent aux critères spécifiés.
 *
 * @description
 * Cette fonction regroupe les critères par type de caractéristique, puis applique un filtre sur les vêtements
 * en vérifiant si au moins un critère de chaque groupe est satisfait. Si aucun critère n'est fourni, la liste
 * originale des vêtements est retournée sans modification.
 */
function applyCriteresOnVetements(criteres: CapsuleCritereModel[], vetements: VetementModel[]): VetementModel[] {
  if(criteres.length === 0) {
    return vetements;
  }
  const groupedFiltres = new Map<CaracteristiqueVetementEnum, CapsuleCritereModel[]>();

  criteres.forEach(filtre => {
    if (groupedFiltres.has(filtre.type)) {
      groupedFiltres.get(filtre.type)?.push(filtre);
    } else {
      groupedFiltres.set(filtre.type, [filtre]);
    }
  });
  groupedFiltres.forEach((criteres, caracteristique) => {
    vetements = vetements.filter(vetement => {
      return criteres.some(critere => filtreVetementByCaracteristique(vetement, caracteristique, critere));
    });
  });
    return vetements;
}