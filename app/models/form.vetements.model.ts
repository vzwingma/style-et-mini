import ParamTypeVetementsModel from "./paramTypeVetements.model";
import ParamTailleVetementsModel from "./paramTailleVetements.model";
import ParamUsageVetementsModel from "./paramUsageVetements.model";
import DressingModel from "./dressing.model";
import VetementModel from "./vetements.model";
import { StatutVetementEnum } from "@/constants/AppEnum";

/**
 * Modèle représentant un vetement dans le formulaire
 */
export default interface FormVetementModel {
    id          : string;
    dressing    : DressingModel;
    libelle     : string;
    type        : ParamTypeVetementsModel;
    taille      : ParamTailleVetementsModel;
    usages      : ParamUsageVetementsModel[];
    usagesListe : string[];
    couleurs    : string;
    description : string;
}


/**
 * Transforme un formulaire en modèle de vêtement
 * @param form formulaire
 * @returns modèle de vêtement
 */
export function transformFormToVetementModel(form: FormVetementModel): VetementModel {

    const vetement: VetementModel = {
        id: form.id,
        dressing        : form.dressing,
        libelle         : form.libelle,
        type: {
            id          : form.type.id,
            libelle     : form.type.libelle,
        },
        taille: {
            id          : form.taille.id,
            libelle     : form.taille.libelle,
        },
        usages: form.usages.map((usage: ParamUsageVetementsModel) => {
            return {
                id      : usage.id,
                libelle : usage.libelle
            }}),
        couleurs: [form.couleurs],
        description: form.description,
        statut: StatutVetementEnum.ACTIF,
    }
    return vetement;
}