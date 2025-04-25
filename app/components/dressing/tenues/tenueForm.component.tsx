import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { StatutVetementEnum } from '@/app/constants/AppEnum';
import DressingModel from '@/app/models/dressing.model';
import { AppContext } from '@/app/services/AppContextProvider';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Colors, Fonts } from '../../../constants/Colors';
import { alphanumSort, getTypeVetementIcon, renderLabelMandatory, resizeImage, vetementSort } from '../../commons/CommonsUtils';
import { ModalDialogComponent } from '../../commons/views/ModalDialog';
import { ThemedText } from '../../commons/views/ThemedText';
import { styles } from '../../vetements/vetementForm.styles';
import FormTenueModel from '@/app/models/tenues/form.tenue.model';
import { addRemoveVetementForm, archiveForm, deleteForm, initForm, setLibelleForm, validateForm } from '@/app/controllers/tenues/tenuesForm.controller';
import ErrorsFormTenueModel, { defaultErrorsFormTenueModel } from '@/app/models/tenues/form.errors.tenues.model';
import TenueModel from '@/app/models/tenues/tenue.model';
import APIResultFormTenueModel from '@/app/models/tenues/form.result.tenue.model';
import { groupeVetementByType } from '@/app/controllers/dressing/dressingList.controller';
import VetementModel from '@/app/models/vetements/vetements.model';
import { VetemenItemComponent } from '../../vetements/vetementItem.component';
import AccordionSecondaryItem from '../../commons/accordion/AccordionSecondaryItem.component';
import { renderArchiveIcon } from '../../vetements/vetementForm.component';



/**
 * Propriétés du composant VetementFormComponent.
 */
export type TenueFormComponentProps = {
    dressing: DressingModel;
    tenue: TenueModel | null;
    vetementsAffiches: VetementModel[];
    closeFormCallBack(): void;
    validateFormCallBack(resultat: APIResultFormTenueModel): void;
    deleteFormCallBack(resultat: APIResultFormTenueModel): void;
};


/**
 * Composant React représentant un formulaire pour ajouter ou éditer une tenue.
 * 
 * @component
 * @param {TenueFormComponentProps} props - Les propriétés du composant.
 * @param {DressingModel} props.dressing - Le dressing contenant les vêtements.
 * @param {VetementModel[]} props.vetementsAffiches - La liste des vêtements affichés dans le formulaire.
 * @param {TenueModel | null} props.tenue - La tenue en cours d'édition, ou null pour une nouvelle tenue.
 * @param {() => void} props.closeFormCallBack - Fonction de rappel pour fermer le formulaire.
 * @param {(resultat: APIResultFormTenueModel) => void} props.validateFormCallBack - Fonction de rappel pour valider le formulaire.
 * @param {(resultDelete: APIResultFormTenueModel) => void} props.deleteFormCallBack - Fonction de rappel pour supprimer la tenue.
 * 
 * @returns {React.ReactElement} Un élément React représentant le formulaire de gestion des tenues.
 * 
 * @description
 * Ce composant permet de gérer l'ajout, l'édition, l'archivage et la suppression d'une tenue.
 * Il affiche une liste de vêtements groupés par type, permet de sélectionner des vêtements
 * pour composer une tenue, et propose des actions pour valider, archiver ou supprimer la tenue.

 */
export const TenueFormComponent: React.FC<TenueFormComponentProps> = ({ dressing, vetementsAffiches, tenue: tenueInEdition, closeFormCallBack, validateFormCallBack, deleteFormCallBack }: TenueFormComponentProps) => {

    const [form, setForm] = useState<FormTenueModel>({} as FormTenueModel);
    const [errorsForm, setErrorsForm] = useState<ErrorsFormTenueModel>(defaultErrorsFormTenueModel);

    const { modalDialog, setModalDialog } = useContext(AppContext)!;

    useEffect(() => {
        initForm(dressing, tenueInEdition, setForm);
        setModalDialog(null);
    }, [dressing, tenueInEdition]);


    /**
     * Affiche un panneau contenant une liste de vêtements.
     *
     * @param {VetementModel[] | undefined} vetements - La liste des vêtements à afficher. Peut être indéfinie.
     * @returns {React.JSX.Element} Un élément JSX contenant les vêtements sous forme de texte thématisé.
     */
    function showPanelGroupeVetements(vetementsByGroup: Map<string, VetementModel[]>): React.JSX.Element[] {
        let groupItems: JSX.Element[] = [];
        // Sort par nom du groupe
        vetementsByGroup = new Map([...vetementsByGroup.entries()].sort((a, b) => {
            return alphanumSort(a[1][0]?.type.libelle, b[1][0]?.type.libelle);
        }));

        vetementsByGroup.forEach((vetements, groupe) => {

            const selectedCount = vetements.filter(v => form.vetements?.some(selectedVetement => selectedVetement.id === v.id)).length;
            let libelle = vetements[0]?.type?.libelle;
            if(selectedCount > 0){
                const plural = selectedCount > 1 ? "s" : "";
                libelle += " (" + selectedCount + " sélectionné" + plural + ")";
            }
            groupItems.push(
                <AccordionSecondaryItem
                    title={libelle}
                    icon={getTypeVetementIcon(groupe)}
                    key={"key_groupeId_" + groupe}>
                    {showPanelVetements(vetements)}
                </AccordionSecondaryItem>
            );
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

            const selected = form.vetements?.some(v => v.id === item.id) ?? false;

            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} 
                                                        selected={selected}
                                                        editVetement={(vetement, selected) => addRemoveVetementForm(vetement, setForm, selected) } />);
        });

        return vetementsItems;
    }

    /**
     * Affiche un panneau contenant les images des vêtements d'une tenue.
     *
     * @param vetementsTenue - Tableau des modèles de vêtements à afficher.
     * Chaque modèle de vêtement peut contenir une image qui sera redimensionnée
     * avant d'être affichée.
     * 
     * @returns Un tableau d'éléments React.JSX.Element représentant les images
     * des vêtements redimensionnées. Si un vêtement ne contient pas d'image,
     * il ne sera pas inclus dans le rendu.
     */
    function showPanelVetementsTenue(vetementsTenue: VetementModel[]): React.JSX.Element[] {
        let imageItems: JSX.Element[] = [];
        vetementsTenue?.forEach((vetement) => {
            const renderFormImage = vetement.image ? resizeImage(vetement.image, 150) : null;
            if(renderFormImage) {
                imageItems.push(<View style={{padding: 3}} key={vetement.id}>
                    <Image key={vetement.id} height={renderFormImage.hauteur} width={renderFormImage.largeur} source={{ uri: renderFormImage.displayUri }} style={stylesF.photo} />
                    <Pressable style={stylesF.pressIcon} onPress={() => addRemoveVetementForm(vetement, setForm, false)}>
                        <Ionicons size={24} name="close-outline" color={"white"} style={[stylesF.iconSmall]} />
                    </Pressable>
                    </View>)
            }
        });
        return imageItems;
    }

    /**
     * 
     * @returns Formulaire de vêtement
     */
    function getPanelFormContent(): React.JSX.Element | null {

        const imageItems: JSX.Element[] = showPanelVetementsTenue(form.vetements ?? []);

        return (
            <View style={styles.body}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                    {imageItems.length > 0 &&
                        <ScrollView horizontal={true} contentInsetAdjustmentBehavior="automatic">
                            {imageItems}
                        </ScrollView>
                    }
                    {imageItems.length === 0 && <Image source={require('@/assets/icons/clothes-rnd-outline.png')} style={[stylesF.iconBig]} />}
                </View>
                <View style={stylesF.form}>
                    <View style={[styles.rowItems, {paddingLeft: 10}]}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorsForm?.libelleInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ?? ''}
                            placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom de la tenue' : errorsForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
                    </View>
                    <View style={[styles.rowItems, {paddingLeft: 10}]}>
                        <ThemedText type="defaultSemiBold" style={{marginTop: 10, marginBottom: 5}}>{renderLabelMandatory("Ajouter ou retirer des vêtements")}</ThemedText>
                    </View>
                    <View style={stylesF.input}>
                        {showPanelGroupeVetements(groupeVetementByType(vetementsAffiches))}
                    </View>
                </View>
            </View>
        );
    }


    /**
     * Validation du formulaire pour archivage du vêtement
     * @param form formulaire à valider
     * @param setForm fonction de mise à jour du formulaire
     * @param setErrorsForm fonction de mise à jour des erreurs
     * @param onCloseForm fonction de fermeture du formulaire
     * @returns si le formulaire est invalide
     */
    function archiveFormModalConfirmation(form: FormTenueModel, validateFormCallBack: (resultat: APIResultFormTenueModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const commande: string = form.statut === StatutVetementEnum.ARCHIVE ? 'désarchiver' : 'archiver';
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous ' + commande + ' cette tenue ?'}
            ackModalCallback={() => archiveForm(form, validateFormCallBack)}
            showModal={Math.random()} />;
        setModalDialog(dialog);
    }

    /**
 * Validation du formulaire pour archivage du vêtement
 * @param form formulaire à valider
 * @param setForm fonction de mise à jour du formulaire
 * @param setErrorsForm fonction de mise à jour des erreurs
 * @param onCloseForm fonction de fermeture du formulaire
 * @returns si le formulaire est invalide
*/
    function deleteFormModalConfirmation(form: FormTenueModel, deleteFormCallBack: (resultDelete: APIResultFormTenueModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous supprimer cette tenue ?'}
            ackModalCallback={() => deleteForm(form, deleteFormCallBack)}
            showModal={Math.random()} />;
        setModalDialog(dialog);
    }


    return (
        <>
            {modalDialog}
            <View style={styles.title}>
                <View style={styles.rowItems}>
                    <Pressable onPress={closeFormCallBack}>
                        <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
                    </Pressable>
                    {form.id && <>
                        <Pressable onPress={() => archiveFormModalConfirmation(form, validateFormCallBack, setModalDialog)}>
                            {renderArchiveIcon(form.statut)}
                        </Pressable>
                        <Pressable onPress={() => deleteFormModalConfirmation(form, deleteFormCallBack, setModalDialog)}>
                            <Image source={require('@/assets/icons/bin-outline.png')} style={styles.iconMenuStyle} />
                        </Pressable></>
                    }
                </View>

                <ThemedText type="subtitle">{tenueInEdition === null ? "Ajouter" : "Editer"} une tenue</ThemedText>
                <Pressable onPress={() => validateForm(form, setErrorsForm, validateFormCallBack)}>
                    <Ionicons size={28} name="checkmark-outline" color={Colors.dark.text} />
                </Pressable>
            </View>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                {getPanelFormContent()}
            </ScrollView>
        </>
    );
}

export const stylesF = StyleSheet.create({
    form: {
        backgroundColor: Colors.app.backgroundLight
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        color: Colors.dark.text,
        flex: 3,
        fontSize: Fonts.app.size
    },
    iconBig: {
        tintColor: 'gray',
        width: 150,
        height: 150,
        backgroundColor: Colors.app.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10,
        margin: 10,
    },
    iconSmall: {
        tintColor: Colors.app.color,
        width: 26,
        height: 26,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: Colors.app.backgroundLight,
    },
    pressIcon: {
        position: 'absolute',
        top: 5,
        right: 0,
    },
    photo: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 10,
    },
});
