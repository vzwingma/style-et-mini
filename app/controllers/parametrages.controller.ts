import { callGETBackend } from "../services/ClientHTTP.service";
import { SERVICES_URL } from "../constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import ParamEtatVetementsModel from "../models/params/paramEtatVetements.model";
import { SetStateAction } from "react";
import ParamGenericVetementsModel from "../models/params/paramGenericVetements.model";

// Propriétés de l'écran des équipements
type FunctionCallAPITypeVetementsProps = {
  setTypeVetements: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

type FunctionCallAPIMarqueVetementsProps = {
  setMarques: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

type FunctionCallAPITaillesVetementsProps = {
  setTaillesMesures: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

type FunctionCallAPIUsagesVetementsProps = {
  setUsages: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}


type FunctionCallAPIEtatsVetementsProps = {
  setEtats: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
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
export function getParamsTypeVetements({setTypeVetements, setError, setIsLoading}: FunctionCallAPITypeVetementsProps) {

  setIsLoading(true);
  // Appel du backend
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS)
    .then((typeVetements : ParamGenericVetementsModel[]) => {
      setTypeVetements(typeVetements);
      setIsLoading(false);
    })
    .catch((e) => {
        setError(e);
        setIsLoading(false);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}


/**
 * Récupère les paramètres des marques de vêtements depuis le backend.
 *
 * @param {FunctionCallAPIMarqueVetementsProps} props - Les propriétés nécessaires pour l'appel de la fonction.
 * @param {Function} props.setMarques - Fonction pour définir les marques de vêtements récupérées.
 * @param {Function} props.setError - Fonction pour gérer les erreurs en cas d'échec de l'appel.
 * @param {Function} props.setIsLoading - Fonction pour indiquer l'état de chargement.
 *
 * @description
 * Cette fonction effectue un appel GET au backend pour récupérer les marques de vêtements.
 * En cas de succès, elle met à jour les marques via `setMarques` et désactive l'état de chargement.
 * En cas d'erreur, elle capture l'erreur via `setError`, désactive l'état de chargement,
 * affiche un message d'erreur dans la console et montre une notification toast.
 *
 * @throws {Error} Une erreur est levée si la connexion au backend échoue.
 */
export function getParamsMarquesVetements({setMarques, setError, setIsLoading}: FunctionCallAPIMarqueVetementsProps) {
  
    setIsLoading(true);
    // Appel du backend
    callGETBackend(SERVICES_URL.SERVICE_PARAMS_MARQUES)
      .then((marquesVetements : ParamGenericVetementsModel[]) => {
        setMarques(marquesVetements);
        setIsLoading(false);
      })
      .catch((e) => {
          setError(e);
          setIsLoading(false);
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
export function getParamsTaillesVetements({setTaillesMesures, setError, setIsLoading}: FunctionCallAPITaillesVetementsProps) {

  setIsLoading(true);
  // Appel du service externe
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_TAILLES_MESURES)
    .then((tailleVetements : ParamGenericVetementsModel[]) => {
      setTaillesMesures(tailleVetements);
      setIsLoading(false);
    })
    .catch((e) => {
        setError(e);
        setIsLoading(false);
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
export function getParamsUsagesVetements({setUsages, setError, setIsLoading}: FunctionCallAPIUsagesVetementsProps) {
  setIsLoading(true);
  // Appel du service externe 
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_USAGES)
    .then((usageVetements : ParamGenericVetementsModel[]) => {
      setUsages(usageVetements);
      setIsLoading(false);
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
 */
export function getParamsEtatsVetements({setEtats, setError, setIsLoading}: FunctionCallAPIEtatsVetementsProps) {

  setIsLoading(true);
  // Appel du service externe 
  callGETBackend(SERVICES_URL.SERVICE_PARAMS_ETATS)
    .then((etatsVetements : ParamEtatVetementsModel[]) => {
      setEtats(etatsVetements);
      setIsLoading(false);
    })
    .catch((e) => {
        setIsLoading(false);
        setError(e);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
    });
}