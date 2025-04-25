import { ThemedText } from "@/app/components/commons/views/ThemedText";
import CapsuleTemporelleModel from "@/app/models/capsule/capsuleTemporelle.model";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { stylesForm } from "../vetements/vetementForm.styles";
import { stylesItem } from "../../reglages/parametrageItem.component";

/**
 * @description Composant d'un item de la liste des capsules
 * @param {ParametragesItemComponentProps} props - Propriétés du composant
 * @returns {JSX.Element} - Composant d'un item de la liste des capsules
 * @component
 */
export type CapsuleItemComponentProps = {
    readonly capsule: CapsuleTemporelleModel
    openAddEditCapsule: (capsule?: CapsuleTemporelleModel) => void
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
export const CapsuleItemComponent: React.FC<CapsuleItemComponentProps> = ({ capsule, openAddEditCapsule }: CapsuleItemComponentProps) => {
    return (
        <View style={[stylesItem.container]}>
            <View style={stylesItem.title}>
                <ThemedText type="subtitle">{capsule.libelle}</ThemedText>
                { /** Icoônes édition */}
                <View style={stylesForm.rowItems}>
                    <Pressable onPress={() => openAddEditCapsule(capsule)}>
                        <Ionicons size={18} name="pencil-outline" style={stylesItem.titleIcon} />
                    </Pressable>
                </View>
            </View>
            { /** Formulaire  */}
            <View style={stylesForm.rowItems}>
                <ThemedText type="subtitle">{capsule.libelle}</ThemedText>
            </View>
            
        </View>
    );
};