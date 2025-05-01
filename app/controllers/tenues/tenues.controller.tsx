import { ACTION_COUNT, SERVICES_PARAMS, SERVICES_URL } from "../../constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import { callGETBackend } from "../../services/ClientHTTP.service";
import TenueModel from "../../models/tenues/tenue.model";
import VetementModel from "@/app/models/vetements/vetements.model";
import { loadVetementsDressing } from "../dressing/dressing.controller";


// Propriétés de l'appel d'APl pour les vêtements
export type FunctionCallAPITenuesProps = {
  idDressing: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTenues:    React.Dispatch<React.SetStateAction<TenueModel[]>>
  setVetements?:    React.Dispatch<React.SetStateAction<VetementModel[]>>
}


export async function loadTenuesAndVetementsDressing({ idDressing, setIsLoading, setTenues, setVetements }: FunctionCallAPITenuesProps) {
  if(setVetements === undefined) {
    console.error("loadTenuesAndVetementsDressing : setVetements est undefined !");
    return;
  }
  setIsLoading(true);
  await Promise.all([
    loadTenuesDressing(idDressing, setTenues),
    loadVetementsDressing({ idDressing, setVetements })
  ]);
  setIsLoading(false);
}


/**
 * Charge les tenues d'un dressing spécifique et met à jour l'état correspondant.
 *
 * @param idDressing - L'identifiant unique du dressing à charger.
 * @param setTenues - Fonction de mise à jour de l'état pour définir les tenues chargées.
 * @returns Une promesse qui se résout une fois que les tenues sont chargées et l'état mis à jour.
 *
 * @remarks
 * Cette fonction effectue un appel au backend pour récupérer les tenues associées
 * à un dressing donné. En cas de succès, elle met à jour l'état avec les données
 * récupérées. En cas d'erreur, un message d'erreur est affiché via un toast.
 *
 */
export function loadTenuesDressing(idDressing : string, setTenues: React.Dispatch<React.SetStateAction<TenueModel[]>>) : Promise<void> {

  let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];

  // Appel du service externe de chargement du dressing
  return callGETBackend(SERVICES_URL.SERVICE_TENUES, params)
    .then((tenues: TenueModel[]) => {
      console.log("Dressing ", tenues?.at(0)?.dressing.libelle ?? idDressing, "chargé : ", tenues?.length, "tenues");
      setTenues(tenues);
    })
    .catch((e) => {
      console.error('Une erreur s\'est produite lors du chargement du dressing', e);
      showToast("Erreur de chargement du dressing", ToastDuration.SHORT);
    });
}

/**
 * Charge le nombre de tenues dans un dressing spécifique.
 *
 * @param idDressing - L'identifiant unique du dressing à interroger.
 * @returns Une promesse qui résout avec le nombre de tenues dans le dressing.
 */
export function loadNbTenuesDressing(idDressing : string) : Promise<number> {

  let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];
  // Appel du service externe de chargement du dressing
  return callGETBackend((SERVICES_URL.SERVICE_TENUES + ACTION_COUNT) as SERVICES_URL, params);
}
