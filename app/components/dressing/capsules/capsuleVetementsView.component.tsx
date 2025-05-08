import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { applyCriteresOnVetements } from '@/app/controllers/capsule/capsuleTemporelle.controller';
import { loadVetementsDressing } from '@/app/controllers/dressing/dressing.controller';
import CapsuleTemporelleModel from '@/app/models/capsule/capsuleTemporelle.model';
import DressingModel from '@/app/models/dressing.model';
import TenueVetementModel from '@/app/models/tenues/tenue.vetements.model';
import VetementModel from '@/app/models/vetements/vetements.model';
import { Ionicons } from '@expo/vector-icons';
import React, { JSX, useEffect, useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { alphanumSort } from '../../commons/CommonsUtils';
import { ThemedText } from '../../commons/views/ThemedText';
import { stylesForm } from '../vetements/vetementForm.styles';
import { VetemenItemComponent } from '../vetements/vetementItem.component';



/**
 * Propriétés du composant CapsuleVetementsView.
 */
export type CapsuleVetementsViewComponentProps = {
    dressing: DressingModel;
    capsule: CapsuleTemporelleModel | null;
    closeFormCallBack(): void;
};


/**
 * Composant React représentant un formulaire pour ajouter ou éditer une capsule.
 * 
 * @component
 * @param {VetementFormComponentProps} props - Les propriétés du composant.
 * @param {DressingModel} props.dressing - Le dressing contenant les vêtements.
 * @param {VetementModel[]} props.vetementsAffiches - La liste des vêtements affichés dans le formulaire.
 * @param {capsuleModel | null} props.capsule - La capsule en cours d'édition, ou null pour une nouvelle capsule.
 * @param {() => void} props.closeFormCallBack - Fonction de rappel pour fermer le formulaire.
 * @param {(resultat: APIResultFormcapsuleModel) => void} props.validateFormCallBack - Fonction de rappel pour valider le formulaire.
 * @param {(resultDelete: APIResultFormcapsuleModel) => void} props.deleteFormCallBack - Fonction de rappel pour supprimer la capsule.
 * 
 * @returns {React.ReactElement} Un élément React représentant le formulaire de gestion des capsules.
 * 
 * @description
 * Ce composant permet de gérer l'ajout, l'édition, l'archivage et la suppression d'une capsule.
 * Il affiche une liste de vêtements groupés par type, permet de sélectionner des vêtements
 * pour composer une capsule, et propose des actions pour valider, archiver ou supprimer la capsule.

 */
export const CapsuleVetementsView: React.FC<CapsuleVetementsViewComponentProps> = ({ dressing, capsule, closeFormCallBack }: CapsuleVetementsViewComponentProps) => {

    const [vetementsCapsule, setVetementsCapsule] = useState<VetementModel[]>([]);
    // Rechargement des vêtements si le dressing change
    useEffect(() => {

        loadVetementsDressing({ idDressing: dressing.id, setVetements: setVetementsCapsule })
            .then((vetements) => {
                setVetementsCapsule(applyCriteresOnVetements(capsule?.criteres ?? [], vetements));
            })
    }, [capsule]);

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
        <>
            <View style={stylesForm.title}>
                <Pressable onPress={closeFormCallBack}>
                    <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
                </Pressable>
                <ThemedText type="subtitle">{capsule?.libelle ?? '*'}</ThemedText>
                <ThemedText type="subtitle" />
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.accordBody}>
                    {showPanelVetementsTenue(vetementsCapsule ?? [])}
                </View>
            </ScrollView>
        </>
    );

}
const styles = StyleSheet.create({
    accordBody: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
    }
});