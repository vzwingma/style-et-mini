import { SERVICES_PARAMS, SERVICES_URL } from "@/app/constants/APIconstants";
import CapsuleTemporelleModel from "../../models/capsule/capsuleTemporelle.model";
import ParamGenericVetementsModel from "../../models/params/paramGenericVetements.model";
import { callGETBackend } from "@/app/services/ClientHTTP.service";
import { showToast, ToastDuration } from "@/app/components/commons/AndroidToast";



/**
 * Charge les tenues d'un dressing spécifique et met à jour l'état correspondant.
 *
 * @param idDressing - L'identifiant unique du dressing à charger.
 * @param setCapsules - Fonction de mise à jour de l'état pour définir les tenues chargées.
 * @returns Une promesse qui se résout une fois que les tenues sont chargées et l'état mis à jour.
 *
 * @remarks
 * Cette fonction effectue un appel au backend pour récupérer les tenues associées
 * à un dressing donné. En cas de succès, elle met à jour l'état avec les données
 * récupérées. En cas d'erreur, un message d'erreur est affiché via un toast.
 *
 */
export function loadCapsulesDressing(idDressing : string, setCapsules: React.Dispatch<React.SetStateAction<CapsuleTemporelleModel[]>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) : Promise<void> {

    let params = [{ key: SERVICES_PARAMS.ID_DRESSING, value: String(idDressing) }];
    setIsLoading(true);
    // Appel du service externe de chargement du dressing
    return callGETBackend(SERVICES_URL.SERVICE_CAPSULES, params)
      .then((capsules: CapsuleTemporelleModel[]) => {
        console.log("Dressing ", capsules?.at(0)?.dressing.libelle ?? idDressing, "chargé : ", capsules?.length, "capsules");
        setCapsules(capsules);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error('Une erreur s\'est produite lors du chargement des capsules', e);
        showToast("Erreur : Chargement des capsules", ToastDuration.LONG);
        setIsLoading(false);
      });
  }

  


interface ParamProps {
    typeVetements: ParamGenericVetementsModel[];
    taillesMesures: ParamGenericVetementsModel[];
    usages: ParamGenericVetementsModel[];
}


/*

export function getCapsuleByParam(dressing : DressingModel, capsule: CapsuleTemporelleModel[], { typeVetements: paramTypeVetements , taillesMesures: paramTaillesMesures, usages: paramUsages }: ParamProps): CapsuleTemporelleModel[] | null {

    if (!dressing) return null;
    if (!paramTypeVetements || !paramTaillesMesures || !paramUsages) return null;
    paramTypeVetements = paramTypeVetements.filter((type) => type.categories
    .filter((cat) => cat === dressing.categorie)
    .length > 0);

    paramTaillesMesures = paramTaillesMesures.filter((type) => type.categories
    .filter((cat) => cat === dressing.categorie)
    .length > 0);

    paramUsages = paramUsages.filter((type) => type.categories
    .filter((cat) => cat === dressing.categorie)
    .length > 0);


    for (const paramType of paramTypeVetements) {
        for (const paramTaille of paramTaillesMesures) {
            for (const paramUsage of paramUsages) {
                capsule.push({
                    typeVetements: {
                        id: paramType.id,
                        libelle: paramType.libelle
                    },
                    taillesMesures: {
                        id: paramTaille.id,
                        libelle: paramTaille.libelle
                    },
                    usages: {
                        id: paramUsage.id,
                        libelle: paramUsage.libelle
                    },
                });
            }
        }
    }
    console.log("capsule", capsule);
    return capsule;
} */