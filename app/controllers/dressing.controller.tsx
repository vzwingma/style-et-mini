import callBackend from "../services/ClientHTTP.service";
import { SERVICES_URL } from "@/constants/APIconstants";
import { showToast, ToastDuration } from "@/hooks/AndroidToast";
import ParamTypeVetementsModel from "../models/paramTypeVetements.model";
import { DressingType } from "@/constants/AppEnum";

// Propriétés de l'écran des équipements
type FunctionCallAPIListVetementsProps = {
  type: DressingType
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setVetements: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}


export function callApiDressing({type, setIsLoading, setVetements, setError}: FunctionCallAPIListVetementsProps) {

    setIsLoading(true);
    // Appel du service externe de connexion à Domoticz
    callBackend(SERVICES_URL.GET_PARAM_TYPE_VETEMENTS)
      .then((typeVetements : ParamTypeVetementsModel[]) => {
        setIsLoading(false);
        setVetements(typeVetements);
      })
      .catch((e) => {
          setIsLoading(false);
          setError(e);
          console.error('Une erreur s\'est produite lors de la connexion au backend', e);
          showToast("Erreur de connexion au backend", ToastDuration.SHORT);
      });
}

export default callApiDressing;