import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { StatutVetementEnum } from '@/app/constants/AppEnum';
import DressingModel from '@/app/models/dressing.model';
import VetementImageModel from '@/app/models/vetements/vetements.image.model';
import { AppContext } from '@/app/services/AppContextProvider';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Colors, Fonts } from '../../constants/Colors';
import { alphanumSort, getTypeVetementIcon, renderLabelMandatory, resizeImage, vetementSort } from '../commons/CommonsUtils';
import { ModalDialogComponent } from '../commons/views/ModalDialog';
import { ThemedText } from '../commons/views/ThemedText';
import { styles } from '../dressing/vetementForm.styles';
import FormTenueModel from '@/app/models/tenues/form.tenue.model';
import { addVetementForm, archiveForm, deleteForm, initForm, setLibelleForm, validateForm } from '@/app/controllers/tenues/tenuesForm.controller';
import ErrorsFormTenueModel, { defaultErrorsFormTenueModel } from '@/app/models/tenues/form.errors.tenues.model';
import TenueModel from '@/app/models/tenues/tenue.model';
import APIResultFormTenueModel from '@/app/models/tenues/form.result.tenue.model';
import { groupeVetementByType } from '@/app/controllers/dressing/dressingList.controller';
import VetementModel from '@/app/models/vetements/vetements.model';
import AccordionItem from '../commons/accordion/AccordionItem.component';
import { VetemenItemComponent } from '../dressing/vetementItem.component';



/**
 * Propriétés du composant VetementFormComponent.
 */
export type VetementFormComponentProps = {
    dressing: DressingModel;
    tenue: TenueModel | null;
    vetementsAffiches: VetementModel[];
    closeFormCallBack(): void;
    validateFormCallBack(resultat: APIResultFormTenueModel): void;
    deleteFormCallBack(resultat: APIResultFormTenueModel): void;
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
export const TenueFormComponent: React.FC<VetementFormComponentProps> = ({ dressing, vetementsAffiches, tenue: tenueInEdition, closeFormCallBack, validateFormCallBack, deleteFormCallBack }: VetementFormComponentProps) => {

    const [form, setForm] = useState<FormTenueModel>({} as FormTenueModel);
    const [errorsForm, setErrorsForm] = useState<ErrorsFormTenueModel>(defaultErrorsFormTenueModel);
    const [toggleAllItems, setToggleAllItems] = useState(false);
    const {
        modalDialog, setModalDialog
    } = useContext(AppContext)!;

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
            groupItems.push(
                <AccordionItem
                    title={vetements[0]?.type?.libelle + " (" + vetements.length + ")"}
                    icon={getTypeVetementIcon(groupe)}
                    toggleAllItems={toggleAllItems}
                    key={"key_groupeId_" + groupe}>
                    {showPanelVetements(vetements)}
                </AccordionItem>
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
            vetementsItems.push(<VetemenItemComponent key={item.id} vetement={item} 
                editVetement={(vetement) => addVetementForm(vetement, setForm)} />);
        });

        return vetementsItems;
    }

    /**
     * 
     * @returns Formulaire de vêtement
     */
    function getPanelFormContent(): React.JSX.Element | null {

        let imageItems: JSX.Element[] = [];
        form.vetements?.forEach((vetement) => {
            const renderFormImage = vetement.image ? resizeImage(vetement.image, 150) : null;
            if(renderFormImage) {
                imageItems.push(<Image height={renderFormImage.hauteur} width={renderFormImage.largeur} source={{ uri: renderFormImage.displayUri }} style={stylesF.photo} />)
            }
        });
   

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
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Vêtements")}</ThemedText>
                    </View>
                    <View style={stylesF.input}>
                        {showPanelGroupeVetements(groupeVetementByType(vetementsAffiches))}
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
                            {renderArchiveIcon()}
                        </Pressable>
                        <Pressable onPress={() => deleteFormModalConfirmation(form, deleteFormCallBack, setModalDialog)}>
                            <Image source={require('@/assets/icons/bin-outline.png')} style={styles.iconMenuStyle} />
                        </Pressable>
                    </>
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
    photo: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
    },
});
