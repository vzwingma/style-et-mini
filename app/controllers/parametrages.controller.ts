import callBackend from "../services/ClientHTTP.service";
import { SERVICES_URL } from "@/constants/APIconstants";
import { showToast, ToastDuration } from "@/hooks/AndroidToast";
import ParamTypeVetementsModel from "../models/paramTypeVetements.model";
import TailleVetementsModel from "../models/paramTailleVetements.model";

// Propriétés de l'écran des équipements
type FunctionCallAPITypeVetementsProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTypeVetements: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

type FunctionCallAPITaillVetementsProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTaillesMesures: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}



/**
 * Appelle l'API pour récupérer les types de vêtements et met à jour l'état en conséquence.
 *
 * @param {Object} props - Les propriétés de la fonction.
 * @param {Function} props.setIsLoading - Fonction pour définir l'état de chargement.
 * @param {Function} props.setTypeVetements - Fonction pour définir les types de vêtements récupérés.
 * @param {Function} props.setError - Fonction pour définir l'erreur en cas d'échec de l'appel API.
 *
 * @returns {void}
 *
 * @example
 * callApiParamsTypeVetements({
 *   setIsLoading: (isLoading) => { ... },
 *   setTypeVetements: (typeVetements) => { ... },
 *   setError: (error) => { ... }
 * });
 */
export function callApiParamsTypeVetements({setIsLoading, setTypeVetements, setError}: FunctionCallAPITypeVetementsProps) {

  setIsLoading(true);
  // Appel du backend
  callBackend(SERVICES_URL.GET_PARAM_TYPE_VETEMENTS)
    .then((typeVetements : ParamTypeVetementsModel[]) => {
      setIsLoading(false);
      setTypeVetements(typeVetements);
    })
    .catch((e) => {
        setIsLoading(false);
        setError(e);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}



/**
 * Appelle l'API pour récupérer les tailles de vêtements et met à jour l'état en conséquence.
 *
 * @param {Object} props - Les propriétés de la fonction.
 * @param {Function} props.setIsLoading - Fonction pour définir l'état de chargement.
 * @param {Function} props.setTaillesMesures - Fonction pour définir les tailles de vêtements récupérées.
 * @param {Function} props.setError - Fonction pour définir l'erreur en cas d'échec de l'appel API.
 *
 * @returns {void}
 *
 * @example
 * callApiParamsTaillesVetements({
 *   setIsLoading: (isLoading) => { ... },
 *   setTaillesMesures: (taillesMesures) => { ... },
 *   setError: (error) => { ... }
 * });
 */
export function callApiParamsTaillesVetements({setIsLoading, setTaillesMesures, setError}: FunctionCallAPITaillVetementsProps) {

  setIsLoading(true);
  // Appel du service externe de connexion à Domoticz
  callBackend(SERVICES_URL.GET_PARAM_TAILLES_MESURES)
    .then((tailleVetements : TailleVetementsModel[]) => {
      setIsLoading(false);
      setTaillesMesures(tailleVetements);
    })
    .catch((e) => {
        setIsLoading(false);
        setError(e);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}