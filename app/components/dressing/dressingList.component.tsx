import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../commons/ThemedView";
import { ThemedText } from "../commons/ThemedText";
import { StyleSheet, Pressable, Text, View } from "react-native";
import VetementModel from "@/app/models/vetements.model";
import { Colors, Fonts } from "@/constants/Colors";
import { VetemenItemComponent } from "./vetementItem.component";
import { getFiltersAvailables, groupeVetementByType, setVetementsFiltres, selectFilters as updateSelectedFilters } from "@/app/controllers/dressingList.controller";
import { MultiSelect } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import DressingListFiltreModel from "@/app/models/dressingListeFiltre.model";

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


    const [selectedFiltres, setSelectedFiltres] = useState<DressingListFiltreModel[]>([]);
    const [filtresDisponibles, setFiltresDisponibles] = useState<DressingListFiltreModel[]>([]);

    const [vetementsAffiches, setVetementsAffiches] = useState<VetementModel[]>([]);

    useEffect(() => {
        // Recalcul des filtres disponibles
        setFiltresDisponibles(getFiltersAvailables(vetementsInDressing));
    }, [vetementsInDressing]);

    useEffect(() => {
        // Mise à jour de l'affichage des vêtements en fonction des filtres sélectionnés
        setVetementsAffiches(setVetementsFiltres(vetementsInDressing, selectedFiltres));
    }, [selectedFiltres]);

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
                <ThemedView key={"key_groupeId_" + groupe} style={styles.groupeLabel}>
                    <ThemedText type="default">{groupe} ({vetements.length})</ThemedText>
                </ThemedView>
            );
            groupItems.push(
                <ThemedView key={"key_groupeList_" + groupe} style={styles.groupeContainer}>
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


    const renderFilterItem = (item: DressingListFiltreModel) => {
        return (
            <View style={styles.listItemStyle}>
                <ThemedText type="defaultSemiBold" style={{ fontWeight: 'bold'}}>{item.type}</ThemedText><ThemedText type="default">{item.libelle}</ThemedText>
            </View>
        );
    };

    return (
        <>
            <ThemedView style={styles.title}>
                <ThemedText type="subtitle">{vetementsAffiches?.length} vêtement{vetementsAffiches?.length > 1 ? "s" : ""}</ThemedText>
                <Pressable onPress={() => openAddEditVetement()}>
                    <Ionicons size={28} name="add-outline" color={Colors.dark.text} />
                </Pressable>
            </ThemedView>

            <ThemedView style={styles.filtre}>
                <ThemedText type="subtitle">
                    <MultiSelect
                        style={styles.dropdown} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                        iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        maxHeight={500}
                        mode='modal'
                        data={filtresDisponibles}
                        labelField="libelle" valueField="id"
                        placeholder={'Selectionnez un ou plusieurs filtre'}
                        value={selectedFiltres.map(filtre => filtre.id)}
                        onChange={idsSelectedfiltres => updateSelectedFilters(idsSelectedfiltres, filtresDisponibles, setSelectedFiltres)}
                        renderLeftIcon={() => (
                            <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                        )}
                        renderItem={renderFilterItem}
                        renderSelectedItem={(item, unSelect) => (
                            <Pressable
                                style={styles.selectedStyle}
                                onPress={() => unSelect && unSelect(item)}>
                                <View style={{flexDirection: 'row'}}>
                                    <ThemedText type="italic"> {item.type} : </ThemedText>
                                    <ThemedText type="default">{item.libelle} </ThemedText>
                                    <Ionicons style={styles.icon} color={'white'} name="close-circle-outline" size={18} />
                                </View>
                            </Pressable>
                        )}
                    /></ThemedText>
            </ThemedView>

            {showPanelGroupeVetements(groupeVetementByType(vetementsAffiches))}
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
        marginTop: 5,
        padding: 0
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
    // Filtre
    // Dropdown de sélection
    dropdown: {
        top: 4,
        padding: 8,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        alignItems: 'flex-start',
        cursor: 'pointer',
        bottom: 4,
    },
    icon: {
        marginRight: 5,
    },
    // Style de la liste déroulante d'un dropdown
    listStyle: {
        backgroundColor: Colors.app.backgroundLight,
    },
    // Style des éléments de la liste déroulante d'un dropdown
    listItemStyle: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        margin: 0,
        padding: 3,
        height: 'auto',
    },
    placeholderStyle: {
        fontWeight: 'light',
        color: 'gray',
    },
    // Items sélectionnés dans un dropdown multi-sélection
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: Colors.app.color,
        borderWidth: 2,
        borderRadius: 8,
        margin: 1,
        padding: 1,
        cursor: 'pointer',
        paddingBottom: 3,
        paddingTop: 3,
    },
    selectedTextStyle: {
        fontSize: Fonts.app.size,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: Fonts.app.size,
        backgroundColor: 'red',
    },
});