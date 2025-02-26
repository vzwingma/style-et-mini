import callBackend from "../services/ClientHTTP.service";
import { SERVICES_URL } from "@/constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import ParamTypeVetementsModel from "../models/paramTypeVetements.model";
import ParamTailleVetementsModel from "../models/paramTailleVetements.model";
import ParamUsageVetementsModel from "../models/paramUsageVetements.model";

// Propriétés de l'écran des équipements
type FunctionCallAPITypeVetementsProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTypeVetements: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

type FunctionCallAPITaillesVetementsProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTaillesMesures: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

type FunctionCallAPIUsagesVetementsProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setUsages: Function
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
export function getParamsTypeVetements({setIsLoading, setTypeVetements, setError}: FunctionCallAPITypeVetementsProps) {

  setIsLoading(true);
  // Appel du backend
  callBackend(SERVICES_URL.GET_PARAMS_TYPE_VETEMENTS)
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
export function getParamsTaillesVetements({setIsLoading, setTaillesMesures, setError}: FunctionCallAPITaillesVetementsProps) {

  setIsLoading(true);
  // Appel du service externe
  callBackend(SERVICES_URL.GET_PARAMS_TAILLES_MESURES)
    .then((tailleVetements : ParamTailleVetementsModel[]) => {
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



/**
 * Appelle l'API pour récupérer les usages de vêtements et met à jour l'état en conséquence.
 *
 * @param {Object} props - Les propriétés de la fonction.
 * @param {Function} props.setIsLoading - Fonction pour définir l'état de chargement.
 * @param {Function} props.setUsages - Fonction pour définir les usages de vêtements récupérées.
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
export function getParamsUsagesVetements({setIsLoading, setUsages, setError}: FunctionCallAPIUsagesVetementsProps) {

  setIsLoading(true);
  // Appel du service externe 
  callBackend(SERVICES_URL.GET_PARAMS_USAGES)
    .then((usageVetements : ParamUsageVetementsModel[]) => {
      setIsLoading(false);
      setUsages(usageVetements);
    })
    .catch((e) => {
        setIsLoading(false);
        setError(e);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}