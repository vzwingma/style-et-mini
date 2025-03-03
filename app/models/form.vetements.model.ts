import ParamTypeVetementsModel from "./params/paramTypeVetements.model";
import ParamTailleVetementsModel from "./params/paramTailleVetements.model";
import ParamUsageVetementsModel from "./params/paramUsageVetements.model";
import DressingModel from "./dressing.model";
import VetementModel from "./vetements.model";
import { StatutVetementEnum } from "@/constants/AppEnum";
import ParamEtatVetementsModel from "./params/paramEtatVetements.model";

/**
 * Modèle représentant un vetement dans le formulaire
 */
interface FormVetementModel {
    id          : string;
    dressing    : DressingModel;
    libelle     : string;
    type        : ParamTypeVetementsModel;
    taille      : ParamTailleVetementsModel;
    petiteTaille: boolean;
    usages      : ParamUsageVetementsModel[];
    usagesListe : string[];
    etat        : ParamEtatVetementsModel;
    image       : string;
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
        id              : form.id,
        image           : form.image,
        dressing        : form.dressing,
        libelle         : form.libelle,
        type: {
            id          : form.type.id,
            libelle     : form.type.libelle,
        },
        taille: {
            id          : form.taille.id,
            libelle     : form.taille.libelle,
            petite      : form.petiteTaille,
        },
        usages: form.usages.map((usage: ParamUsageVetementsModel) => {
            return {
                id      : usage.id,
                libelle : usage.libelle
            }}),
        couleurs: form.couleurs,
        description: form.description,
        statut: StatutVetementEnum.ACTIF,
    };

    if (form.etat) {
        vetement.etat = {
            id          : form.etat.id,
            libelle     : form.etat.libelle,
        };
    }
    return vetement;
}
export default FormVetementModel;