import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, View } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { Colors } from "../../constants/Colors";

import { useState } from "react";
import { alphanumSort, vetementSort } from "../commons/CommonsUtils";
import { styles } from "../dressing/dressingList.style";
import TenueModel from "@/app/models/tenues/tenue.model";
import { TenueEmptyComponent } from "./tenuesEmpty.component";
import DressingModel from "@/app/models/dressing.model";
import AccordionItem from "../commons/accordion/AccordionItem.component";
import { VetemenItemComponent } from "../dressing/vetementItem.component";



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

    const [toggleAllItems, setToggleAllItems] = useState(false);


    /**
     * Affiche un panneau contenant une liste de tenues.
     *
     * @param {VetementModel[]} tenues - La liste des tenues à afficher.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelTenues(tenues: TenueModel[]): React.JSX.Element[] {

        let tenuesItems: JSX.Element[] = [];
        tenues.sort((a, b) => alphanumSort(a.libelle, b.libelle));
        
        tenues.forEach((tenue) => tenuesItems.push(
                <AccordionItem title={tenue.libelle}
                    icon={null}
                    toggleAllItems={toggleAllItems}
                    key={"key_groupeId_" + tenue}>
                    {tenue.vetements ? showPanelVetementsTenue(tenue.vetements) : null}
                </AccordionItem>));
                
        return tenuesItems;
    }


    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[]} vetements - La liste des vêtements à afficher.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelVetementsTenue(vetements: any[]): React.JSX.Element[] {

        let vetementsItems: JSX.Element[] = [];
        vetements.sort(vetementSort);
        vetements.forEach((item) => {
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} editVetement={() => {}} />);
        });

        return vetementsItems;
    }

    return (
        <>
            <View style={styles.title}>
                <ThemedText type="subtitle" style={{color: Colors.app.color}}>{tenuesInDressing?.length} tenue{tenuesInDressing?.length > 1 ? "s" : ""}</ThemedText>
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
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                {showPanelTenues(tenuesInDressing)}
            </ScrollView></>
            }
        </>
    );
}