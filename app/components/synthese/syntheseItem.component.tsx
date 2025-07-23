import { ThemedText } from "@/app/components/commons/views/ThemedText";
import { Colors } from "@/app/constants/Colors";
import { Pressable, StyleSheet, View } from "react-native";
import { stylesForm } from "../dressing/vetements/vetementForm.styles";
import DressingModel from "@/app/models/dressing.model";
import VetementModel from "@/app/models/vetements/vetements.model";
import { getCollections, getDressingValue, getNbVetementsAvecPrix, getNbVetementAvecCollections } from "@/app/controllers/synthese/syntheseDressing.controller";
import React, { useContext, useState } from "react";
import Modal from 'react-native-modal';
import { SyntheseDetailEnum, SyntheseItemDetailComponent } from "./syntheseItemDetail.component";
import { getHeaderTitle } from '@/app/components/commons/tab/TabHeader';
import { Tabs } from "@/app/constants/TabsEnums";
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from "@/app/services/AppContextProvider";
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
    const {  activeTab, setActiveTab } = useContext(AppContext)!;
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
                <View style={styles.rowItems}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de vêtements</ThemedText>
                    <ThemedText type="subtitle" style={styles.value}>{vetements.length}</ThemedText>
                </View>
                <View style={styles.rowItems}>
                    <ThemedText type="default" style={styles.label2}>Valeur à l'achat</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.NO_PRIX_ACHAT)} style={[stylesForm.rowItems, { width: '60%' }]}>
                        <ThemedText type="default" style={[styles.value2, { width: '60%' }]}>sur {nbVetementsAvecPrixAchat} vêtements ({nbVetementsSansPrixAchat} sans prix)</ThemedText>
                        <ThemedText type="italic" style={[styles.value2, { width: '40%' }]}>{getDressingValue(vetements, 'achat')?.toLocaleString('fr-FR') ?? "-"} €</ThemedText>
                    </Pressable>
                </View>
                <View style={styles.rowItems}>
                    <ThemedText type="default" style={styles.label2}>Valeur neuf</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.NO_PRIX_NEUF)} style={[stylesForm.rowItems, { width: '60%' }]}>
                        <ThemedText type="default" style={[styles.value2, { width: '60%' }]}>sur {nbVetementsAvecPrixNeuf} vêtements ({nbVetementsSansPrixNeuf} sans prix)</ThemedText>
                        <ThemedText type="italic" style={[styles.value2, { width: '40%' }]}>{getDressingValue(vetements, 'neuf')?.toLocaleString('fr-FR') ?? "-"} €</ThemedText>
                    </Pressable>
                </View>
                <View style={styles.interligne} />
                { /** COLLECTIONS  */}
                <View style={styles.rowItems}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de collections</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.COLLECTIONS_LISTE)} style={styles.value}>
                        <ThemedText type="subtitle" style={{ textAlign: 'right' }}>{getCollections(vetements).length}</ThemedText>
                    </Pressable>
                </View>
                <View style={styles.rowItems}>
                    <ThemedText type="default" style={styles.label2}>Collections</ThemedText>
                    <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.NO_COLLECTIONS)} style={[stylesForm.rowItems, { width: '60%' }]}>
                        <ThemedText type="default" style={[styles.value2, { width: '60%' }]}>sur {getNbVetementAvecCollections(vetements)} vêtements</ThemedText>
                        <ThemedText type="italic" style={[styles.value2, { width: '40%' }]}></ThemedText>
                    </Pressable>
                </View>
                <View style={styles.interligne} />
                { /** TENUES  */}
                <View style={styles.rowItems}>
                    <Pressable onPress={() => setActiveTab(Tabs.TENUES)} style={[stylesForm.rowItems, { width: '100%' }]}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de tenues</ThemedText>
                        <ThemedText type="subtitle" style={styles.value}>{tenues}</ThemedText>
                    </Pressable>
                </View>
                <View style={styles.interligne} />
                { /** CAPSULES  */}
                <View style={styles.rowItems}>
                    <Pressable onPress={() => setActiveTab(Tabs.CAPSULES)} style={[stylesForm.rowItems, { width: '100%' }]}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Nombre de capsules</ThemedText>
                        <ThemedText type="subtitle" style={styles.value}>{capsules}</ThemedText>
                    </Pressable>
                </View>
            </View>         
            { /** Derniers ajouts  */}
            <View style={[styles.container]}>
                <View style={[styles.rowItems, { width: '100%' }]}>
                    <ThemedText type="defaultSemiBold" style={styles.label}>Derniers ajouts</ThemedText>
                    <ThemedText type="subtitle" style={styles.value}>
                        <Pressable onPress={() => toggleOpen(SyntheseDetailEnum.DERNIERS_AJOUTS)}>
                            <Ionicons size={18} name="eye-outline" style={styles.eyeIcon} />
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
        width: '100%',
        marginBottom: 10
    },
    rowItems: { 
        flexDirection: 'row',
        paddingVertical: 2,
    },
    interligne: {
        width: '100%',
        marginTop: 15,
        marginBottom: 10,
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
    },
    label: {
        width: '50%',
        height: 22,
        top: 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    label2: {
        width: '40%',
        marginTop: 3,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',

    },
    value: {
        width: '50%',
        textAlign: 'right',

    },
    value2: {
        textAlign: 'right',
        fontStyle: 'italic',
        color: Colors.app.color,

    },
    eyeIcon: {
        color: Colors.dark.text,
        borderColor: 'white',
        borderWidth: 0,
        borderRadius: 2,
        height: 20,
        width: 20,
    },    
}
);