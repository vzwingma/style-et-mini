import { Image, Pressable, ScrollView, TextInput, View } from 'react-native';

import { CategorieDressingEnum, getLibelleSaisonVetementEnum, SaisonVetementEnum, StatutVetementEnum, TypeTailleEnum } from '@/app/constants/AppEnum';
import { getEtatsForm, getMarquesForm, getTaillesMesuresForm, getTypeVetementsForm, getUsagesForm, initForm, pickImageForm, setCollectionForm, setCouleursForm, setDescriptionForm, setEtatForm, setLibelleForm, setMarqueForm, setPetiteTailleForm, setPrixAchatForm, setPrixNeufForm, setSaisonForm, setTailleForm, setTypeForm, setUsagesForm } from '@/app/controllers/dressing/vetementForm.set.controller';
import { archiveForm, deleteForm, validateForm } from '@/app/controllers/dressing/vetementForm.actions.controller';
import DressingModel from '@/app/models/dressing.model';
import ParamGenericVetementsModel from '@/app/models/params/paramGenericVetements.model';
import ErrorsFormVetementModel, { defaultErrorsFormVetementModel } from '@/app/models/vetements/form.errors.vetements.model';
import APIResultFormVetementModel from '@/app/models/vetements/form.result.vetements.model';
import FormVetementModel from '@/app/models/vetements/form.vetements.model';
import VetementImageModel from '@/app/models/vetements/vetements.image.model';
import VetementModel from '@/app/models/vetements/vetements.model';
import { AppContext } from '@/app/services/AppContextProvider';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { getTypeVetementIcon, renderLabelMandatory, renderSelectedItem, resizeImage } from '../../commons/CommonsUtils';
import { stylesForm } from './vetementForm.styles';
import { ThemedText } from '../../commons/views/ThemedText';
import { Colors } from '@/app/constants/Colors';
import { ModalDialogComponent } from '../../commons/views/ModalDialog';


/**
 * Propriétés du composant VetementFormComponent.
 */
export type VetementFormComponentProps = {
    dressing : DressingModel;
    vetement : VetementModel | null;
    closeFormCallBack() : void;
    validateFormCallBack(resultat: APIResultFormVetementModel) : void;
    deleteFormCallBack(resultat: APIResultFormVetementModel) : void;
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
 * Retourne l'icône d'archive en fonction du statut du formulaire.
 * 
 * @returns {JSX.Element} Une image représentant l'icône d'archive ou de désarchivage.
 */
export const renderArchiveIcon = (formStatut: StatutVetementEnum | null): React.JSX.Element => {
    return (formStatut === StatutVetementEnum.ARCHIVE ? <Image source={require('@/assets/icons/unarchive-outline.png')} style={stylesForm.iconMenuStyle} />
        : <Image source={require('@/assets/icons/archive-outline.png')} style={stylesForm.iconMenuStyle} />)
}

/**
 * Rendu d'un élément de type vêtement.
 *
 * @param {ParamTypeVetementsModel} item - L'élément de type vêtement à afficher.
 * @returns {React.JSX.Element} - Un élément JSX représentant l'élément de type vêtement.
 */
export const renderTypeItem = (item: ParamGenericVetementsModel): React.JSX.Element => (
    <View style={[stylesForm.listItemStyle, stylesForm.rowItems]}>
        <Image source={getTypeVetementIcon(item.id)} style={stylesForm.iconItemStyle} />
        <ThemedText>{item.libelle}</ThemedText>
    </View>
);


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
            <View style={stylesForm.body}>
                <View style={stylesForm.rowItems}>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Pressable onPress={() => pickImageForm(setForm)}>
                            {renderFormImage &&
                                <Image height={renderFormImage.hauteur} width={renderFormImage.largeur} source={{ uri: renderFormImage.displayUri }} style={stylesForm.photo}  />}
                            {!renderFormImage &&
                                <Image source={require('@/assets/icons/clothes-rnd-outline.png')} style={[stylesForm.iconBig]} />}
                            {form.petiteTaille &&
                                <Image source={require('@/assets/icons/small-size-outline.png')} style={[stylesForm.iconSmall]} />}
                        </Pressable>
                    </View>
                </View>
                <View style={stylesForm.form}>

                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorsForm?.libelleInError ? stylesForm.inputError : stylesForm.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ?? ''}
                            placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom du vêtement' : errorsForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
                    </View>

                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Type")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.typeInError || form?.type ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.typeInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={getTypeVetementsForm(paramsTypeVetements, dressing)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.typeInError ? 'Selectionnez un type' : errorsForm?.typeMessage + ''}
                            value={form?.type}
                            onChange={(type: ParamGenericVetementsModel) => setTypeForm(type, setForm)}
                            renderItem={renderTypeItem}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-outline.png')} style={stylesForm.icon} />}

                        />
                    </View>

                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Taille")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.tailleInError || form?.taille ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.tailleInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={getTaillesMesuresForm(paramsTaillesMesures, dressing, form)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.tailleInError ? 'Selectionnez une taille' : errorsForm?.tailleMessage + ''}
                            value={form?.taille}
                            onChange={(taille: ParamGenericVetementsModel) => setTailleForm(taille, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/size-outline.png')} style={stylesForm.icon} />}
                        />
                    </View>
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie
                        && TypeTailleEnum.VETEMENTS === form.type?.type
                        && <View style={stylesForm.rowItems}>
                            <ThemedText type="defaultSemiBold" style={stylesForm.label}>Petite taille</ThemedText>
                            <BouncyCheckbox
                                fillColor={Colors.app.color}
                                isChecked={form?.petiteTaille}
                                onPress={(isChecked: boolean) => setPetiteTailleForm(isChecked, setForm)} />
                        </View>
                    }
                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Usage(s)")}</ThemedText>
                        <View style={stylesForm.filtre}><View style={{ width: '100%' }}>
                            <MultiSelect
                                style={!errorsForm?.usageInError ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                                iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.usageInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                                selectedStyle={stylesForm.selectedStyle} inputSearchStyle={stylesForm.inputSearchStyle}
                                mode='modal'
                                backgroundColor={Colors.app.modalBackground}
                                data={getUsagesForm(paramsUsagesVetements, dressing)}
                                labelField="libelle" valueField="id"
                                placeholder={!errorsForm?.usageInError ? 'Selectionnez des usages' : errorsForm?.usageMessage + ''}
                                value={form?.usagesListe}
                                onChange={usage => setUsagesForm(usage, paramsUsagesVetements, setForm, setErrorsForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-usage-outline.png')} style={stylesForm.icon} />}
                                renderSelectedItem={renderSelectedItem}
                            />
                        </View></View>
                    </View>
                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>Saisons</ThemedText>
                        <View style={stylesForm.filtre}><View style={{ width: '100%' }}>
                            <MultiSelect
                                style={stylesForm.dropdown} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                                iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={stylesForm.placeholderStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                                selectedStyle={stylesForm.selectedStyle} inputSearchStyle={stylesForm.inputSearchStyle}
                                mode='modal'
                                backgroundColor={Colors.app.modalBackground}
                                data={Object.values(SaisonVetementEnum).map(saison => ({ id: saison, libelle: getLibelleSaisonVetementEnum(saison) }))}
                                labelField="libelle" valueField="id"
                                placeholder={'(par défaut : toutes saisons)'}
                                value={form?.saisons?.map(saison => (saison.toString())) ?? []}
                                onChange={saisons => setSaisonForm(saisons, setForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/seasons-outline.png')} style={stylesForm.icon} />}
                                renderSelectedItem={renderSelectedItem}
                            />
                        </View></View>
                    </View>
                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>Couleurs</ThemedText>
                        <TextInput style={stylesForm.input} placeholderTextColor={'gray'}
                            value={form?.couleurs ?? ''}
                            placeholder={'Indiquez les couleurs (facultatif)'}
                            onChangeText={couleurs => setCouleursForm(couleurs, setForm)} />
                    </View>
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie &&
                        <View style={stylesForm.rowItems}>
                            <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Etat")}</ThemedText>
                            <Dropdown
                                style={!errorsForm?.etatInError || form?.etat ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                                iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.tailleInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                                mode='modal'
                                backgroundColor={Colors.app.modalBackground}
                                maxHeight={300}
                                data={getEtatsForm(paramsEtatVetements, dressing)}
                                labelField="libelle" valueField="id"
                                placeholder={!errorsForm?.tailleInError ? 'Selectionnez un état' : errorsForm?.etatMessage + ''}
                                value={form?.etat}
                                onChange={(etat: ParamGenericVetementsModel) => setEtatForm(etat, setForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-condition-outline.png')} style={stylesForm.icon} />}
                            />
                        </View>
                    }
                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Marque")}</ThemedText>
                        <Dropdown
                            style={!errorsForm?.marqueInError || form?.marque ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.marqueInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={getMarquesForm(paramsMarquesVetements, dressing, form)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.marqueInError ? 'Selectionnez une marque' : errorsForm?.marqueMessage + ''}
                            value={form?.marque}
                            onChange={(marque: ParamGenericVetementsModel) => setMarqueForm(marque, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/brand-outline.png')} style={stylesForm.icon} />}
                        />
                    </View>
                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>Collection</ThemedText>
                        <TextInput style={stylesForm.input} placeholderTextColor={'gray'}
                            value={form?.collection ?? ''}
                            placeholder={'Indiquez la collection (facultatif)'}
                            onChangeText={collection => setCollectionForm(collection, setForm)} />
                    </View>
                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>Prix d'achat</ThemedText>
                        <TextInput style={errorsForm?.prixAchatInError ? stylesForm.inputError : stylesForm.input} placeholderTextColor={errorsForm?.prixAchatInError ? 'red' : 'gray'}
                            value={form?.prixAchat ?? ''}
                            placeholder={!errorsForm?.prixAchatInError ? 'Saisir le prix d\'achat (facultatif)' : errorsForm?.prixAchatMessage}
                            onChangeText={prix => setPrixAchatForm(prix, setForm)} />
                        <ThemedText type="defaultSemiBold" style={stylesForm.labelEuro}>€</ThemedText>
                    </View>

                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>Prix neuf</ThemedText>
                        <TextInput style={errorsForm?.prixNeufInError ? stylesForm.inputError : stylesForm.input} placeholderTextColor={errorsForm?.prixNeufInError ? 'red' : 'gray'}
                            value={form?.prixNeuf ?? ''}
                            placeholder={!errorsForm?.prixNeufInError ? 'Saisir le prix neuf (facultatif)' : errorsForm?.prixNeufMessage}
                            onChangeText={prix => setPrixNeufForm(prix, setForm)} />
                        <ThemedText type="defaultSemiBold" style={stylesForm.labelEuro}>€</ThemedText>
                    </View>
                    <View style={stylesForm.rowItems}>
                        <ThemedText type="defaultSemiBold" style={stylesForm.label}>Description</ThemedText>
                        <TextInput style={[stylesForm.input, { minHeight: 50 }]} placeholderTextColor={'gray'}
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
     * Validation du formulaire pour archivage du vêtement
     * @param form formulaire à valider
     * @param setForm fonction de mise à jour du formulaire
     * @param setErrorsForm fonction de mise à jour des erreurs
     * @param onCloseForm fonction de fermeture du formulaire
     * @returns si le formulaire est invalide
     */
    function archiveFormModalConfirmation(form: FormVetementModel, validateFormCallBack: (resultat: APIResultFormVetementModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
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
    function deleteFormModalConfirmation(form : FormVetementModel, deleteFormCallBack: (resultDelete: APIResultFormVetementModel) => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous supprimer ce vêtement ?'}
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