import { SERVICES_PARAMS, SERVICES_URL } from "../../constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import { callGETBackend } from "../../services/ClientHTTP.service";
import TenueModel from "../../models/tenues/tenue.model";


// Propriétés de l'appel d'APl pour les vêtements
export type FunctionCallAPITenuesProps = {
  idDressing: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTenues: Function
}



/**
 * Charge les vêtements d'un dressing spécifique.
 *
 * @param {Object} props - Les propriétés de l'appel de la fonction.
 * @param {string} props.idDressing - L'identifiant du dressing à charger.
 * @param {Function} props.setIsLoading - Fonction pour définir l'état de chargement.
 * @param {Function} props.setVetements - Fonction pour définir les vêtements chargés.
 * @param {Function} props.setError - Fonction pour définir l'erreur en cas d'échec.
 *
 * @returns {void}
 *
 * @description Cette fonction appelle un service backend pour charger les vêtements d'un dressing spécifique.
 * Elle met à jour l'état de chargement, les vêtements et les erreurs en conséquence.
 * En cas de succès, elle définit les vêtements chargés et désactive l'état de chargement.
 * En cas d'erreur, elle définit l'erreur, désactive l'état de chargement et affiche un toast d'erreur.
 */
export function loadTenuesDressing({ idDressing, setIsLoading, setTenues }: FunctionCallAPITenuesProps) {

  let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];

  setIsLoading(true);
  // Appel du service externe de chargement du dressing
  callGETBackend(SERVICES_URL.SERVICE_TENUES, params)
    .then((tenues: TenueModel[]) => {
      console.log("Dressing ", tenues?.at(0)?.dressing.libelle ?? idDressing, "chargé : ", tenues?.length, "tenues");
      setIsLoading(false);
      setTenues(tenues);
    })
    .catch((e) => {
      setIsLoading(false);
      console.error('Une erreur s\'est produite lors du chargement du dressing', e);
      showToast("Erreur de chargement du dressing", ToastDuration.SHORT);
    });
}
