import { Image, Pressable, ScrollView, TextInput, View } from 'react-native'

import React, { useContext, useEffect, useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '../../constants/Colors';
import VetementModel from '@/app/models/vetements/vetements.model';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { AppContext } from '@/app/services/AppContextProvider';
import DressingModel from '@/app/models/dressing.model';
import FormVetementModel from '@/app/models/vetements/form.vetements.model';
import { getTaillesMesuresForm, getTypeVetementsForm, getUsagesForm, setLibelleForm, setTailleForm, setTypeForm, setUsagesForm, validateForm, setCouleursForm, setDescriptionForm, initForm, setPetiteTailleForm, setEtatForm, getEtatsForm, pickImageForm, setSaisonForm, setCollectionForm, getMarquesForm, setMarqueForm, setPrixAchatForm, setPrixNeufForm, archiveForm, deleteForm } from '@/app/controllers/vetementForm.controller';
import ErrorsFormVetementModel, { defaultErrorsFormVetementModel } from '@/app/models/vetements/form.errors.vetements.model';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CategorieDressingEnum, getLibelleSaisonVetementEnum, SaisonVetementEnum, StatutVetementEnum, TypeTailleEnum } from '@/app/constants/AppEnum';
import { getTypeVetementIcon, renderLabelMandatory, renderSelectedItem, resizeImage } from '../commons/CommonsUtils';
import { ModalDialogComponent } from '../commons/views/ModalDialog';
import { styles } from './vetementForm.styles';
import VetementImageModel from '@/app/models/vetements/vetements.image.model';
import ParamGenericVetementsModel from '@/app/models/params/paramGenericVetements.model';
import ResultFormDeleteVetementModel from '@/app/models/vetements/form.result.vetements.model';


/**
 * Propriétés du composant VetementFormComponent.
 */
export type VetementFormComponentProps = {
    dressing : DressingModel;
    vetement : VetementModel | null;
    closeFormCallBack() : void;
    validateFormCallBack(vetement: VetementModel) : void;
    deleteFormCallBack(vetement: ResultFormDeleteVetementModel) : void;
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
export const VetementFormComponent: React.FC<VetementFormComponentProps> = ({ dressing, vetement: vetementInEdition, closeFormCallBack, validateFormCallBack, deleteFormCallBack }: VetementFormComponentProps) => {

    const [form, setForm] = useState<FormVetementModel>({} as FormVetementModel);
    const [errorsForm, setErrorsForm] = useState<ErrorsFormVetementModel>(defaultErrorsFormVetementModel);

    const {
        typeVetements: paramsTypeVetements,
        taillesMesures: paramsTaillesMesures,
        usages: paramsUsagesVetements,
        etats: paramsEtatVetements,
        marques: paramsMarquesVetements,
        modalDialog, setModalDialog
    } = useContext(AppContext)!;

    useEffect(() => {
        initForm(dressing, vetementInEdition, setForm, { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements, paramsEtatVetements, paramsMarquesVetements });
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
            <ThemedText style={{ top: 15 }}>{item.libelle}</ThemedText>
        </View>
    );
    /**
     * 
     * @returns Formulaire de vêtement
     */
    function getPanelFormContent(): React.JSX.Element | null {
        let renderFormImage = null as VetementImageModel | null;
        if (form.image) {
            // recalcul de la taille de l'image suivant la mise en page
            renderFormImage = resizeImage(form.image, 250);
        }
        return (
            <View style={styles.body}>
                <View style={styles.rowItems}>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Pressable onPress={() => pickImageForm(setForm)}>
                            {renderFormImage &&
                                <Image source={{ uri: renderFormImage.displayUri }} style={[styles.photo, { width: renderFormImage.largeur, height: renderFormImage.hauteur }]} />}
                            {!renderFormImage &&
                                <Image source={require('@/assets/icons/clothes-rnd-outline.png')} style={[styles.iconBig]} />}
                            {form.petiteTaille &&
                                <Image source={require('@/assets/icons/small-size-outline.png')} style={[styles.iconSmall]} />}
                        </Pressable>
                    </View>
                </View>
                <View style={styles.form}>

                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorsForm?.libelleInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ?? ''}
                            placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom du vêtement' : errorsForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
                    </View>

                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Type")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.typeInError || form?.type ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.typeInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                            mode='modal'
                            data={getTypeVetementsForm(paramsTypeVetements, dressing)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.typeInError ? 'Selectionnez un type' : errorsForm?.typeMessage + ''}
                            value={form?.type}
                            onChange={(type: ParamGenericVetementsModel) => setTypeForm(type, setForm)}
                            renderItem={renderTypeItem}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-outline.png')} style={styles.icon} />}
                        />
                    </View>

                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Taille")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.tailleInError || form?.taille ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.tailleInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                            mode='modal'
                            data={getTaillesMesuresForm(paramsTaillesMesures, dressing, form)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.tailleInError ? 'Selectionnez une taille' : errorsForm?.tailleMessage + ''}
                            value={form?.taille}
                            onChange={(taille: ParamGenericVetementsModel) => setTailleForm(taille, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/size-outline.png')} style={styles.icon} />}
                        />
                    </View>
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie
                        && TypeTailleEnum.VETEMENTS === form.type?.type
                        && <View style={styles.rowItems}>
                            <ThemedText type="defaultSemiBold" style={styles.label}>Petite taille</ThemedText>
                            <BouncyCheckbox
                                fillColor={Colors.app.color}
                                isChecked={form?.petiteTaille}
                                onPress={(isChecked: boolean) => setPetiteTailleForm(isChecked, setForm)} />
                        </View>
                    }
                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Usage(s)")}</ThemedText>
                        <View style={styles.filtre}><View style={{ width: '100%' }}>
                            <MultiSelect
                                style={!errorsForm?.usageInError ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                                iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.usageInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                                selectedStyle={styles.selectedStyle} inputSearchStyle={styles.inputSearchStyle}
                                mode='modal'
                                data={getUsagesForm(paramsUsagesVetements, dressing)}
                                labelField="libelle" valueField="id"
                                placeholder={!errorsForm?.usageInError ? 'Selectionnez des usages' : errorsForm?.usageMessage + ''}
                                value={form?.usagesListe}
                                onChange={usage => setUsagesForm(usage, paramsUsagesVetements, setForm, setErrorsForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-usage-outline.png')} style={styles.icon} />}
                                renderSelectedItem={renderSelectedItem}
                            />
                        </View></View>
                    </View>
                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Saisons</ThemedText>
                        <View style={styles.filtre}><View style={{ width: '100%' }}>
                            <MultiSelect
                                style={styles.dropdown} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                                iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle}
                                selectedStyle={styles.selectedStyle} inputSearchStyle={styles.inputSearchStyle}
                                mode='modal'
                                data={Object.values(SaisonVetementEnum).map(saison => ({ id: saison, libelle: getLibelleSaisonVetementEnum(saison) }))}
                                labelField="libelle" valueField="id"
                                placeholder={'(par défaut : toutes saisons)'}
                                value={form?.saisons?.map(saison => (saison.toString())) ?? []}
                                onChange={saisons => setSaisonForm(saisons, setForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/seasons-outline.png')} style={styles.icon} />}
                                renderSelectedItem={renderSelectedItem}
                            />
                        </View></View>
                    </View>
                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Couleurs</ThemedText>
                        <TextInput style={styles.input} placeholderTextColor={'gray'}
                            value={form?.couleurs ?? ''}
                            placeholder={'Indiquez les couleurs (facultatif)'}
                            onChangeText={couleurs => setCouleursForm(couleurs, setForm)} />
                    </View>
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie &&
                        <View style={styles.rowItems}>
                            <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Etat")}</ThemedText>
                            <Dropdown
                                style={!errorsForm?.etatInError || form?.etat ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                                iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.tailleInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                                mode='modal'
                                maxHeight={300}
                                data={getEtatsForm(paramsEtatVetements, dressing)}
                                labelField="libelle" valueField="id"
                                placeholder={!errorsForm?.tailleInError ? 'Selectionnez un état' : errorsForm?.etatMessage + ''}
                                value={form?.etat}
                                onChange={(etat: ParamGenericVetementsModel) => setEtatForm(etat, setForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-condition-outline.png')} style={styles.icon} />}
                            />
                        </View>
                    }
                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Marque")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.marqueInError || form?.marque ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.marqueInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                            mode='modal'
                            data={getMarquesForm(paramsMarquesVetements, dressing, form)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.marqueInError ? 'Selectionnez une marque' : errorsForm?.marqueMessage + ''}
                            value={form?.marque}
                            onChange={(marque: ParamGenericVetementsModel) => setMarqueForm(marque, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/brand-outline.png')} style={styles.icon} />}
                        />
                    </View>
                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Collection</ThemedText>
                        <TextInput style={styles.input} placeholderTextColor={'gray'}
                            value={form?.collection ?? ''}
                            placeholder={'Indiquez la collection (facultatif)'}
                            onChangeText={collection => setCollectionForm(collection, setForm)} />
                    </View>
                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Prix d'achat</ThemedText>
                        <TextInput style={errorsForm?.prixAchatInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.prixAchatInError ? 'red' : 'gray'}
                            value={form?.prixAchat ?? ''}
                            placeholder={!errorsForm?.prixAchatMessage ? 'Saisir le prix d\'achat (facultatif)' : errorsForm?.prixAchatMessage + ''}
                            onChangeText={prix => setPrixAchatForm(prix, setForm)} />
                        <ThemedText type="defaultSemiBold" style={styles.labelEuro}>€</ThemedText>
                    </View>

                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Prix neuf</ThemedText>
                        <TextInput style={errorsForm?.prixNeufInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.prixNeufInError ? 'red' : 'gray'}
                            value={form?.prixNeuf ?? ''}
                            placeholder={!errorsForm?.prixNeufMessage ? 'Saisir le prix neuf (facultatif)' : errorsForm?.prixNeufMessage + ''}
                            onChangeText={prix => setPrixNeufForm(prix, setForm)} />
                        <ThemedText type="defaultSemiBold" style={styles.labelEuro}>€</ThemedText>
                    </View>
                    <View style={styles.rowItems}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Description</ThemedText>
                        <TextInput style={[styles.input, { minHeight: 50 }]} placeholderTextColor={'gray'}
                            scrollEnabled={true}
                            value={form?.description ?? ''}
                            multiline numberOfLines={2}
                            placeholder={'Indiquez la description (facultatif)'}
                            onChangeText={descrption => setDescriptionForm(descrption, setForm)} />
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
    function archiveFormModalConfirmation(form: FormVetementModel, validateFormCallBack: (vetement: VetementModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const commande: string = form.statut === StatutVetementEnum.ARCHIVE ? 'désarchiver' : 'archiver';
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous ' + commande + ' ce vêtement ?'}
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
    function deleteFormModalConfirmation(form : FormVetementModel, deleteFormCallBack: (resultDelete: ResultFormDeleteVetementModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous supprimer ce vêtement ?'}
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

                <ThemedText type="subtitle">{vetementInEdition === null ? "Ajouter" : "Editer"} un vêtement</ThemedText>
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