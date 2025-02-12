import BackendConfigModel from "@/app/models/backendConfig.model";
import callBackend from "../services/ClientHTTP.service";
import { SERVICES_URL } from "@/constants/APIconstants";
import { showToast, ToastDuration } from "@/hooks/AndroidToast";

// Propriétés de l'écran des équipements
type FunctionConnectToDomoticzProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  storeConnexionData: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}


/**
 * Connecte l'application à Domoticz.
 * @param setIsLoading - Fonction pour définir l'état de chargement.
 * @param storeConfigData - Fonction pour stocker les données de configuration dans l'état.
 * @param storeError - Fonction pour stocker les erreurs dans l'état.
 */
export function connectToBackend({setIsLoading, storeConnexionData, setError}: FunctionConnectToDomoticzProps) {

    setIsLoading(true);
    // Appel du service externe de connexion à Domoticz
    callBackend(SERVICES_URL.GET_CONFIG)
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

export default connectToBackend;