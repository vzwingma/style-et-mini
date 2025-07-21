import { ThemedText } from "@/app/components/commons/views/ThemedText";
import { Colors } from "@/app/constants/Colors";
import { Pressable, StyleSheet, View } from "react-native";
import { stylesForm } from "../dressing/vetements/vetementForm.styles";
import DressingModel from "@/app/models/dressing.model";
import VetementModel from "@/app/models/vetements/vetements.model";
import { getCollections, getDressingValue, getNbVetementsAvecPrix, getNbVetementAvecCollections } from "@/app/controllers/synthese/syntheseDressing.controller";
import React, { useState } from "react";
import Modal from 'react-native-modal';
import { SyntheseDetailEnum, SyntheseItemDetailComponent } from "./syntheseItemDetail.component";
import { getHeaderTitle } from '@/app/components/commons/tab/TabHeader';
import { Tabs } from "@/app/constants/TabsEnums";
import { Ionicons } from "@expo/vector-icons";
import { stylesItem } from "../reglages/parametrageItem.component";
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



    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState<SyntheseDetailEnum>();

    /** Ouverture/Fermeture du menu */
    function toggleOpen(details: SyntheseDetailEnum): void {
        if (vetements === null || vetements === undefined || vetements.length === 0) return;
        setDetails(details);
        setOpen(!open);
    };

    const nbVetements = vetements.length;
    const nbVetementsAvecPrixAchat = getNbVetementsAvecPrix(vetements, 'achat');
    const nbVetementsSansPrixAchat = nbVetements - (nbVetementsAvecPrixAchat??0);
    const nbVetementsAvecPrixNeuf = getNbVetementsAvecPrix(vetements, 'neuf');
    const nbVetementsSansPrixNeuf = nbVetements - (nbVetementsAvecPrixNeuf??0);
    return (
        <>
            <View style={[styles.container]}>
                <View style={styles.title}>
                    <ThemedText type="subtitle">{ getHeaderTitle(Tabs.VETEMENTS, dressing.libelle) }</ThemedText>
                    <ThemedText />
                </View>
                { /** VETEMENTS  */}
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de vêtements</ThemedText>
                    <ThemedText type="subtitle" style={styles.value}>{vetements.length}</ThemedText>
                </View>
                <View style={stylesForm.rowItems}>
                    <ThemedText type="default" style={styles.label2}>- Valeur à l'achat</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.NO_PRIX_ACHAT)} style={[stylesForm.rowItems, { width: '60%' }]}>
                        <ThemedText type="default" style={[styles.value2, { width: '60%' }]}>{nbVetementsAvecPrixAchat} vêtements (-{nbVetementsSansPrixAchat})</ThemedText>
                        <ThemedText type="italic" style={[styles.value2, { width: '40%' }]}>{getDressingValue(vetements, 'achat')?.toLocaleString('fr-FR') ?? "-"} €</ThemedText>
                    </Pressable>
                </View>
                <View style={stylesForm.rowItems}>
                    <ThemedText type="default" style={styles.label2}>- Valeur neuf</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.NO_PRIX_NEUF)} style={[stylesForm.rowItems, { width: '60%' }]}>
                        <ThemedText type="default" style={[styles.value2, { width: '60%' }]}>{nbVetementsAvecPrixNeuf} vêtements (-{nbVetementsSansPrixNeuf})</ThemedText>
                        <ThemedText type="italic" style={[styles.value2, { width: '40%' }]}>{getDressingValue(vetements, 'neuf')?.toLocaleString('fr-FR') ?? "-"} €</ThemedText>
                    </Pressable>
                </View>
                <View style={styles.interligne} />
                { /** COLLECTIONS  */}
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de collections</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.COLLECTIONS_LISTE)} style={styles.value}>
                        <ThemedText type="subtitle" style={{ textAlign: 'right' }}>{getCollections(vetements).length}</ThemedText>
                    </Pressable>
                </View>
                <View style={stylesForm.rowItems}>
                    <ThemedText type="default" style={styles.label2}>- Collections</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.NO_COLLECTIONS)} style={[stylesForm.rowItems, { width: '60%' }]}>
                        <ThemedText type="default" style={[styles.value2, { width: '60%' }]}>{getNbVetementAvecCollections(vetements)} vêtements</ThemedText>
                        <ThemedText type="italic" style={[styles.value2, { width: '40%' }]}></ThemedText>
                    </Pressable>
                </View>
                <View style={styles.interligne} />
                { /** TENUES  */}
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de tenues</ThemedText>
                    <ThemedText type="subtitle" style={styles.value}>{tenues}</ThemedText>
                </View>
                <View style={styles.interligne} />
                { /** CAPSULES  */}
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de capsules</ThemedText>
                    <ThemedText type="subtitle" style={styles.value}>{capsules}</ThemedText>
                </View>
                { /** Derniers ajouts  */}
                <View style={styles.interligne} />
         
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Derniers ajouts</ThemedText>
                    <ThemedText type="subtitle" style={styles.value}>
                        <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.DERNIERS_AJOUTS)}>
                            <Ionicons size={18} name="eye-outline" style={stylesItem.titleIcon} />
                        </Pressable>
                    </ThemedText>
                </View>
            </View>
            <Modal presentationStyle='overFullScreen' isVisible={open}
                animationIn='slideInRight' animationOut='slideOutRight'
                propagateSwipe={true}
                onBackButtonPress={() => setOpen(false)}
                onBackdropPress={() => setOpen(false)}
                style={{ margin: 2, justifyContent: 'flex-end', backgroundColor: Colors.app.background }}>
                {
                    (details !== null && details !== undefined && vetements !== null && vetements !== undefined)
                    && <SyntheseItemDetailComponent vetements={vetements} details={details}
                        closeDrawer={() => setOpen(false)} />
                }

            </Modal> 
            </>
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
    interligne: {
        width: '100%',
        marginTop: 15,
        borderColor: Colors.app.backgroundLight,
        borderWidth: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.app.color,
    },
    label: {
        width: '50%',
        marginTop: 15,
        marginBottom: 5
    },
    label2: {
        width: '40%',
        marginTop: 5,
        paddingLeft: 10,
    },
    value: {
        width: '50%',
        marginTop: 15,
        marginBottom: 5,
        textAlign: 'right',
    },
    value2: {
        marginTop: 5,
        textAlign: 'right',
        fontStyle: 'italic',
        color: Colors.app.color,
    },
}
);