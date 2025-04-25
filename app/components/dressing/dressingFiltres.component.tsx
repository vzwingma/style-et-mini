
import { Colors } from "@/app/constants/Colors";
import { calculFiltresPossibles, selectFilters as updateSelectedFilters } from "@/app/controllers/dressing/dressingFiltres.controller";
import { applyFiltresOnVetements } from "@/app/controllers/dressing/dressingList.controller";
import DressingListFiltreModel from "@/app/models/vetements/vetementFiltre.model";
import VetementModel from "@/app/models/vetements/vetements.model";
import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { CaracteristiqueVetementEnum, StatutVetementEnum } from "../../constants/AppEnum";
import { renderFilterItem, renderSelectedItem, searchQuery } from "../commons/CommonsUtils";
import { styles } from "./dressingList.style";


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
            typeLibelle: CaracteristiqueVetementEnum.STATUT + StatutVetementEnum.ACTIF
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
                style={[styles.dropdown, { marginBottom: 3 }]} containerStyle={styles.listStyle} itemTextStyle={styles.listItemStyle}
                iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                mode='modal'
                backgroundColor={Colors.app.modalBackground}
                data={filtresDisponibles}
                labelField="typeLibelle" valueField="id"
                placeholder={'Selectionnez un ou plusieurs filtres'}
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