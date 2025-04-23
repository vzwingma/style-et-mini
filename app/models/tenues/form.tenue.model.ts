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
 * @param vetementInEdition - L'objet vêtement en cours d'édition.
 * @param dressing - Le dressing associé au vêtement.
 * @param params - Les paramètres nécessaires pour effectuer la transformation.
 * @param params.paramsTypeVetements - Liste des types de vêtements disponibles.
 * @param params.paramsTaillesMesures - Liste des tailles et mesures disponibles.
 * @param params.paramsUsagesVetements - Liste des usages de vêtements disponibles.
 * @param params.paramsEtatVetements - Liste des états de vêtements disponibles.
 * @param params.paramsMarquesVetements - Liste des marques de vêtements disponibles.
 * 
 * @returns Un objet `FormVetementModel` mis à jour avec les données du vêtement en édition.
 
export function transformVetementToFormModel(form: FormVetementModel, vetementInEdition: VetementModel, dressing: DressingModel,
    { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements, paramsEtatVetements, paramsMarquesVetements }: VetementsFormParamsTypeProps) : FormVetementModel{

        return {
            ...form,
            id              : vetementInEdition.id,
            image           : {
                s3uri       : vetementInEdition.image?.s3uri,
                hauteur     : vetementInEdition.image?.hauteur,
                largeur     : vetementInEdition.image?.largeur
            },  
            libelle         : vetementInEdition.libelle,
            dressing        : dressing,
            type            : paramsTypeVetements?.find((type) => type.id === vetementInEdition.type.id) ?? (() => { throw new Error("Type "+ vetementInEdition.type.id +" introuvable"); })(),
            taille          : paramsTaillesMesures?.find((taille) => taille.id === vetementInEdition.taille.id) ?? (() => { throw new Error("Taille "+vetementInEdition.taille.id+" introuvable"); })(),
            petiteTaille    : vetementInEdition.taille?.petite ?? false,

            usagesListe     : vetementInEdition.usages?.map((usage) => usage.id).filter((id): id is string => id !== undefined) ?? [],
            usages          : vetementInEdition.usages
                                .map((usage) => paramsUsagesVetements?.find((u) => u.id === usage.id))
                                .filter((usage): usage is ParamGenericVetementsModel => usage !== undefined),
            
            saisons         : vetementInEdition.saisons ?? [],
            couleurs        : vetementInEdition.couleurs,

            marque          : paramsMarquesVetements?.find((marque) => marque.id === (vetementInEdition.marque?.id ?? ID_MARQUE_AUTRES)) ?? (() => { throw new Error("Marque " + vetementInEdition.etat?.id + " introuvable"); })(),
            collection      : vetementInEdition.collection,
            etat            : paramsEtatVetements?.find((etat) => etat.id === vetementInEdition.etat?.id) ?? null,

            prixAchat       : vetementInEdition.prix?.achat != null ? vetementInEdition.prix.achat.toString() : null,
            prixNeuf        : vetementInEdition.prix?.neuf != null ? vetementInEdition.prix.neuf.toString() : null,
            description     : vetementInEdition.description ?? null,

            statut          : vetementInEdition.statut ?? StatutVetementEnum.ACTIF
        }
    }
*/
export default FormTenueModel;