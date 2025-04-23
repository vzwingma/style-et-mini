import { StatutVetementEnum } from "@/app/constants/AppEnum";
import DressingModel from "../dressing.model";

import GenericModel from "../generic.model";
import VetementModel from "../vetements/vetements.model";
import TenueModel from "./tenue.model";

/**
 * Modèle représentant un vetement dans le formulaire
 */
interface FormTenueModel extends GenericModel {
    dressing     : DressingModel;
    vetements?   : VetementModel[] | null;
    statut       : StatutVetementEnum | null;
}


/**
 * Transforme un formulaire en modèle de vêtement
 * @param form formulaire
 * @returns modèle de vêtement
 */
export function transformFormToTenueModel(form: FormTenueModel): TenueModel {
    const tenue: TenueModel = {
        id              : form.id,
        dressing        : form.dressing,
        libelle         : form.libelle,
        vetements       : form.vetements?.map((vetement: VetementModel) => {
            return {
                id      : vetement.id,
                libelle : vetement.libelle,
                image: {
                    s3uri       : vetement.image?.s3uri,
                    hauteur     : vetement.image?.hauteur,
                    largeur     : vetement.image?.largeur
                },
            }}),
        statut: form.statut,
    };
    return tenue;
}



/**
 * Transforme un objet `VetementModel` en un modèle de formulaire `FormVetementModel`.
 *
 * @param form - Le modèle de formulaire existant à mettre à jour.
 * @param tenueInEdition - L'objet vêtement en cours d'édition.
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
export function transformTenueToFormModel(form: FormTenueModel, tenueInEdition: TenueModel, dressing: DressingModel) : FormTenueModel{

        return {
            ...form,
            id              : tenueInEdition.id,
            libelle         : tenueInEdition.libelle,
            dressing        : dressing,
            vetements       : tenueInEdition.vetements?.map((vetement: GenericModel) => {
                return {
                    id      : vetement.id,
                    libelle : vetement.libelle,
                    /*
                    image: {
                        s3uri       : vetement.image?.s3uri,
                        hauteur     : vetement.image?.hauteur,
                        largeur     : vetement.image?.largeur /
                    }, */
                } as VetementModel}),
            statut          : tenueInEdition.statut ?? StatutVetementEnum.ACTIF
        }
    }
export default FormTenueModel;