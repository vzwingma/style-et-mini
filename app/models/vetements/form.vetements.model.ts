import DressingModel from "../dressing.model";
import VetementModel from "./vetements.model";
import { ID_MARQUE_AUTRES, SaisonVetementEnum, StatutVetementEnum } from "@/app/constants/AppEnum";
import VetementImageModel from "./vetements.image.model";

import { getPriceValue } from "../../components/commons/CommonsUtils";
import ParamGenericVetementsModel from "../params/paramGenericVetements.model";
import GenericModel from "../generic.model";
import { VetementsFormParamsTypeProps } from "@/app/components/dressing/vetements/vetementForm.component";

/**
 * Modèle représentant un vetement dans le formulaire
 */
interface FormVetementModel extends GenericModel {
    edited       : boolean,

    dressing     : DressingModel;
    image?       : VetementImageModel | null;
    
    type         : ParamGenericVetementsModel;
    taille       : ParamGenericVetementsModel;
    petiteTaille : boolean;
    
    usages       : ParamGenericVetementsModel[];
    usagesListe  : string[];
    
    saisons      : SaisonVetementEnum[];
    couleurs?    : string | null;
    collection?  : string | null;
    marque       : ParamGenericVetementsModel;
    
    prixNeuf?    : string | null;
    prixAchat?   : string | null;

    etat         : ParamGenericVetementsModel | null;
    description  : string | null;
    statut       : StatutVetementEnum;
}


/**
 * Transforme un formulaire en modèle de vêtement
 * @param form formulaire
 * @returns modèle de vêtement
 */
export function transformFormToVetementModel(form: FormVetementModel): VetementModel {
    const vetement: VetementModel = {
        id              : form.id,
        image           : {
            s3uri       : form.image?.s3uri,
            hauteur     : form.image?.hauteur,
            largeur     : form.image?.largeur
        },
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
        usages: form.usages.map((usage: ParamGenericVetementsModel) => {
            return {
                id      : usage.id,
                libelle : usage.libelle
            }}),
        saisons: form.saisons,
        couleurs: form.couleurs,
        collection: form.collection,
        marque: {
            id          : form.marque.id,
            libelle     : form.marque.libelle,
        },
        prix: {
            achat: getPriceValue(form.prixAchat),
            neuf : getPriceValue(form.prixNeuf),
        },
        description: form.description,
        statut: form.statut,
    };

    if (form.etat) {
        vetement.etat = {
            id          : form.etat.id,
            libelle     : form.etat.libelle,
        };
    }
    return vetement;
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
 */
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

export default FormVetementModel;