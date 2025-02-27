import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../commons/ThemedView";
import { ThemedText } from "../commons/ThemedText";
import { StyleSheet, TouchableOpacity } from "react-native";
import VetementModel from "@/app/models/vetements.model";
import { Colors } from "@/constants/Colors";

export type DressingComponentProps = {
    vetements: VetementModel[];
    openAddVetement: () => void;
};
/**
 * Composant principal pour un dressing
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 * @example
 * return (
 *   <ReglagesComponent />
 * )
 *
 * @remarks
 * Ce composant utilise un menu latéral pour afficher différents paramètres.
 * Le menu peut être ouvert et fermé en appuyant sur les éléments de la liste.
 **/
export const DressingListComponent : React.FC<DressingComponentProps> = ({ vetements, openAddVetement }: DressingComponentProps) => {

    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelVetements(vetements: VetementModel[] | undefined): React.JSX.Element {
        let panel: JSX.Element;
        let items: JSX.Element[] = [];
        if (vetements !== undefined) {
            vetements.forEach((item) => {
                items.push(<ThemedText key={item.id}>{JSON.stringify(item)}</ThemedText>);
            });
        }
        panel = <>{items}</>;
        return panel;
    }


    return (
        <>
            <ThemedView style={styles.title}>
                <ThemedText type="subtitle">{vetements?.length} vêtement{vetements?.length > 1 ? "s" : ""}</ThemedText>
                <TouchableOpacity onPress={() => openAddVetement()}>
                    <Ionicons size={28} name="add-outline" color={Colors.dark.text} />
                </TouchableOpacity>
            </ThemedView>

            <ThemedView style={styles.filtre}>
                <ThemedText type="subtitle">Super filtre</ThemedText>
            </ThemedView>

            {showPanelVetements(vetements)}
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
    }
});