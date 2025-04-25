import { Image, Pressable, ScrollView, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../../constants/Colors';
import { renderLabelMandatory } from '../../commons/CommonsUtils';
import { ModalDialogComponent } from '../../commons/views/ModalDialog';
import { ThemedText } from '../../commons/views/ThemedText';
import { stylesForm } from '../vetements/vetementForm.styles';
import { renderArchiveIcon } from '../vetements/vetementForm.component';
import DressingModel from '@/app/models/dressing.model';
import CapsuleTemporelleModel from '@/app/models/capsule/capsuleTemporelle.model';
import APIResultFormCapsuleModel from '@/app/models/capsule/form.result.capsule.model';
import FormCapsuleModel from '@/app/models/capsule/form.capsule.model';
import ErrorsFormCapsuleModel, { defaultErrorsFormCapsuleModel } from '@/app/models/capsule/form.errors.capsules.model';
import { AppContext } from '@/app/services/AppContextProvider';
import { archiveForm, deleteForm, initForm, setCriteres, setLibelleForm, validateForm } from '@/app/controllers/capsule/capsulesForm.controller';
import { CaracteristiqueVetementEnum, StatutVetementEnum } from '@/app/constants/AppEnum';
import { CapsuleCriteresComponent } from './capsuleCriteresForm.component';
import CapsuleCritereModel from '@/app/models/capsule/capsuleCritere';



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
export const CapsuleFormComponent: React.FC<CapsuleFormComponentProps> = ({ dressing, capsule: capsuleInEdition, closeFormCallBack, validateFormCallBack, deleteFormCallBack }: CapsuleFormComponentProps) => {

    const [form, setForm] = useState<FormCapsuleModel>({ } as FormCapsuleModel);
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
            <View style={stylesForm.body}>
                <View style={stylesForm.form}>
                    <View style={[stylesForm.rowItems, {paddingLeft: 10}]}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorsForm?.libelleInError ? stylesForm.inputError : stylesForm.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ?? ''}
                            placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom de la capsule' : errorsForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
                    </View>
                    <View style={[stylesForm.rowItems, {paddingLeft: 10}]}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Critères")}</ThemedText>
                    </View>
                    <CapsuleCriteresComponent selectedCriteres={form.criteres} setSelectedCriteres={(criteres : CapsuleCritereModel[]) => setCriteres(criteres, setForm, setErrorsForm)} errorsForm={errorsForm}/>
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
    function archiveFormModalConfirmation(form: FormCapsuleModel, validateFormCallBack: (resultat: APIResultFormCapsuleModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const commande: string = form.statut === StatutVetementEnum.ARCHIVE ? 'désarchiver' : 'archiver';
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous ' + commande + ' cette capsule ?'}
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
    function deleteFormModalConfirmation(form: FormCapsuleModel, deleteFormCallBack: (resultDelete: APIResultFormCapsuleModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous supprimer cette capsule ?'}
            ackModalCallback={() => deleteForm(form, deleteFormCallBack)}
            showModal={Math.random()} />;
        setModalDialog(dialog);
    }


    return (
        <>
            {modalDialog}
            <View style={stylesForm.title}>
                <View style={stylesForm.rowItems}>
                    <Pressable onPress={closeFormCallBack}>
                        <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
                    </Pressable>
                    {form.id && <>
                        <Pressable onPress={() => archiveFormModalConfirmation(form, validateFormCallBack, setModalDialog)}>
                            {renderArchiveIcon(form.statut)}
                        </Pressable>
                        <Pressable onPress={() => deleteFormModalConfirmation(form, deleteFormCallBack, setModalDialog)}>
                            <Image source={require('@/assets/icons/bin-outline.png')} style={stylesForm.iconMenuStyle} />
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