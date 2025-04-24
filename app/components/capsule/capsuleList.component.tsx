import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, Text, View } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { Colors } from "../../constants/Colors";

import { alphanumSort } from "../commons/CommonsUtils";
import { styles } from "../dressing/dressingList.style";
import DressingModel from "@/app/models/dressing.model";
import { styles as styleAccord } from "../commons/accordion/AccordionItem.component";
import { VetemenItemComponent } from "../dressing/vetementItem.component";
import TenueVetementModel from "@/app/models/tenues/tenue.vetements.model";
import CapsuleTemporelleModel from "@/app/models/capsule/capsuleTemporelle.model";
import { CapsuleEmptyComponent } from "./capsuleEmpty.component";



export type CapsulesListComponentProps = {
    dressing: DressingModel;
    capsules: CapsuleTemporelleModel[];
    openAddEditCapsule: (capsule?: CapsuleTemporelleModel) => void;
};

/**
 * Composant React représentant une liste de tenues dans un dressing.
 *
 * @param {CapsulesListComponentProps} props - Les propriétés du composant.
 * @param {DressingModel} props.dressing - Le dressing contenant les tenues.
 * @param {TenueModel[]} props.capsules - La liste des tenues à afficher dans le dressing.
 * @param {(tenue?: TenueModel) => void} props.openAddEditTenue - Fonction permettant d'ouvrir l'interface d'ajout ou d'édition d'une tenue.
 *
 * @returns {React.JSX.Element} Un élément JSX affichant la liste des tenues ou un message vide si aucune tenue n'est disponible.
 *
 * @remarks
 * Ce composant affiche une liste de tenues triées par ordre alphabétique. Chaque tenue est affichée avec un bouton permettant de l'éditer.
 * Si aucune tenue n'est disponible, un composant vide est affiché avec une option pour ajouter une nouvelle tenue.
 */
export const CapsulesListComponent: React.FC<CapsulesListComponentProps> = ({ dressing, capsules, openAddEditCapsule }: CapsulesListComponentProps) => {


    /**
     * Affiche un panneau contenant une liste de tenues.
     *
     * @param {VetementModel[]} tenues - La liste des tenues à afficher.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelCapsules(capsules: CapsuleTemporelleModel[]): React.JSX.Element[] {

        let tenuesItems: JSX.Element[] = [];
        capsules.sort((tenue1, tenue2) => alphanumSort(tenue1.libelle, tenue2.libelle));

        capsules.forEach((capsule) => tenuesItems.push(

            <View key={"panel"+capsule.id} style={styleAccord.accordContainer}>
                <Pressable onPress={() => openAddEditCapsule(capsule)}>
                <View style={styleAccord.accordHeaderTitre}>
                    <Text style={styleAccord.groupeLabel}>{capsule.libelle}</Text>
                    <Ionicons size={18} name="pencil-outline" style={styleAccord.icon} />
                </View>
                </Pressable>
                <ScrollView contentInsetAdjustmentBehavior="automatic" horizontal={true} >
                {/**  showPanelVetementsTenue(capsule.vetements ?? [])  */ }
                </ScrollView>
            </View>));

        return tenuesItems;
    }


    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[]} vetements - La liste des vêtements à afficher.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelVetementsTenue(vetements: TenueVetementModel[]): React.JSX.Element[] {

        let vetementsItems: JSX.Element[] = [];
        vetements.sort((v1, v2) => alphanumSort(v1.libelle, v2.libelle));
        vetements.forEach((item) => {
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item as VetementModel} />);
        });
        return vetementsItems;
    }

    return (
        <>
            <View style={[styles.title, {marginBottom: 5}]}>
                <ThemedText type="subtitle" style={{ color: Colors.app.color }}>{capsules?.length} capsule{capsules?.length > 1 ? "s" : ""}</ThemedText>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <Pressable onPress={() => openAddEditCapsule()}>
                        <Ionicons size={28} name="add-outline" style={styles.titleIcon} />
                    </Pressable>
                </View>
            </View>
            {capsules.length === 0 &&
                <CapsuleEmptyComponent dressing={dressing} openAddEditCapsule={openAddEditCapsule} />
            }
            {capsules.length > 0 && 
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {showPanelCapsules(capsules)}
                </ScrollView>
            }
        </>
    );
}