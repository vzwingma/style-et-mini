import callBackend from "../services/ClientHTTP.service";
import { SERVICES_PARAMS, SERVICES_URL } from "@/constants/APIconstants";
import { showToast, ToastDuration } from "@/hooks/AndroidToast";
import ParamTypeVetementsModel from "../models/paramTypeVetements.model";
import { DressingType } from "@/constants/AppEnum";
import DressingModel from "../models/dressing.model";

// Propriétés de l'écran des équipements
type FunctionCallAPIListVetementsProps = {
  idDressing: string
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setDressing: Function
  setVetements: Function
  setError: React.Dispatch<React.SetStateAction<Error | null>>
}

export function callApiDressing({idDressing, setIsLoading, setDressing, setVetements, setError}: FunctionCallAPIListVetementsProps) {

  let params = [{ key: SERVICES_PARAMS.IDX, value: String(idDressing) }];

    setIsLoading(true);
    // Appel du service externe de chargement du dressing
    callBackend(SERVICES_URL.GET_DRESSING, params)
      .then((dressing : DressingModel) => {
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

export default callApiDressing;