import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../commons/views/ThemedText";

import { Pressable, View, Image } from "react-native";
import VetementModel from "@/app/models/vetements/vetements.model";
import { applyFiltresOnVetements } from "@/app/controllers/dressingList.controller";
import { MultiSelect } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import DressingListFiltreModel from "@/app/models/vetements/vetementFiltre.model";
import { CaracteristiqueVetementEnum, StatutVetementEnum } from "../../constants/AppEnum";
import { styles } from "./dressingList.style";
import { calculFiltresPossibles, selectFilters as updateSelectedFilters } from "@/app/controllers/dressingFiltres.controller";
import { Colors } from "@/app/constants/Colors";


export type DressingFiltresComponentProps = {
    vetementsInDressing: VetementModel[];
    setVetementsAffiches: (vetements: VetementModel[]) => void;
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
export const DressingFiltreComponent: React.FC<DressingFiltresComponentProps> = ({ vetementsInDressing, setVetementsAffiches }: DressingFiltresComponentProps) => {

    const [selectedFiltres, setSelectedFiltres] = useState<DressingListFiltreModel[]>([
        {
            id: StatutVetementEnum.ACTIF, 
            libelle: StatutVetementEnum.ACTIF, 
            type: CaracteristiqueVetementEnum.STATUT, 
            typeLibelle: CaracteristiqueVetementEnum.STATUT+StatutVetementEnum.ACTIF
        },]);
    const [filtresDisponibles, setFiltresDisponibles] = useState<DressingListFiltreModel[]>([]);


    useEffect(() => {
        // Recalcul des filtres disponibles
        setFiltresDisponibles(calculFiltresPossibles(vetementsInDressing));
    }, [vetementsInDressing]);

    
    useEffect(() => {
        // Mise à jour de l'affichage des vêtements en fonction des filtres sélectionnés
        setVetementsAffiches(applyFiltresOnVetements(vetementsInDressing, selectedFiltres));
    }, [selectedFiltres, setVetementsAffiches, filtresDisponibles]);
    
    /**
     * Rendu d'un élément de filtre dans la liste de dressing.
     *
     * @param {DressingListFiltreModel} filtre - L'élément de filtre à afficher.
     * @returns {JSX.Element} - Un composant View contenant les informations de l'élément de filtre.
     */
    const renderFilterItem = (filtre: DressingListFiltreModel) => {
        return (
            <View style={[styles.listItemStyle, filtre.isType ? styles.listTypeStyle : '']}>
                {filtre.isType 
                    && <ThemedText type="subtitle" style={{ fontWeight: 'bold', fontSize: 14, fontStyle: 'italic', color:Colors.app.color}}> {filtre.type}</ThemedText>}
                {!filtre.isType 
                    && <><ThemedText>{}</ThemedText><ThemedText type="subtitle" style={{ fontWeight: "normal" }}>{filtre.libelle}</ThemedText></>}
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


    /**
     * Recherche d'un filtre dans la liste de filtres.
     */
    const searchQuery = (keyword: string, labelValue: string) : boolean => {
        return !!new RegExp(keyword, 'i').exec(labelValue);
    }

    /**
     * Rendu de la barre de filtres.
     *
     * Cette fonction retourne une vue thématisée contenant un composant MultiSelect
     * permettant de sélectionner un ou plusieurs filtres parmi les filtres disponibles.
     *
     * @returns {JSX.Element} La vue thématisée avec le composant MultiSelect.
     */
    return (
        <View style={styles.filtresBar}>
                <MultiSelect
                    style={[styles.dropdown, {marginBottom: 3} ]} containerStyle={styles.listStyle} itemTextStyle={styles.listItemStyle}
                    iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    mode='modal'
                    data={filtresDisponibles}
                    labelField="typeLibelle" valueField="id"
                    placeholder={'Selectionnez un ou plusieurs filtre'}
                    search={true} searchPlaceholder={'Rechercher un filtre'} searchQuery={searchQuery}
                    value={selectedFiltres.map(filtre => filtre.id)}
                    onChange={idsSelectedfiltres => updateSelectedFilters(idsSelectedfiltres, filtresDisponibles, setSelectedFiltres)}
                    renderLeftIcon={() => (<Image source={require('@/assets/icons/filter.png')} style={styles.icon} />)}
                    renderItem={renderFilterItem}
                    renderSelectedItem={renderSelectedItem}
                />
        </View>
    );
}