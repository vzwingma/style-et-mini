import { Image, Pressable, ScrollView, TextInput, View } from 'react-native';

import { StatutVetementEnum } from '@/app/constants/AppEnum';
import DressingModel from '@/app/models/dressing.model';
import ParamGenericVetementsModel from '@/app/models/params/paramGenericVetements.model';
import ErrorsFormVetementModel, { defaultErrorsFormVetementModel } from '@/app/models/vetements/form.errors.vetements.model';
import APIResultVetementModel from '@/app/models/vetements/form.result.vetements.model';
import FormVetementModel from '@/app/models/vetements/form.vetements.model';
import VetementImageModel from '@/app/models/vetements/vetements.image.model';
import VetementModel from '@/app/models/vetements/vetements.model';
import { AppContext } from '@/app/services/AppContextProvider';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { getTypeVetementIcon, renderLabelMandatory } from '../commons/CommonsUtils';
import { ModalDialogComponent } from '../commons/views/ModalDialog';
import { ThemedText } from '../commons/views/ThemedText';
import { styles } from '../dressing/vetementForm.styles';
import FormTenueModel from '@/app/models/tenues/form.tenue.model';
import { archiveForm, deleteForm, initForm, setLibelleForm, validateForm } from '@/app/controllers/tenues/tenuesForm.actions.controller';
import ErrorsFormTenueModel, { defaultErrorsFormTenueModel } from '@/app/models/tenues/form.errors.tenues.model';



/**
 * Propriétés du composant VetementFormComponent.
 */
export type VetementFormComponentProps = {
    dressing : DressingModel;
    vetement : VetementModel | null;
    closeFormCallBack() : void;
    validateFormCallBack(resultat: APIResultVetementModel) : void;
    deleteFormCallBack(resultat: APIResultVetementModel) : void;
};

/**
 * Propriétés du composant VetementFormComponent.
 */
export type VetementsFormParamsTypeProps = {
    paramsTypeVetements?: ParamGenericVetementsModel[];
    paramsTaillesMesures?: ParamGenericVetementsModel[];
    paramsUsagesVetements?: ParamGenericVetementsModel[];
    paramsEtatVetements?: ParamGenericVetementsModel[];
    paramsMarquesVetements?: ParamGenericVetementsModel[];
};


/**
 * Composant de formulaire pour ajouter ou éditer un vêtement dans le dressing.
 *
 * @param {VetementFormComponentProps} props - Les propriétés du composant.
 * @param {DressingModel} props.dressing - Le dressing auquel le vêtement appartient.
 * @param {VetementModel | null} props.vetement - Le vêtement en cours d'édition, ou null pour un nouveau vêtement.
 * @param {() => void} props.onCloseForm - Fonction de rappel pour fermer le formulaire.
 *
 * @returns {React.JSX.Element} - Un élément JSX représentant le formulaire de vêtement.
 */
export const TenueFormComponent: React.FC<VetementFormComponentProps> = ({ dressing, vetement: vetementInEdition, closeFormCallBack, validateFormCallBack, deleteFormCallBack }: VetementFormComponentProps) => {

    const [form, setForm] = useState<FormTenueModel>({} as FormTenueModel);
    const [errorsForm, setErrorsForm] = useState<ErrorsFormTenueModel>(defaultErrorsFormTenueModel);

    const {
        typeVetements: paramsTypeVetements,
        taillesMesures: paramsTaillesMesures,
        usages: paramsUsagesVetements,
        etats: paramsEtatVetements,
        marques: paramsMarquesVetements,
        modalDialog, setModalDialog
    } = useContext(AppContext)!;

    useEffect(() => {
        initForm(dressing, vetementInEdition, setForm);
        setModalDialog(null);
    }, [dressing, vetementInEdition, paramsEtatVetements, paramsMarquesVetements, paramsTaillesMesures, paramsTypeVetements, paramsUsagesVetements]);






    /**
     * Rendu d'un élément de type vêtement.
     *
     * @param {ParamTypeVetementsModel} item - L'élément de type vêtement à afficher.
     * @returns {React.JSX.Element} - Un élément JSX représentant l'élément de type vêtement.
     */
    const renderTypeItem = (item: ParamGenericVetementsModel): React.JSX.Element => (
        <View style={[styles.listItemStyle, styles.rowItems]}>
            <Image source={getTypeVetementIcon(item.id)} style={styles.iconItemStyle} />
            <ThemedText>{item.libelle}</ThemedText>
        </View>
    );
    /**
     * 
     * @returns Formulaire de vêtement
     */
    function getPanelFormContent(): React.JSX.Element | null {
        let renderFormImage = null as VetementImageModel | null;
        /*
        if (form.image) {
            // recalcul de la taille de l'image suivant la mise en page
            renderFormImage = resizeImage(form.image, 250);
        }*/

        return (
            <View style={styles.body}>
                <View style={styles.rowItems}>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Pressable onPress={() => {}}>
                            {renderFormImage &&
                                <Image height={renderFormImage.hauteur} width={renderFormImage.largeur} source={{ uri: renderFormImage.displayUri }} style={styles.photo}  />}
                            {!renderFormImage &&
                                <Image source={require('@/assets/icons/clothes-rnd-outline.png')} style={[styles.iconBig]} />}
                            { /* form.petiteTaille &&
                                <Image source={require('@/assets/icons/small-size-outline.png')} style={[styles.iconSmall]} /> */}
                        </Pressable>
                    </View>
                </View>
                <View style={styles.form}>

                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorsForm?.libelleInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ?? ''}
                            placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom de la tenue' : errorsForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
                    </View>

                </View>
            </View>
        );
    }

    /**
     * Retourne l'icône d'archive en fonction du statut du formulaire.
     * 
     * @returns {JSX.Element} Une image représentant l'icône d'archive ou de désarchivage.
     */
    function renderArchiveIcon() {
        return (form.statut === StatutVetementEnum.ARCHIVE ? <Image source={require('@/assets/icons/unarchive-outline.png')} style={styles.iconMenuStyle} />
            : <Image source={require('@/assets/icons/archive-outline.png')} style={styles.iconMenuStyle} />)
    }

    /**
     * Validation du formulaire pour archivage du vêtement
     * @param form formulaire à valider
     * @param setForm fonction de mise à jour du formulaire
     * @param setErrorsForm fonction de mise à jour des erreurs
     * @param onCloseForm fonction de fermeture du formulaire
     * @returns si le formulaire est invalide
     */
    function archiveFormModalConfirmation(form: FormTenueModel, validateFormCallBack: (resultat: APIResultVetementModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const commande: string = form.statut === StatutVetementEnum.ARCHIVE ? 'désarchiver' : 'archiver';
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous ' + commande + ' cette tenue ?'}
            ackModalCallback={() => archiveForm(form , validateFormCallBack)}
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
    function deleteFormModalConfirmation(form : FormTenueModel, deleteFormCallBack: (resultDelete: APIResultVetementModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
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
                                {renderArchiveIcon()}
                            </Pressable>
                            <Pressable onPress={() => deleteFormModalConfirmation(form, deleteFormCallBack, setModalDialog)}>
                                <Image source={require('@/assets/icons/bin-outline.png')} style={styles.iconMenuStyle} />
                            </Pressable>
                        </>
                    }
                </View>

                <ThemedText type="subtitle">{vetementInEdition === null ? "Ajouter" : "Editer"} une tenue</ThemedText>
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