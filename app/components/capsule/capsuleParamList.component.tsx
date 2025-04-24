import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, View } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { Colors } from "../../constants/Colors";
import { useState } from "react";
import { getTypeVetementIcon, vetementSort } from "../commons/CommonsUtils";

import AccordionItem from "../commons/accordion/AccordionItem.component";
import { styles } from "../dressing/dressingList.style";
import ParamGenericVetementsModel from "@/app/models/params/paramGenericVetements.model";



export type InventaireListProps = {
    parametres?: ParamGenericVetementsModel[];
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
export const InventaireListComponent: React.FC<InventaireListProps> = ({ parametres }: InventaireListProps) => {

    const [vetementsAffiches, setVetementsAffiches] = useState<VetementModel[]>([]);

    const [toggleAllItems, setToggleAllItems] = useState(false);


    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelGroupeParametres(parametres: ParamGenericVetementsModel[]): React.JSX.Element[] {
        let groupItems: JSX.Element[] = [];
        // Sort par nom du groupe
        /*
        vetementsByGroup = new Map([...vetementsByGroup.entries()].sort((a, b) => {
            return alphanumSort(a[1][0]?.type.libelle, b[1][0]?.type.libelle);
        }));
*/
        parametres.forEach((parametre) => {
            groupItems.push(
                <AccordionItem
                    title={parametre.libelle}
                    icon={getTypeVetementIcon(parametre.id)}
                    toggleAllItems={toggleAllItems}
                    key={"key_groupeId_" + parametre.id}>
                    {/* showPanelParametre(vetements) */}
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

            // vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} editVetement={openAddEditVetement} />);
        });

        return vetementsItems;
    }



    return (
        <>
            <View style={styles.title}>
                <ThemedText type="subtitle" style={{color: Colors.app.color}}>{vetementsAffiches?.length} vêtement{vetementsAffiches?.length > 1 ? "s" : ""}</ThemedText>
                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <Pressable onPress={() => {}}>
                    <Ionicons size={28} name="add-outline" style={styles.titleIcon} />
                </Pressable>
                <Pressable onPress={() => setToggleAllItems(!toggleAllItems)}>
                    <MaterialCommunityIcons size={28} name={toggleAllItems ? "chevron-double-up": "chevron-double-down"} style={styles.titleIcon} />
                </Pressable>
                </View>
            </View>
            { <>
            <View>
{ /*                 <DressingFiltreComponent vetementsInDressing={vetementsInDressing} setVetementsAffiches={setVetementsAffiches} />
*/}
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                {parametres !== undefined && showPanelGroupeParametres(parametres)}
            </ScrollView></>
            }
        </>
    );
}