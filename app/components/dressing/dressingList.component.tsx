import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../commons/ThemedView";
import { ThemedText } from "../commons/ThemedText";
import { StyleSheet, TouchableOpacity } from "react-native";
import VetementModel from "@/app/models/vetements.model";
import { Colors } from "@/constants/Colors";
import { VetemenItemComponent } from "./vetementItem.component";
import { groupeVetementByType } from "@/app/controllers/dressingList.controller";

export type DressingComponentProps = {
    vetements: VetementModel[];
    openAddEditVetement: (vetement?: VetementModel) => void;
};
/**
 * Composant principal pour un dressing
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export const DressingListComponent : React.FC<DressingComponentProps> = ({ vetements, openAddEditVetement }: DressingComponentProps) => {

    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelGroupeVetements(vetementsByGroup: Map<string, VetementModel[]>): React.JSX.Element[] {
        let groupItems: JSX.Element[] = [];
        vetementsByGroup.forEach((vetements, groupe) => {
            groupItems.push(
                <ThemedView key={"key_groupeId_"+groupe} style={styles.groupeLabel}>
                    <ThemedText type="default">{groupe} ({vetements.length})</ThemedText>
                </ThemedView>
            );
            groupItems.push(
                <ThemedView key={"key_groupeList_"+groupe} style={styles.groupeContainer}>
                    {showPanelVetements(vetements)}
                </ThemedView>);
        });
        return groupItems;
    }

    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[]} vetements - La liste des vêtements à afficher.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelVetements(vetements: VetementModel[]): React.JSX.Element[] {

        let vetementsItems: JSX.Element[] = [];
        vetements.forEach((item) => {
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} editVetement={openAddEditVetement} />);
        });

        return vetementsItems;
    }



    return (
        <>
            <ThemedView style={styles.title}>
                <ThemedText type="subtitle">{vetements?.length} vêtement{vetements?.length > 1 ? "s" : ""}</ThemedText>
                <TouchableOpacity onPress={() => openAddEditVetement()}>
                    <Ionicons size={28} name="add-outline" color={Colors.dark.text} />
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.filtre}>
                <ThemedText type="subtitle">Super filtre</ThemedText>
            </ThemedView>

            {showPanelGroupeVetements(groupeVetementByType(vetements))}
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.app.color,
        padding: 5
    },
    filtre: {
        alignItems: 'center',
        width: '100%',
        borderColor: Colors.app.color,
        borderWidth: 2,
        borderRadius: 5,
        marginTop: 5,
        padding: 5
    },
    groupeLabel: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.app.color,
        padding: 5,
        margin: 5,
    },
    groupeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'center',
    },
});