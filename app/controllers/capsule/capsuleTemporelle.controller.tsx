import CapsuleTemporelleModel from "../../models/capsule/capsuleTemporelle.model";
import DressingModel from "../../models/dressing.model";
import ParamGenericVetementsModel from "../../models/params/paramGenericVetements.model";


interface ParamProps {
    typeVetements: ParamGenericVetementsModel[];
    taillesMesures: ParamGenericVetementsModel[];
    usages: ParamGenericVetementsModel[];
}

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
}