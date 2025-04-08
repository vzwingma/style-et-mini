import BackendConfigModel from "@/app/models/backendConfig.model";
import { SERVICES_URL } from "@/app/constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import DressingModel from "../models/dressing.model";
import { callGETBackend } from "../services/ClientHTTP.service";

// Propriétés de l'écran d'accueil'
type FunctionConnectToDomoticzProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  storeConnexionData: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}


// Propriétés du changement des dressings
type FunctionGetDressingsProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setDressings: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

/**
 * Connecte l'application au backend
 * @param setIsLoading - Fonction pour définir l'état de chargement.
 * @param storeConfigData - Fonction pour stocker les données de configuration dans l'état.
 * @param storeError - Fonction pour stocker les erreurs dans l'état.
 */
export function connectToBackend({setIsLoading, storeConnexionData, setError}: FunctionConnectToDomoticzProps) {

    setIsLoading(true);
    // Appel du service externe de connexion au backend
    callGETBackend(SERVICES_URL.SERVICE_CONFIG)
      .then((config : BackendConfigModel) => {
        setIsLoading(false);
        storeConnexionData(config);
      })
      .catch((e) => {
          setIsLoading(false);
          setError(e);
          console.error('Une erreur s\'est produite lors de la connexion au backend', e);
          showToast("Erreur de connexion au backend", ToastDuration.SHORT);
      });
}

/**
 * Récupère les dressings depuis le backend et met à jour l'état de l'application.
 *
 * @param {Object} props - Les propriétés de la fonction.
 * @param {Function} props.setIsLoading - Fonction pour définir l'état de chargement.
 * @param {Function} props.setDressings - Fonction pour définir les dressings récupérés.
 * @param {Function} props.setError - Fonction pour définir l'erreur en cas d'échec.
 *
 * @returns {void}
 *
 * @example
 * getDressings({
 *   setIsLoading: (isLoading) => setLoadingState(isLoading),
 *   setDressings: (dressings) => updateDressings(dressings),
 *   setError: (error) => handleError(error)
 * });
 */
export function getDressings({setIsLoading, setDressings, setError}: FunctionGetDressingsProps) {

  setIsLoading(true);
  // Appel du service externe des dressings
  callGETBackend(SERVICES_URL.SERVICE_DRESSINGS)
    .then((dressings : DressingModel[]) => {
      setIsLoading(false);
      console.log("Dressings récupérés : ", dressings);
      setDressings(dressings);
    })
    .catch((e) => {
        setIsLoading(false);
        setError(e);
        console.error('Une erreur s\'est produite lors du chargement des dressings', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}

export default connectToBackend;