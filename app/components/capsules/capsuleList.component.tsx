import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

import { alphanumSort } from "../commons/CommonsUtils";
import { styles } from "../dressing/dressingList.style";
import DressingModel from "@/app/models/dressing.model";
import CapsuleTemporelleModel from "@/app/models/capsule/capsuleTemporelle.model";
import { CapsuleItemComponent } from "../dressing/capsules/capsuleItem.component";
import { CapsuleEmptyComponent } from "../dressing/capsules/capsuleEmpty.component";



export type CapsulesListComponentProps = {
    dressing: DressingModel;
    capsules: CapsuleTemporelleModel[];
    openAddEditCapsule: (capsule?: CapsuleTemporelleModel) => void;
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
export const CapsulesListComponent: React.FC<CapsulesListComponentProps> = ({ dressing, capsules, openAddEditCapsule }: CapsulesListComponentProps) => {


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
                <CapsuleItemComponent key={capsule.id} capsule={capsule} openAddEditCapsule={openAddEditCapsule} />
            ));

        return capsulesItems;
    }


    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[]} vetements - La liste des vêtements à afficher.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
   
    function showPanelVetementsTenue(vetements: TenueVetementModel[]): React.JSX.Element[] {

        let vetementsItems: JSX.Element[] = [];
        vetements.sort((v1, v2) => alphanumSort(v1.libelle, v2.libelle));
        vetements.forEach((item) => {
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item as VetementModel} />);
        });
        return vetementsItems;
    }
  */
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