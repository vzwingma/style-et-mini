import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, View } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { Colors } from "../../../app/constants/Colors";
import { VetemenItemComponent } from "./vetementItem.component";
import { groupeVetementByType } from "@/app/controllers/dressingList.controller";
import { useState } from "react";
import { alphanumSort, getTypeVetementIcon, vetementSort } from "../commons/CommonsUtils";
import { styles } from "./dressingList.style";
import { DressingFiltreComponent } from "./dressingFiltres.component";
import AccordionItem from "../commons/accordion/AccordionItem.component";
import { DressingEmptyComponent } from "./dressingEmpty.component";



export type DressingComponentProps = {
    vetementsInDressing: VetementModel[];
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
export const DressingListComponent: React.FC<DressingComponentProps> = ({ vetementsInDressing, openAddEditVetement }: DressingComponentProps) => {

    const [vetementsAffiches, setVetementsAffiches] = useState<VetementModel[]>([]);

    const [toggleAllItems, setToggleAllItems] = useState(false);


    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelGroupeVetements(vetementsByGroup: Map<string, VetementModel[]>): React.JSX.Element[] {
        let groupItems: JSX.Element[] = [];
        // Sort par nom du groupe
        vetementsByGroup = new Map([...vetementsByGroup.entries()].sort((a, b) => {
            return alphanumSort(a[1][0]?.type.libelle, b[1][0]?.type.libelle);
        }));

        vetementsByGroup.forEach((vetements, groupe) => {
            groupItems.push(
                <AccordionItem
                    title={vetements[0]?.type?.libelle + " (" + vetements.length + ")"}
                    icon={getTypeVetementIcon(groupe)}
                    toggleAllItems={toggleAllItems}
                    key={"key_groupeId_" + groupe}>
                    {showPanelVetements(vetements)}
                </AccordionItem>
            );
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
        vetements.sort(vetementSort);
        vetements.forEach((item) => {
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} editVetement={openAddEditVetement} />);
        });

        return vetementsItems;
    }



    return (
        <>
            <View style={styles.title}>
                <ThemedText type="subtitle" style={{color: Colors.app.color}}>{vetementsAffiches?.length} vêtement{vetementsAffiches?.length > 1 ? "s" : ""}</ThemedText>
                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <Pressable onPress={() => openAddEditVetement()}>
                    <Ionicons size={28} name="add-outline" style={styles.titleIcon} />
                </Pressable>
                <Pressable onPress={() => setToggleAllItems(!toggleAllItems)}>
                    <MaterialCommunityIcons size={28} name={toggleAllItems ? "chevron-double-up": "chevron-double-down"} style={styles.titleIcon} />
                </Pressable>
                </View>
            </View>
            { vetementsInDressing.length === 0 && 
                 <DressingEmptyComponent openAddVetement={() => openAddEditVetement()} />
            }
            { vetementsInDressing.length > 0 && <>
            <View>
                <DressingFiltreComponent vetementsInDressing={vetementsInDressing} setVetementsAffiches={setVetementsAffiches} />
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                {showPanelGroupeVetements(groupeVetementByType(vetementsAffiches))}
            </ScrollView></>
            }
        </>
    );
}