import { StatutVetementEnum } from "@/app/constants/AppEnum";
import DressingModel from "../dressing.model";

import GenericModel from "../generic.model";
import CapsuleTemporelleModel from "./capsuleTemporelle.model";


/**
 * Modèle représentant un vetement dans le formulaire
 */
interface FormCapsuleModel extends GenericModel {
    dressing     : DressingModel;
    statut       : StatutVetementEnum | null;
}


/**
 * Transforme un formulaire en modèle de capsule
 * @param form formulaire
 * @returns modèle de capsule
 */
export function transformFormToCapsuleModel(form: FormCapsuleModel): CapsuleTemporelleModel {
    const tenue: CapsuleTemporelleModel = {
        id              : form.id,
        dressing        : form.dressing,
        libelle         : form.libelle,
        statut          : form.statut ?? StatutVetementEnum.ACTIF,
    };
    return tenue;
}



/**
 * Transforme un objet `VetementModel` en un modèle de formulaire `FormVetementModel`.
 *
 * @param form - Le modèle de formulaire existant à mettre à jour.
 * @param capsuleInEdition - L'objet vêtement en cours d'édition.
 * @param dressing - Le dressing associé au vêtement.
 * @param params - Les paramètres nécessaires pour effectuer la transformation.
 * @param params.paramsTypeVetements - Liste des types de vêtements disponibles.
 * @param params.paramsTaillesMesures - Liste des tailles et mesures disponibles.
 * @param params.paramsUsagesVetements - Liste des usages de vêtements disponibles.
 * @param params.paramsEtatVetements - Liste des états de vêtements disponibles.
 * @param params.paramsMarquesVetements - Liste des marques de vêtements disponibles.
 * 
 * @returns Un objet `FormVetementModel` mis à jour avec les données du vêtement en édition.
 */
export function transformCapsuleToFormModel(form: FormCapsuleModel, capsuleInEdition: CapsuleTemporelleModel, dressing: DressingModel) : FormCapsuleModel{

        return {
            ...form,
            id              : capsuleInEdition.id,
            libelle         : capsuleInEdition.libelle,
            dressing        : dressing,
            statut          : capsuleInEdition.statut ?? StatutVetementEnum.ACTIF
        }
    }
export default FormCapsuleModel;