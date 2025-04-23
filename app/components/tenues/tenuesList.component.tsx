import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, View } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { Colors } from "../../constants/Colors";

import { groupeVetementByType as groupeTenuesByType } from "@/app/controllers/dressing/dressingList.controller";
import { useState } from "react";
import { alphanumSort, getTypeVetementIcon, vetementSort } from "../commons/CommonsUtils";
import AccordionItem from "../commons/accordion/AccordionItem.component";
import { DressingEmptyComponent } from "../dressing/dressingEmpty.component";
import { DressingFiltreComponent } from "../dressing/dressingFiltres.component";
import { styles } from "../dressing/dressingList.style";
import { VetemenItemComponent } from "../dressing/vetementItem.component";
import TenueModel from "@/app/models/tenues/tenue.model";
import { TenueEmptyComponent } from "./tenuesEmpty.component";
import DressingModel from "@/app/models/dressing.model";



export type DressingComponentProps = {
    dressing: DressingModel;
    tenuesInDressing: TenueModel[];
    openAddEditTenue: (vetement?: VetementModel) => void;
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
export const TenuesListComponent: React.FC<DressingComponentProps> = ({ dressing, tenuesInDressing, openAddEditTenue: openAddEditVetement }: DressingComponentProps) => {

    const [tenuesAffichees, setTenuesAffichees] = useState<TenueModel[]>([]);

    const [toggleAllItems, setToggleAllItems] = useState(false);


    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelGroupeVetements(vetementsByGroup: Map<string, TenueModel[]>): React.JSX.Element[] {
        let groupItems: JSX.Element[] = [];
        // Sort par nom du groupe
        vetementsByGroup = new Map([...vetementsByGroup.entries()].sort((a, b) => {
            return alphanumSort(a[1][0]?.libelle, b[1][0]?.libelle);
        }));

        vetementsByGroup.forEach((vetements, groupe) => {
            groupItems.push(
                <AccordionItem
                    title={vetements[0]?.libelle + " (" + vetements.length + ")"}
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
    function showPanelVetements(vetements: TenueModel[]): React.JSX.Element[] {

        let vetementsItems: JSX.Element[] = [];
        vetements.sort((a, b) => alphanumSort(a.libelle, b.libelle));
        vetements.forEach((item) => {
            /*
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} editVetement={openAddEditVetement} />);
            */
        });

        return vetementsItems;
    }



    return (
        <>
            <View style={styles.title}>
                <ThemedText type="subtitle" style={{color: Colors.app.color}}>{tenuesAffichees?.length} tenue{tenuesAffichees?.length > 1 ? "s" : ""}</ThemedText>
                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <Pressable onPress={() => openAddEditVetement()}>
                    <Ionicons size={28} name="add-outline" style={styles.titleIcon} />
                </Pressable>
                <Pressable onPress={() => setToggleAllItems(!toggleAllItems)}>
                    <MaterialCommunityIcons size={28} name={toggleAllItems ? "chevron-double-up": "chevron-double-down"} style={styles.titleIcon} />
                </Pressable>
                </View>
            </View>
            { tenuesInDressing.length === 0 && 
                 <TenueEmptyComponent dressing={dressing} openAddTenue={() => openAddEditVetement()} />
            }
            { tenuesInDressing.length > 0 && <>
            <View>
                <DressingFiltreComponent vetementsInDressing={[]} setVetementsAffiches={setTenuesAffichees} />
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                {showPanelGroupeVetements(groupeTenuesByType(tenuesAffichees))}
            </ScrollView></>
            }
        </>
    );
}