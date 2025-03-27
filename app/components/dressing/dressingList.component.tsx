import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "../commons/ThemedView";
import { ThemedText } from "../commons/ThemedText";
import { Pressable, View, Image } from "react-native";
import VetementModel from "@/app/models/vetements.model";
import { Colors } from "@/constants/Colors";
import { VetemenItemComponent } from "./vetementItem.component";
import { getFiltersAvailables as calculFiltresPossibles, groupeVetementByType, setVetementsFiltres as applyFiltresOnVetements, selectFilters as updateSelectedFilters } from "@/app/controllers/dressingList.controller";
import { MultiSelect } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import DressingListFiltreModel from "@/app/models/dressingListeFiltre.model";
import { alphanumSort, getTypeVetementIcon, vetementSort } from "../commons/CommonsUtils";
import { CaracteristiqueVetementEnum, StatutVetementEnum } from "@/constants/AppEnum";
import { styles } from "./dressingList.style";


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


    const [selectedFiltres, setSelectedFiltres] = useState<DressingListFiltreModel[]>([
        {id: StatutVetementEnum.ACTIF, libelle: StatutVetementEnum.ACTIF, type: CaracteristiqueVetementEnum.STATUT}]);
    const [filtresDisponibles, setFiltresDisponibles] = useState<DressingListFiltreModel[]>([]);

    const [vetementsAffiches, setVetementsAffiches] = useState<VetementModel[]>([]);

    useEffect(() => {
        // Recalcul des filtres disponibles
        setFiltresDisponibles(calculFiltresPossibles(vetementsInDressing));
    }, [vetementsInDressing]);

    useEffect(() => {
        // Mise à jour de l'affichage des vêtements en fonction des filtres sélectionnés
        setVetementsAffiches(applyFiltresOnVetements(vetementsInDressing, selectedFiltres));
    }, [selectedFiltres]);



    /**
     * Rendu de la barre de filtres.
     *
     * Cette fonction retourne une vue thématisée contenant un composant MultiSelect
     * permettant de sélectionner un ou plusieurs filtres parmi les filtres disponibles.
     *
     * @returns {JSX.Element} La vue thématisée avec le composant MultiSelect.
     */
    function renderFiltersBar() {
        return (
            
            <ThemedView style={styles.filtresBar}>
                <View style={styles.filtresBar}>
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
                        renderLeftIcon={() => (<Image source={require('@/assets/icons/filter.png')} style={styles.icon} />)}
                        renderItem={renderFilterItem}
                        renderSelectedItem={renderSelectedItem}
                    />
                </View>
            </ThemedView>
    )};

    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelGroupeVetements(vetementsByGroup: Map<string, VetementModel[]>): React.JSX.Element[] {
        let groupItems: JSX.Element[] = [];
        // Sort par nom du groupe
        vetementsByGroup = new Map([...vetementsByGroup.entries()].sort((a, b) => alphanumSort(a[0], b[0])));

        vetementsByGroup.forEach((vetements, groupe) => {
            groupItems.push(
                <ThemedView key={"key_groupeId_" + groupe} style={styles.groupeLabel}>
                    <ThemedText type="default">{vetements[0]?.type?.libelle} ({vetements.length})</ThemedText>
                    <Image source={getTypeVetementIcon(groupe)} style={styles.icon} />
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
        vetements.sort(vetementSort);
        vetements.forEach((item) => {
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} editVetement={openAddEditVetement} />);
        });

        return vetementsItems;
    }


    /**
     * Rendu d'un élément de filtre dans la liste de dressing.
     *
     * @param {DressingListFiltreModel} item - L'élément de filtre à afficher.
     * @returns {JSX.Element} - Un composant View contenant les informations de l'élément de filtre.
     */
    const renderFilterItem = (item: DressingListFiltreModel) => {
        return (
            <View style={styles.listItemStyle}>
                <ThemedText type="subtitle" style={{ fontWeight: '300', fontSize: 14 }}>  {item.type}</ThemedText>
                <ThemedText type="subtitle" style={{ fontWeight: "normal" }}>{item.libelle}</ThemedText>
            </View>
        );
    };

    /**
     * Rend un élément sélectionné de la liste de dressing.
     *
     * @param {DressingListFiltreModel} item - L'élément de la liste de dressing à afficher.
     * @param {(item: DressingListFiltreModel) => void} unSelect - Fonction de rappel pour désélectionner l'élément.
     * @returns {JSX.Element} - Composant Pressable affichant l'élément sélectionné avec une icône pour le désélectionner.
     */
    const renderSelectedItem = (item: DressingListFiltreModel, unSelect?: (item: DressingListFiltreModel) => void) => {
        return (
            <Pressable onPress={() => unSelect?.(item)}>
                <View style={styles.selectedStyle}>
                    <ThemedText type="italic" style={{fontSize:11, top:2}}> {item.type} : </ThemedText>
                    <ThemedText type="default" style={{top:1}}>{item.libelle} </ThemedText>
                    <Ionicons style={styles.icon} color={'white'} name="close-circle-outline" size={18} />
                </View>
            </Pressable>
        )};


    return (
        <>
            <ThemedView style={styles.title}>
                <ThemedText type="subtitle">{vetementsAffiches?.length} vêtement{vetementsAffiches?.length > 1 ? "s" : ""}</ThemedText>
                <Pressable onPress={() => openAddEditVetement()}>
                    <Ionicons size={28} name="add-outline" color={Colors.dark.text} />
                </Pressable>
            </ThemedView>
            {renderFiltersBar()}

            {showPanelGroupeVetements(groupeVetementByType(vetementsAffiches))}
        </>
    );
}