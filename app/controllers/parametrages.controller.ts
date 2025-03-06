import { callGETBackend } from "../services/ClientHTTP.service";
import { SERVICES_URL } from "@/constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import ParamTypeVetementsModel from "../models/params/paramTypeVetements.model";
import ParamTailleVetementsModel from "../models/params/paramTailleVetements.model";
import ParamUsageVetementsModel from "../models/params/paramUsageVetements.model";
import ParamEtatVetementsModel from "../models/params/paramEtatVetements.model";

// Propriétés de l'écran des équipements
type FunctionCallAPITypeVetementsProps = {
  setTypeVetements: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

type FunctionCallAPITaillesVetementsProps = {
  setTaillesMesures: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

type FunctionCallAPIUsagesVetementsProps = {
  setUsages: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}


type FunctionCallAPIEtatsVetementsProps = {
  setEtats: Function
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
export function getParamsTypeVetements({setTypeVetements, setError}: FunctionCallAPITypeVetementsProps) {

  // Appel du backend
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS)
    .then((typeVetements : ParamTypeVetementsModel[]) => {
      setTypeVetements(typeVetements);
    })
    .catch((e) => {
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
export function getParamsTaillesVetements({setTaillesMesures, setError}: FunctionCallAPITaillesVetementsProps) {

  // Appel du service externe
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_TAILLES_MESURES)
    .then((tailleVetements : ParamTailleVetementsModel[]) => {
      setTaillesMesures(tailleVetements);
    })
    .catch((e) => {
        setError(e);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}



/**
 * Appelle l'API pour récupérer les usages de vêtements et met à jour l'état en conséquence.
 *
 * @param {Object} props - Les propriétés de la fonction.
 * @param {Function} props.setUsages - Fonction pour définir les usages de vêtements récupérées.
 * @param {Function} props.setError - Fonction pour définir l'erreur en cas d'échec de l'appel API.
 *
 * @returns {void}
 */
export function getParamsUsagesVetements({setUsages, setError}: FunctionCallAPIUsagesVetementsProps) {

  // Appel du service externe 
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_USAGES)
    .then((usageVetements : ParamUsageVetementsModel[]) => {
      setUsages(usageVetements);
    })
    .catch((e) => {
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
 */
export function getParamsEtatsVetements({setEtats, setError}: FunctionCallAPIEtatsVetementsProps) {

  // Appel du service externe 
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_ETATS)
    .then((etatsVetements : ParamEtatVetementsModel[]) => {
      setEtats(etatsVetements);
    })
    .catch((e) => {
        setError(e);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}