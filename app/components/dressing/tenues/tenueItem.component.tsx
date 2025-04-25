import { ThemedText } from "@/app/components/commons/views/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, View } from "react-native";
import { stylesForm } from "../vetements/vetementForm.styles";
import { stylesItem } from "../../reglages/parametrageItem.component";
import TenueModel from "@/app/models/tenues/tenue.model";
import TenueVetementModel from "@/app/models/tenues/tenue.vetements.model";
import { VetemenItemComponent } from "../vetements/vetementItem.component";
import VetementModel from "@/app/models/vetements/vetements.model";
import { alphanumSort } from "../../commons/CommonsUtils";

/**
 * @description Composant d'un item de la liste des capsules
 * @param {ParametragesItemComponentProps} props - Propriétés du composant
 * @returns {JSX.Element} - Composant d'un item de la liste des capsules
 * @component
 */
export type TenueItemComponentProps = {
    readonly tenue: TenueModel
    openAddEditTenue: (tenue?: TenueModel) => void
};


/**
 * Composant React fonctionnel représentant un élément de capsule.
 *
 * @param {CapsuleItemComponentProps} props - Les propriétés du composant.
 * @param {Capsule} props.capsule - L'objet capsule contenant les informations à afficher.
 * @param {(capsule: Capsule) => void} props.openAddEditCapsule - Fonction appelée lors de l'édition de la capsule.
 *
 * @returns {JSX.Element} Un composant JSX affichant les détails d'une capsule avec une option d'édition.
 */
export const TenueItemComponent: React.FC<TenueItemComponentProps> = ({ tenue, openAddEditTenue }: TenueItemComponentProps) => {


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
        <View style={[stylesItem.container]}>
            <View style={stylesItem.title}>
                <ThemedText type="subtitle">{tenue.libelle}</ThemedText>
                { /** Icônes édition */}
                <View style={stylesForm.rowItems}>
                    <Pressable onPress={() => openAddEditTenue(tenue)}>
                        <Ionicons size={18} name="pencil-outline" style={stylesItem.titleIcon} />
                    </Pressable>
                </View>
            </View>
            { /** Formulaire  */}
            <ScrollView contentInsetAdjustmentBehavior="automatic" horizontal={true} >
                {showPanelVetementsTenue(tenue.vetements ?? [])}
            </ScrollView>
        </View>
    );
};