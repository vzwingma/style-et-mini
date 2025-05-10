import { ThemedText } from "@/app/components/commons/views/ThemedText";
import CapsuleTemporelleModel from "@/app/models/capsule/capsuleTemporelle.model";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { stylesForm } from "../vetements/vetementForm.styles";
import { stylesItem } from "../../reglages/parametrageItem.component";
import CapsuleCritereModel from "@/app/models/capsule/capsuleCritere";
import { renderSelectedItemView } from "../../commons/CommonsUtils";


/**
 * @description Composant d'un item de la liste des capsules
 * @param {ParametragesItemComponentProps} props - Propriétés du composant
 * @returns {JSX.Element} - Composant d'un item de la liste des capsules
 * @component
 */
export type CapsuleItemComponentProps = {
    readonly capsule: CapsuleTemporelleModel
    openAddEditCapsule: (capsule?: CapsuleTemporelleModel) => void
    viewVetementCapsule: (capsule: CapsuleTemporelleModel) => void
};


/**
 * Composant React fonctionnel représentant un élément de capsule.
 *
 * @param {CapsuleItemComponentProps} props - Les propriétés du composant.
 * @param {Capsule} props.capsule - L'objet capsule contenant les informations à afficher.
 * @param {(capsule: Capsule) => void} props.openAddEditCapsule - Fonction appelée lors de l'édition de la capsule.
 *
 * @returns {JSX.Element} Un composant JSX affichant les détails d'une capsule avec une option d'édition.
 */
export const CapsuleItemComponent: React.FC<CapsuleItemComponentProps> = ({ capsule, openAddEditCapsule, viewVetementCapsule }: CapsuleItemComponentProps) => {
    const l = (capsule.nbrVetements.dressing ?? 0) < capsule.nbrVetements.capsule;
    return (
        <View style={[stylesItem.container]}>
            <View style={stylesItem.title}>
                <ThemedText type="subtitle">{capsule.libelle}</ThemedText>
                { /** Icônes édition */}
                <View style={stylesForm.rowItems}>
                    <Pressable onPress={() => openAddEditCapsule(capsule)}>
                        <Ionicons size={18} name="pencil-outline" style={stylesItem.titleIcon} />
                    </Pressable>
                </View>
            </View>
            { /** liste des items  */}
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>Critères</ThemedText>
                <View style={[{flex: 1, flexWrap: "wrap", paddingVertical: 10}, stylesForm.rowItems]}>
                    { capsule.criteres?.map((critere: CapsuleCritereModel, index: number) => {
                        return renderSelectedItemView({ id: critere.id, libelle: critere.libelle }, index)
                    })
                    }
                </View>
            </View>
            { /** liste des vetements  */}
            <View style={[stylesItem.ligne]}>
                <View style={[stylesForm.rowItems, {alignContent: "center", flexWrap: "wrap"}]}>
                    <ThemedText type="defaultSemiBold" style={stylesForm.label}>Nb vêtements</ThemedText>
                    <ThemedText type="subtitle" style={{ color: (l ? '#ffb74d' : '#81c784') }}>{capsule.nbrVetements.dressing}</ThemedText><ThemedText type="subtitle"> / {capsule.nbrVetements.capsule}</ThemedText>
                </View>
                { /** Icônes édition */}
                <Pressable onPress={() => viewVetementCapsule(capsule)}>
                    <Ionicons size={18} name="eye-outline" style={stylesItem.titleIcon} />
                </Pressable>

            </View>

            { /** commentaire  */
            capsule.commentaire && 
            <View style={[stylesForm.rowItems, {alignContent: "center", flexWrap: "wrap", paddingTop: 10}]}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>Commentaire</ThemedText>
                <ThemedText type="default">{capsule.commentaire}</ThemedText>
            </View>            
            }
        </View>
    );
};