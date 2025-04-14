import { SERVICES_PARAMS, SERVICES_URL } from "../constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import DressingModel from "../models/dressing.model";
import { callGETBackend } from "../services/ClientHTTP.service";
import VetementModel from "../models/vetements/vetements.model";

// Propriétés de l'appel d'API pour le dressing
type FunctionCallAPIDressingProps = {
  idDressing: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setDressing: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}


// Propriétés de l'appel d'APl pour les vêtements
export type FunctionCallAPIVetementsProps = {
  idDressing: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setVetements: Function
}


/**
 * Appelle l'API pour récupérer les informations d'un dressing par son identifiant.
 *
 * @param {Object} params - Les paramètres de la fonction.
 * @param {string} params.idDressing - L'identifiant du dressing à récupérer.
 * @param {Function} params.setIsLoading - Fonction pour définir l'état de chargement.
 * @param {Function} params.setDressing - Fonction pour définir les données du dressing.
 * @param {Function} params.setVetements - Fonction pour définir les vêtements du dressing.
 * @param {Function} params.setError - Fonction pour définir l'erreur en cas d'échec.
 *
 * @returns {void}
 *
 * @description
 * Cette fonction appelle un service backend pour récupérer les informations d'un dressing
 * en utilisant son identifiant. Elle met à jour l'état de chargement pendant la requête,
 * et met à jour les données du dressing ou l'erreur en fonction du résultat de la requête.
 * En cas d'erreur, un message toast est affiché pour informer l'utilisateur.
 */
export function loadDressing({ idDressing, setIsLoading, setDressing, setError }: FunctionCallAPIDressingProps) {

  let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];

  setIsLoading(true);
  // Appel du service externe de chargement du dressing
  callGETBackend(SERVICES_URL.SERVICE_DRESSING_BY_ID, params)
    .then((dressing: DressingModel) => {
      console.log("Dressing chargé : ", dressing);
      setIsLoading(false);
      setDressing(dressing);
    })
    .catch((e) => {
      setIsLoading(false);
      setError(e);
      console.error('Une erreur s\'est produite lors de la connexion au backend', e);
      showToast("Erreur de chargement du dressing", ToastDuration.SHORT);
    });
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
export function loadVetementsDressing({ idDressing, setIsLoading, setVetements }: FunctionCallAPIVetementsProps) {

  let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];

  setIsLoading(true);
  // Appel du service externe de chargement du dressing
  callGETBackend(SERVICES_URL.SERVICE_VETEMENTS, params)
    .then((vetements: VetementModel[]) => {
      console.log("Dressing ", vetements?.at(0)?.dressing.libelle ?? idDressing, "chargé : ", vetements?.length, "vêtements");
      setIsLoading(false);
      setVetements(vetements);
    })
    .catch((e) => {
      setIsLoading(false);
      console.error('Une erreur s\'est produite lors du chargement du dressing', e);
      showToast("Erreur de chargement du dressing", ToastDuration.SHORT);
    });
}
