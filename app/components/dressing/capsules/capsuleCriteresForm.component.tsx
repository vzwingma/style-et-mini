
import { View, Image } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import { useContext, useEffect, useState } from "react";
import { Colors } from "@/app/constants/Colors";
import CapsuleCritereModel from "@/app/models/capsule/capsuleCritere";
import { styles } from "../dressingList.style";
import { addCriteresInList, selectCriteres } from "@/app/controllers/capsule/capsuleCriteres.controller";
import { AppContext } from "@/app/services/AppContextProvider";
import ErrorsFormCapsuleModel from "@/app/models/capsule/form.errors.capsules.model";
import { stylesForm } from "../vetements/vetementForm.styles";
import { renderFilterItem, renderSelectedItem, searchQuery } from "../../commons/CommonsUtils";


export type CapsuleCriteresComponentProps = {
    selectedCriteres: CapsuleCritereModel[];
    setSelectedCriteres: Function;
    errorsForm: ErrorsFormCapsuleModel;

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
export const CapsuleCriteresComponent: React.FC<CapsuleCriteresComponentProps> = ({ selectedCriteres, setSelectedCriteres, errorsForm }: CapsuleCriteresComponentProps) => {


    const [criteresDisponibles, setCriteresDisponibles] = useState<CapsuleCritereModel[]>([]);

    const { typeVetements, taillesMesures, usages } = useContext(AppContext)!;


    useEffect(() => {
        // Recalcul des filtres disponibles
        setCriteresDisponibles(addCriteresInList({paramsTypeVetements: typeVetements, paramsTaillesMesures : taillesMesures, paramsUsagesVetements : usages}));
    }, []);

 
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
                    style={!errorsForm?.criteresInError ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                    iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.criteresInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                    selectedStyle={stylesForm.selectedStyle} inputSearchStyle={styles.inputSearchStyle}
                    mode='modal'
                    backgroundColor={Colors.app.modalBackground}
                    data={criteresDisponibles}
                    labelField="typeLibelle" valueField="id"
                    placeholder={!errorsForm?.criteresInError ? 'Selectionnez des critères' : errorsForm?.criteresMessage + ''}
                    search={true} searchPlaceholder={'Rechercher un critère'} searchQuery={searchQuery}
                    value={selectedCriteres?.map(filtre => filtre.id)}
                    onChange={idsSelectedfiltres => selectCriteres(idsSelectedfiltres, criteresDisponibles, setSelectedCriteres)}
                    renderLeftIcon={() => (<Image source={require('@/assets/icons/filter.png')} style={styles.icon} />)}
                    renderItem={renderFilterItem}
                    renderSelectedItem={renderSelectedItem}
                />
        </View>
    );
}