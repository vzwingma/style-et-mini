import { Image, Pressable, TextInput, View } from 'react-native'

import React, { useContext, useEffect, useState } from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors } from '@/constants/Colors';
import VetementModel from '@/app/models/vetements.model';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { AppContext } from '@/app/services/AppContextProvider';
import DressingModel from '@/app/models/dressing.model';
import FormVetementModel from '@/app/models/form.vetements.model';
import { razAndcloseForm, getTaillesMesuresForm, getTypeVetementsForm, getUsagesForm, setLibelleForm, setTailleForm, setTypeForm, setUsagesForm, validateForm, setCouleursForm, setDescriptionForm, initForm, setPetiteTailleForm, setEtatForm, getEtatsForm, pickImageForm, setSaisonForm, setCollectionForm, getMarquesForm, setMarqueForm, setPrixAchatForm, setPrixNeufForm, archiveForm, deleteForm, FormModelProps } from '@/app/controllers/vetementForm.controller';
import ErrorsFormVetementModel, { defaultErrorsFormVetementModel } from '@/app/models/form.errors.vetements.model';
import ParamTypeVetementsModel from '@/app/models/params/paramTypeVetements.model';
import ParamTailleVetementsModel from '@/app/models/params/paramTailleVetements.model';
import ParamUsageVetementsModel from '@/app/models/params/paramUsageVetements.model';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CategorieDressingEnum, getLibelleSaisonVetementEnum, SaisonVetementEnum, StatutVetementEnum, TypeTailleEnum } from '@/constants/AppEnum';
import ParamEtatVetementsModel from '@/app/models/params/paramEtatVetements.model';
import { getTypeVetementIcon, resizeImage } from '../commons/CommonsUtils';
import { ModalDialogComponent } from '../commons/views/ModalDialog';
import { styles } from './vetementForm.styles';
import VetementImageModel from '@/app/models/vetements.image.model';
import ParamMarqueVetementsModel from '@/app/models/params/paramMarqueVetements.model';


/**
 * Propriétés du composant VetementFormComponent.
 */
export type VetementFormComponentProps = {
    dressing: DressingModel;
    vetement: VetementModel | null;
    onCloseForm: () => void;
};

/**
 * Propriétés du composant VetementFormComponent.
 */
export type VetementsFormParamsTypeProps = {
    paramsTypeVetements?: ParamTypeVetementsModel[];
    paramsTaillesMesures?: ParamTailleVetementsModel[];
    paramsUsagesVetements?: ParamUsageVetementsModel[];
    paramsEtatVetements?: ParamEtatVetementsModel[];
    paramsMarquesVetements?: ParamMarqueVetementsModel[];
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
export const VetementFormComponent: React.FC<VetementFormComponentProps> = ({ dressing, vetement: vetementInEdition, onCloseForm }: VetementFormComponentProps) => {

    const [form, setForm] = useState<FormVetementModel>({} as FormVetementModel);
    const [errorsForm, setErrorsForm] = useState<ErrorsFormVetementModel>(defaultErrorsFormVetementModel);

    const [modalDialog, setModalDialog] = useState<JSX.Element | null>(null);

    const {
        typeVetements   : paramsTypeVetements,
        taillesMesures  : paramsTaillesMesures,
        usages          : paramsUsagesVetements,
        etats           : paramsEtatVetements,
        marques         : paramsMarquesVetements
    } = useContext(AppContext)!;

    useEffect(() => {
        initForm(dressing, vetementInEdition, setForm, { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements, paramsEtatVetements, paramsMarquesVetements });
    }, [dressing, vetementInEdition]);



    /**
     * Retourne un élément JSX avec une étiquette obligatoire.
     *
     * @param {string} label - Le texte de l'étiquette.
     * @returns {React.JSX.Element} Un élément JSX contenant l'étiquette avec un astérisque rouge pour indiquer qu'elle est obligatoire.
     */
    const renderLabelMandatory = (label: string): React.JSX.Element => {
        return (<><ThemedText style={{ color: 'red' }}>* </ThemedText><ThemedText>{label}</ThemedText></>);
    }


    /**
     * Rendu d'un élément sélectionné avec une option de désélection.
     *
     * @param {any} item - L'élément sélectionné à afficher.
     * @param {any} unSelect - Fonction de rappel pour désélectionner l'élément.
     * @returns {React.JSX.Element} Un élément JSX représentant l'élément sélectionné avec une icône de fermeture.
     */
    const renderSelectedItem = (item: any, unSelect: any): React.JSX.Element => (
        <Pressable
            style={styles.selectedStyle}
            onPress={() => unSelect?.(item)}>
            <View style={{ flexDirection: 'row' }}>
                <ThemedText type="default">{item.libelle} </ThemedText>
                <Ionicons style={styles.icon} color={'white'} name="close-circle-outline" size={18} />
            </View>
        </Pressable>
    );


    /**
     * Rendu d'un élément de type vêtement.
     *
     * @param {ParamTypeVetementsModel} item - L'élément de type vêtement à afficher.
     * @returns {React.JSX.Element} - Un élément JSX représentant l'élément de type vêtement.
     */
    const renderTypeItem = (item: ParamTypeVetementsModel): React.JSX.Element => (
        <View style={[styles.listItemStyle, { flexDirection: 'row' }]}>
            <Image source={getTypeVetementIcon(item.id)} style={styles.iconItemStyle} />
            <ThemedText style={{ top: 15 }}>{item.libelle}</ThemedText>
        </View>
    );
    /**
     * 
     * @returns Formulaire de vêtement
     */
    const getPanelFormContent = () => {

        let renderFormImage = {} as VetementImageModel;
        if (form.image) {
            // recalcul de la taille de l'image suivant la mise en page
            renderFormImage = resizeImage(form.image, 250);
        }
        return (
            <View style={styles.body}>
                <View style={{justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Pressable onPress={() => pickImageForm(setForm)}>
                            {form.image &&
                                <Image source={{ uri: renderFormImage.uri }} style={[styles.photo, {width: renderFormImage.largeur, height: renderFormImage.hauteur}]} />} 
                            {!form.image &&
                                <Image source={require('@/assets/icons/clothes-rnd-outline.png')} style={[styles.iconBig]} />}
                            {form.petiteTaille &&
                                <Image source={require('@/assets/icons/small-size-outline.png')} style={[styles.iconSmall]} />}
                        </Pressable>
                    </View>
                </View>
                <View style={styles.form}>

                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorsForm?.libelleInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ?? ''}
                            placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom du vêtement' : errorsForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Type")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.typeInError || form?.type ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.typeInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                            mode='modal'
                            data={getTypeVetementsForm(paramsTypeVetements, dressing)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.typeInError ? 'Selectionnez un type' : errorsForm?.typeMessage + ''}
                            value={form?.type}
                            onChange={(type: ParamTypeVetementsModel) => setTypeForm(type, setForm)}
                            renderItem={renderTypeItem}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-outline.png')} style={styles.icon} />}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Taille")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.tailleInError || form?.taille ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.tailleInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                            mode='modal'
                            data={getTaillesMesuresForm(paramsTaillesMesures, dressing, form)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.tailleInError ? 'Selectionnez une taille' : errorsForm?.tailleMessage + ''}
                            value={form?.taille}
                            onChange={(taille: ParamTailleVetementsModel) => setTailleForm(taille, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/size-outline.png')} style={styles.icon} />}
                        />
                    </View>
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie
                        && TypeTailleEnum.VETEMENTS === form.type?.type
                        && <View style={{ flexDirection: 'row' }}>
                            <ThemedText type="defaultSemiBold" style={styles.label}>Petite taille</ThemedText>
                            <BouncyCheckbox
                                fillColor={Colors.app.color}
                                isChecked={form?.petiteTaille}
                                onPress={(isChecked: boolean) => setPetiteTailleForm(isChecked, setForm)} />
                        </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Usage(s)")}</ThemedText>
                        <ThemedView style={styles.filtre}><ThemedText type="subtitle">
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
                        </ThemedText></ThemedView>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Saisons</ThemedText>
                        <ThemedView style={styles.filtre}><ThemedText type="subtitle">
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
                        </ThemedText></ThemedView>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Couleurs</ThemedText>
                        <TextInput style={styles.input} placeholderTextColor={'gray'}
                            value={form?.couleurs ?? ''}
                            placeholder={'Indiquez les couleurs (facultatif)'}
                            onChangeText={couleurs => setCouleursForm(couleurs, setForm)} />
                    </View>                    
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie &&
                        <View style={{ flexDirection: 'row' }}>
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
                                onChange={(etat: ParamEtatVetementsModel) => setEtatForm(etat, setForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-condition-outline.png')} style={styles.icon} />}
                            />
                        </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{renderLabelMandatory("Marque")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.marqueInError || form?.marque ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.marqueInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                            mode='modal'
                            data={getMarquesForm(paramsMarquesVetements, dressing, form)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.marqueInError ? 'Selectionnez une marque' : errorsForm?.marqueMessage + ''}
                            value={form?.marque}
                            onChange={(marque: ParamMarqueVetementsModel) => setMarqueForm(marque, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/brand-outline.png')} style={styles.icon} />}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Collection</ThemedText>
                        <TextInput style={styles.input} placeholderTextColor={'gray'}
                            value={form?.collection ?? ''}
                            placeholder={'Indiquez la collection (facultatif)'}
                            onChangeText={collection => setCollectionForm(collection, setForm)} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Prix d'achat</ThemedText>
                        <TextInput style={errorsForm?.prixAchatInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.prixAchatInError ? 'red' : 'gray'}
                            value={form?.prixAchat ?? ''}
                            placeholder={!errorsForm?.prixAchatMessage ? 'Saisir le prix d\'achat (facultatif)' : errorsForm?.prixAchatMessage + ''}
                            onChangeText={prix => setPrixAchatForm(prix, setForm)} />
                            <ThemedText type="defaultSemiBold" style={styles.labelEuro}>€</ThemedText>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Prix neuf</ThemedText>
                        <TextInput style={errorsForm?.prixNeufInError ? styles.inputError : styles.input} placeholderTextColor={errorsForm?.prixNeufInError ? 'red' : 'gray'}
                            value={form?.prixNeuf ?? ''}
                            placeholder={!errorsForm?.prixNeufMessage ? 'Saisir le prix neuf (facultatif)' : errorsForm?.prixNeufMessage + ''}
                            onChangeText={prix => setPrixNeufForm(prix, setForm)} />
                             <ThemedText type="defaultSemiBold" style={styles.labelEuro}>€</ThemedText>
                    </View>                                        
                    <View style={{ flexDirection: 'row' }}>
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
    function archiveFormModalConfirmation({ form, setForm, setErrorsForm, onCloseForm }: FormModelProps, setModalDialog: Function) {
        const commande: string = form.statut === StatutVetementEnum.ARCHIVE ? 'désarchiver' : 'archiver';
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous ' + commande + ' ce vêtement ?'}
            ackModalCallback={() => archiveForm({form, setForm, setErrorsForm, onCloseForm})}
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
    function deleteFormModalConfirmation({ form, setForm, setErrorsForm, onCloseForm }: FormModelProps, setModalDialog: Function) {
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous supprimer ce vêtement ?'}
            ackModalCallback={() => deleteForm(form, setForm, setErrorsForm, onCloseForm)}
            showModal={Math.random()} />;
        setModalDialog(dialog);
    }


    return (
        <>
            {modalDialog}

            <ThemedView style={styles.title}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Pressable onPress={() => razAndcloseForm(form, setForm, setErrorsForm, onCloseForm)}>
                        <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
                    </Pressable>
                    {form.id
                     && <>
                            <Pressable onPress={() => archiveFormModalConfirmation({ form, setForm, setErrorsForm: setErrorsForm, onCloseForm }, setModalDialog)}>
                                {renderArchiveIcon()}
                            </Pressable>
                            <Pressable onPress={() => deleteFormModalConfirmation({ form, setForm, setErrorsForm: setErrorsForm, onCloseForm }, setModalDialog)}>
                                <Image source={require('@/assets/icons/bin-outline.png')} style={styles.iconMenuStyle} />
                            </Pressable>
                        </>
                    }
                </View>

                <ThemedText type="subtitle">{vetementInEdition === null ? "Ajouter" : "Editer"} un vêtement</ThemedText>
                <Pressable onPress={() => validateForm(form, setForm, setErrorsForm, onCloseForm)}>
                    <Ionicons size={28} name="checkmark-outline" color={Colors.dark.text} />
                </Pressable>
            </ThemedView>

            {getPanelFormContent()}
        </>
    );
}