import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, Text, View } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { Colors } from "../../constants/Colors";

import { alphanumSort } from "../commons/CommonsUtils";
import { styles } from "../dressing/dressingList.style";
import TenueModel from "@/app/models/tenues/tenue.model";
import { TenueEmptyComponent } from "./tenuesEmpty.component";
import DressingModel from "@/app/models/dressing.model";
import { styles as styleAccord } from "../commons/accordion/AccordionItem.component";
import { VetemenItemComponent } from "../dressing/vetementItem.component";
import TenueVetementModel from "@/app/models/tenues/tenue.vetements.model";



export type DressingComponentProps = {
    dressing: DressingModel;
    tenuesInDressing: TenueModel[];
    openAddEditTenue: (tenue?: TenueModel) => void;
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
export const TenuesListComponent: React.FC<DressingComponentProps> = ({ dressing, tenuesInDressing, openAddEditTenue }: DressingComponentProps) => {


    /**
     * Affiche un panneau contenant une liste de tenues.
     *
     * @param {VetementModel[]} tenues - La liste des tenues à afficher.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelTenues(tenues: TenueModel[]): React.JSX.Element[] {

        let tenuesItems: JSX.Element[] = [];
        tenues.sort((tenue1, tenue2) => alphanumSort(tenue1.libelle, tenue2.libelle));

        tenues.forEach((tenue) => tenuesItems.push(

            <View key={"panel"+tenue.id} style={styleAccord.accordContainer}>
                <Pressable onPress={() => openAddEditTenue(tenue)}>
                <View style={styleAccord.accordHeaderTitre}>
                    <Text style={styleAccord.groupeLabel}>{tenue.libelle}</Text>
                    <Ionicons size={18} name="pencil-outline" style={styleAccord.icon} />
                </View>
                </Pressable>
                <ScrollView contentInsetAdjustmentBehavior="automatic" horizontal={true} >
                {showPanelVetementsTenue(tenue.vetements ?? [])}
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
                <ThemedText type="subtitle" style={{ color: Colors.app.color }}>{tenuesInDressing?.length} tenue{tenuesInDressing?.length > 1 ? "s" : ""}</ThemedText>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <Pressable onPress={() => openAddEditTenue()}>
                        <Ionicons size={28} name="add-outline" style={styles.titleIcon} />
                    </Pressable>
                </View>
            </View>
            {tenuesInDressing.length === 0 &&
                <TenueEmptyComponent dressing={dressing} openAddTenue={openAddEditTenue} />
            }
            {tenuesInDressing.length > 0 && <>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {showPanelTenues(tenuesInDressing)}
                </ScrollView></>
            }
        </>
    );
}