import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../../commons/views/ThemedText";
import { Pressable, ScrollView, View } from "react-native";
import { Colors } from "../../../constants/Colors";

import { alphanumSort } from "../../commons/CommonsUtils";
import { styles } from "../dressingList.style";
import CapsuleTemporelleModel from "@/app/models/capsule/capsuleTemporelle.model";
import { CapsuleEmptyComponent } from "./capsuleEmpty.component";
import { CapsuleItemComponent } from "./capsuleItem.component";
import { JSX } from "react";



export type CapsulesListComponentProps = {
    capsules: CapsuleTemporelleModel[];
    openAddEditCapsule: (capsule?: CapsuleTemporelleModel) => void;
    viewVetementCapsule: (capsule: CapsuleTemporelleModel) => void;
};

/**
 * Composant React représentant une liste de capsules temporelles.
 *
 * @param {CapsulesListComponentProps} props - Les propriétés du composant.
 * @param {DressingModel} props.dressing - Le dressing auquel les capsules sont associées.
 * @param {CapsuleTemporelleModel[]} props.capsules - La liste des capsules temporelles à afficher.
 * Chaque capsule contient des informations telles que son libellé et son identifiant.
 * @param {(capsule?: CapsuleTemporelleModel) => void} props.openAddEditCapsule - Fonction appelée pour ouvrir
 * le panneau d'ajout ou d'édition d'une capsule. Si une capsule est fournie, elle sera éditée, sinon une nouvelle
 * capsule sera créée.
 *
 * @returns {React.JSX.Element} Un composant JSX affichant une liste de capsules temporelles.
 * Si aucune capsule n'est disponible, un composant vide est affiché. Sinon, chaque capsule est représentée
 * par un conteneur cliquable permettant d'éditer la capsule et une zone de défilement horizontal pour afficher
 * des vêtements associés (commentée dans le code).
 */
export const CapsulesListComponent: React.FC<CapsulesListComponentProps> = ({ capsules, openAddEditCapsule, viewVetementCapsule }: CapsulesListComponentProps) => {


    /**
     * Génère une liste d'éléments React représentant des capsules temporelles.
     *
     * @param capsules - Tableau de modèles de capsules temporelles à afficher.
     * Chaque capsule contient des informations telles que son libellé et son identifiant.
     * 
     * @returns Un tableau d'éléments React JSX représentant les capsules.
     * Chaque élément inclut un conteneur avec un en-tête cliquable pour éditer la capsule
     * et une zone de défilement horizontal pour afficher des vêtements associés (commentée dans le code).
     */
    function showPanelCapsules(capsules: CapsuleTemporelleModel[]): React.JSX.Element[] {

        let capsulesItems: JSX.Element[] = [];
        capsules.sort((caps1, caps2) => alphanumSort(caps1.libelle, caps2.libelle));
        capsules.forEach((capsule) => capsulesItems.push(
            <CapsuleItemComponent key={capsule.id} capsule={capsule} openAddEditCapsule={openAddEditCapsule} viewVetementCapsule={viewVetementCapsule} />
        ));
        return capsulesItems;
    }

    return (
        <>
            <View style={[styles.title, { marginBottom: 5 }]}>
                <ThemedText type="subtitle" style={{ color: Colors.app.color }}>{capsules?.length} capsule{capsules?.length > 1 ? "s" : ""}</ThemedText>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <Pressable onPress={() => openAddEditCapsule()}>
                        <Ionicons size={28} name="add-outline" style={styles.titleIcon} />
                    </Pressable>
                </View>
            </View>
            {capsules.length === 0 &&
                <CapsuleEmptyComponent openAddEditCapsule={openAddEditCapsule} />
            }
            {capsules.length > 0 &&
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {showPanelCapsules(capsules)}
                </ScrollView>
            }
        </>
    );
}