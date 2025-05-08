import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";
import { Pressable, ScrollView, View } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { Colors } from "../../../app/constants/Colors";
import { groupeVetementByType } from "@/app/controllers/dressing/dressingList.controller";
import { JSX, useState } from "react";
import { alphanumSort, getTypeVetementIcon, vetementSort } from "../commons/CommonsUtils";
import { styles } from "./dressingList.style";
import { DressingFiltreComponent } from "./dressingFiltres.component";
import AccordionItem from "../commons/accordion/AccordionItem.component";
import { DressingEmptyComponent } from "./dressingEmpty.component";
import { VetemenItemComponent } from "./vetements/vetementItem.component";



export type DressingComponentProps = {
    vetements: VetementModel[];
    addEditVetement: (vetement?: VetementModel) => void;
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
export const DressingListComponent: React.FC<DressingComponentProps> = ({ vetements, addEditVetement }: DressingComponentProps) => {

    const [vetementsAffiches, setVetementsAffiches] = useState<VetementModel[]>([]);

    const [toggleAllItems, setToggleAllItems] = useState(false);


    /**
     * Affiche une liste d'éléments React représentant des groupes de vêtements sous forme d'accordéons.
     *
     * @param vetementsByGroup - Une map où chaque clé est un identifiant de groupe et la valeur est un tableau de modèles de vêtements associés à ce groupe.
     * 
     * @returns Un tableau d'éléments React JSX représentant les groupes de vêtements triés par nom de groupe.
     * 
     * @remarks
     * - Les groupes sont triés alphabétiquement par le libellé du type de vêtement.
     * - Chaque groupe est affiché sous forme d'un élément d'accordéon avec un titre indiquant le libellé du type de vêtement et le nombre d'éléments dans le groupe.
     * - Une icône spécifique est associée à chaque groupe via la fonction `getTypeVetementIcon`.
     * - Les vêtements d'un groupe sont affichés en utilisant la fonction `showPanelVetements`.
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
     * Affiche une liste d'éléments de vêtements sous forme de composants React.
     *
     * @param vetements - Tableau des modèles de vêtements à afficher.
     * @returns Un tableau d'éléments JSX représentant chaque vêtement trié et rendu.
     */
    function showPanelVetements(vetements: VetementModel[]): React.JSX.Element[] {

        let vetementsItems: JSX.Element[] = [];
        vetements.sort(vetementSort);
        vetements.forEach((item) => {
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} editVetement={addEditVetement} />);
        });

        return vetementsItems;
    }



    return (
        <>
            <View style={styles.title}>
                <ThemedText type="subtitle" style={{color: Colors.app.color}}>{vetementsAffiches?.length} vêtement{vetementsAffiches?.length > 1 ? "s" : ""}</ThemedText>
                <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
                <Pressable onPress={() => addEditVetement()}>
                    <Ionicons size={28} name="add-outline" style={styles.titleIcon} />
                </Pressable>
                <Pressable onPress={() => setToggleAllItems(!toggleAllItems)}>
                    <MaterialCommunityIcons size={28} name={toggleAllItems ? "chevron-double-up": "chevron-double-down"} style={styles.titleIcon} />
                </Pressable>
                </View>
            </View>
            { vetements.length === 0 && 
                 <DressingEmptyComponent openAddVetement={() => addEditVetement()} />
            }
            { vetements.length > 0 && <>
            <View>
                <DressingFiltreComponent vetementsInDressing={vetements} setVetementsAffiches={setVetementsAffiches} />
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                {showPanelGroupeVetements(groupeVetementByType(vetementsAffiches))}
            </ScrollView></>
            }
        </>
    );
}