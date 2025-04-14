import { callGETBackend } from "../services/ClientHTTP.service";
import { SERVICES_URL } from "../constants/APIconstants";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";
import { SetStateAction, useContext } from "react";
import ParamGenericVetementsModel from "../models/params/paramGenericVetements.model";
import MenuParametragesModel from "../models/params/menuParametrage.model";
import { ParametragesVetementEnum } from "../constants/AppEnum";
import { AppContext } from "../services/AppContextProvider";

// Propriétés de l'écran des équipements
type FunctionCallAPIAllParamsVetementsProps = {
  setTypeVetements: Function
  setMarques: Function
  setTaillesMesures: Function
  setUsages: Function
  setEtats: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

type FunctionCallAPIParamVetementsProps = {
  urlAPIParams: SERVICES_URL
  setParams: Function,
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}



/**
 * Récupère les paramètres génériques des vêtements en fonction du type de paramétrage fourni.
 *
 * @param {MenuParametragesModel} typeParametrage - Le type de paramétrage à utiliser pour récupérer les données.
 * @returns {ParamGenericVetementsModel[] | null} - Une liste des paramètres génériques correspondants ou `null` si le type de paramétrage n'est pas reconnu.
 */
export function getParametrages(typeParametrage: MenuParametragesModel): ParamGenericVetementsModel[] {

  const { etats, typeVetements, taillesMesures, marques, usages } = useContext(AppContext)!;

  switch (typeParametrage.class) {
    case ParametragesVetementEnum.TYPES:
      return typeVetements
    case ParametragesVetementEnum.TAILLES:
      return taillesMesures
    case ParametragesVetementEnum.MARQUES:
      return marques
    case ParametragesVetementEnum.USAGES:
      return usages
    case ParametragesVetementEnum.ETATS:
      return etats
    default:
      return [];
  }
}

/**
 * Récupère tous les paramètres génériques des vêtements en effectuant des appels API pour chaque type de paramètre.
 *
 * @param {FunctionCallAPIAllParamsVetementsProps} props - Les propriétés de la fonction.
 * @param {Function} props.setTypeVetements - Fonction pour définir les types de vêtements récupérés.
 * @param {Function} props.setTaillesMesures - Fonction pour définir les tailles et mesures récupérées.
 * @param {Function} props.setUsages - Fonction pour définir les usages récupérés.
 * @param {Function} props.setEtats - Fonction pour définir les états récupérés.
 * @param {Function} props.setMarques - Fonction pour définir les marques récupérées.
 * @param {Function} props.setError - Fonction pour définir l'erreur en cas d'échec de l'appel API.
 * @param {Function} props.setIsLoading - Fonction pour définir l'état de chargement.
 *
 * @returns {Promise<void>} - Une promesse qui se résout lorsque tous les paramètres sont chargés.
 */
export async function getAllParamsVetements({ setTypeVetements, setTaillesMesures, setUsages, setEtats, setMarques, setError, setIsLoading }: FunctionCallAPIAllParamsVetementsProps) {
  const types = [
    { url: SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS, setter: setTypeVetements },
    { url: SERVICES_URL.SERVICE_PARAMS_TAILLES_MESURES, setter: setTaillesMesures },
    { url: SERVICES_URL.SERVICE_PARAMS_USAGES, setter: setUsages },
    { url: SERVICES_URL.SERVICE_PARAMS_ETATS, setter: setEtats },
    { url: SERVICES_URL.SERVICE_PARAMS_MARQUES, setter: setMarques }
  ];

  setIsLoading(true);
  const loadDataParametrages = await Promise.all(types.map(async (type) => { return await getParamsVetements({ urlAPIParams: type.url, setParams: type.setter, setError }) }));
  console.log(loadDataParametrages.filter(p => p === true).flat().length + " types de paramètres chargés.", loadDataParametrages);
  setIsLoading(false);
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
 */
export function getParamsVetements({ urlAPIParams, setParams, setError }: FunctionCallAPIParamVetementsProps): Promise<boolean> {

  return new Promise((resolve, reject) => {
    // Appel du backend
    callGETBackend(urlAPIParams)
      .then((paramsVetements: ParamGenericVetementsModel[]) => {
        setParams(paramsVetements)
        resolve(true);
      })
      .catch((e) => {
        setError(e);
        reject(e);
        console.error('Une erreur s\'est produite lors de la connexion au backend', e);
        showToast("Erreur de connexion au backend", ToastDuration.SHORT);
      });
  });
}
