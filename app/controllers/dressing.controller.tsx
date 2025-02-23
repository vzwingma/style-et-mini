import callBackend from "../services/ClientHTTP.service";
import { SERVICES_URL } from "@/constants/APIconstants";
import { showToast, ToastDuration } from "@/hooks/AndroidToast";
import TypeVetementsModel from "../models/typeVetements.model";

// Propriétés de l'écran des équipements
type FunctionCallAPIListVetementsProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTypeVetements: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}


export function callApiListeVetements({setIsLoading, setTypeVetements, setError}: FunctionCallAPIListVetementsProps) {

    setIsLoading(true);
    // Appel du service externe de connexion à Domoticz
    callBackend(SERVICES_URL.GET_PARAM_TYPE_VETEMENTS)
      .then((typeVetements : TypeVetementsModel[]) => {
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

export default callApiListeVetements;