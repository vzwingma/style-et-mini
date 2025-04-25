import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { renderLabelMandatory } from '../commons/CommonsUtils';
import { ModalDialogComponent } from '../commons/views/ModalDialog';
import { ThemedText } from '../commons/views/ThemedText';
import { styles } from '../dressing/vetements/vetementForm.styles';
import { renderArchiveIcon } from '../dressing/vetements/vetementForm.component';
import DressingModel from '@/app/models/dressing.model';
import CapsuleTemporelleModel from '@/app/models/capsule/capsuleTemporelle.model';



/**
 * Propriétés du composant VetementFormComponent.
 */
export type CapsuleFormComponentProps = {
    dressing: DressingModel;
    capsule: CapsuleTemporelleModel | null;
    closeFormCallBack(): void;
    validateFormCallBack(resultat: APIResultFormCapsuleModel): void;
    deleteFormCallBack(resultat: APIResultFormCapsuleModel): void;
};


/**
 * Composant React représentant un formulaire pour ajouter ou éditer une tenue.
 * 
 * @component
 * @param {VetementFormComponentProps} props - Les propriétés du composant.
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
export const CapsuleFormComponent: React.FC<CapsuleFormComponentProps> = ({ dressing, capsule: capsuleInEdition, closeFormCallBack, validateFormCallBack, deleteFormCallBack }: CapsuleFormComponentProps) => {

    const [form, setForm] = useState<FormCapsuleModel>({} as FormCapsuleModel);
    const [errorsForm, setErrorsForm] = useState<ErrorsFormCapsuleModel>(defaultErrorsFormCapsuleModel);

    const {
        modalDialog, setModalDialog
    } = useContext(AppContext)!;

    useEffect(() => {
        initForm(dressing, capsuleInEdition, setForm);
        setModalDialog(null);
    }, [dressing, capsuleInEdition]);



    /**
     * 
     * @returns Formulaire de vêtement
     */
    function getPanelFormContent(): React.JSX.Element | null {

        return (
            <View style={styles.body}>
                <View style={styles.form}>
                    <View style={[styles.rowItems, {paddingLeft: 10}]}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorsForm?.libelleInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ?? ''}
                            placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom de la capsule' : errorsForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
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
            ackModalCallback={() => archiveForm(form, validateFormCallBack)} />;
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
            ackModalCallback={() => deleteForm(form, deleteFormCallBack)}/>;
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

                <ThemedText type="subtitle">{capsuleInEdition === null ? "Ajouter" : "Editer"} une capsule</ThemedText>
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

});
