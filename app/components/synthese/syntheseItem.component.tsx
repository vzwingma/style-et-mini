import { ThemedText } from "@/app/components/commons/views/ThemedText";
import { Colors } from "@/app/constants/Colors";
import { StyleSheet, View } from "react-native";
import { stylesForm } from "../dressing/vetements/vetementForm.styles";
import DressingModel from "@/app/models/dressing.model";
import VetementModel from "@/app/models/vetements/vetements.model";
import {getDressingValue, getNbVetementsAvecPrix } from "@/app/controllers/synthese/syntheseDressing.controller";

/**
 * @description Composant d'un item de la liste des capsules
 * @param {ParametragesItemComponentProps} props - Propriétés du composant
 * @returns {JSX.Element} - Composant d'un item de la liste des capsules
 * @component
 */
export type SyntheseItemComponentProps = {
    readonly dressing: DressingModel
    readonly vetements: VetementModel[]
    readonly tenues: number
    readonly capsules: number
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
export const SyntheseItemComponent: React.FC<SyntheseItemComponentProps> = ({ dressing, vetements, tenues, capsules }: SyntheseItemComponentProps) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.title}>
                <ThemedText type="subtitle">{dressing.libelle}</ThemedText>
                <ThemedText/>
            </View>
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de vêtements</ThemedText>
                <ThemedText type="subtitle" style={styles.value}>{vetements.length}</ThemedText>
            </View>
            <View style={stylesForm.rowItems}>
                <ThemedText type="default" style={styles.label2}>Valeur à l'achat</ThemedText>
                <ThemedText type="default" style={styles.value2}>({getNbVetementsAvecPrix(vetements, 'achat')} vêtements)</ThemedText>
                <ThemedText type="italic" style={styles.value2}>{getDressingValue(vetements, 'achat')?.toLocaleString('fr-FR')} €</ThemedText>
            </View>
            <View style={stylesForm.rowItems}>
                <ThemedText type="default" style={styles.label2}>Valeur neuf</ThemedText>
                <ThemedText type="default" style={styles.value2}>({getNbVetementsAvecPrix(vetements, 'neuf')} vêtements)</ThemedText>
                <ThemedText type="italic" style={styles.value2}>{getDressingValue(vetements, 'neuf')?.toLocaleString('fr-FR')} €</ThemedText>
            </View>                        
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de tenues</ThemedText>
                <ThemedText type="subtitle" style={styles.value}>{tenues}</ThemedText>
            </View>
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de capsules</ThemedText>
                <ThemedText type="subtitle" style={styles.value}>{capsules}</ThemedText>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.app.background,
        borderColor: Colors.app.backgroundLight,
        borderWidth: 2,
    },
    title: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.app.color,
    },
    label: {
        width: '50%',
        marginTop: 15,
        marginBottom: 5
    },
    label2: {
        width: '35%',
        marginTop: 5,
        marginLeft: 15,
    },
    value: {
        width: '50%',
        marginTop: 15,
        marginBottom: 5,
        textAlign: 'right',
    },
    value2: {
        width: '30%',
        marginTop: 5,
        textAlign: 'right',
    }, 
}
);