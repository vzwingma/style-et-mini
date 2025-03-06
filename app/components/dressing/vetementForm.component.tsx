import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'

import React, { useContext, useEffect, useState } from 'react';
import { ThemedText } from '../commons/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors, Fonts } from '@/constants/Colors';
import VetementModel from '@/app/models/vetements.model';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { AppContext } from '@/app/services/AppContextProvider';
import DressingModel from '@/app/models/dressing.model';
import FormVetementModel from '@/app/models/form.vetements.model';
import { razAndcloseForm, getTaillesMesuresForm, getTypeVetementsForm, getUsagesForm, setLibelleForm, setTailleForm, setTypeForm, setUsages as setUsagesForm, validateForm, setCouleursForm, setDescriptionForm, initForm, setPetiteTailleForm, setEtatForm, getEtatsForm, pickImageForm, setSaisonForm } from '@/app/controllers/vetementForm.controller';
import ErrorsFormVetementModel, { defaultErrorsFormVetementModel } from '@/app/models/form.errors.vetements.model';
import ParamTypeVetementsModel from '@/app/models/params/paramTypeVetements.model';
import ParamTailleVetementsModel from '@/app/models/params/paramTailleVetements.model';
import ParamUsageVetementsModel from '@/app/models/params/paramUsageVetements.model';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CategorieDressingEnum, getLibelleSaisonVetementEnum, SaisonVetementEnum, TypeTailleEnum } from '@/constants/AppEnum';
import ParamEtatVetementsModel from '@/app/models/params/paramEtatVetements.model';


export type VetementFormComponentProps = {
    dressing: DressingModel;
    vetement: VetementModel | null;
    onCloseForm: () => void;
};


export type VetementsFormParamsTypeProps = {
    paramsTypeVetements?: ParamTypeVetementsModel[];
    paramsTaillesMesures?: ParamTailleVetementsModel[];
    paramsUsagesVetements?: ParamUsageVetementsModel[];
    paramsEtatVetements?: ParamEtatVetementsModel[];
};

/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 **/
export const VetementFormComponent: React.FC<VetementFormComponentProps> = ({ dressing, vetement: vetementInEdition, onCloseForm }: VetementFormComponentProps) => {

    const [form, setForm] = useState<FormVetementModel>({} as FormVetementModel);
    const [errorForm, setErrorForm] = useState<ErrorsFormVetementModel>(defaultErrorsFormVetementModel);

    const { 
        typeVetements: paramsTypeVetements,
        taillesMesures: paramsTaillesMesures,
        usages: paramsUsagesVetements,
        etats: paramsEtatVetements 
    } = useContext(AppContext)!;

    useEffect(() => {
        initForm(dressing, vetementInEdition, setForm, { paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements, paramsEtatVetements });
    }, [dressing, vetementInEdition]);



    /**
     * 
     * @param label 
     * @returns nom du label avec une étoile rouge si obligatoire
     */
    const getLabelMandatory = (label: string): React.JSX.Element => {
        return (<><ThemedText style={{color: 'red'}}>* </ThemedText><ThemedText>{label}</ThemedText></>);
    }

    /**
     * 
     * @param item 
     * @param unSelect 
     * @returns élément sélectionné
     */
    const getRenderSelectedItem= (item:any, unSelect:any): React.JSX.Element => (
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
     * 
     * @returns Formulaire de vêtement
     */
    const getPanelFormContent = () => {

        return (
            <View style={styles.body}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.photo} >
                        <Pressable onPress={() => pickImageForm(setForm)}>
                            { form.imageId && <Image source={{ uri: form.imageContent?.uri }} style={styles.photo} />}
                            {!form.imageId && <Ionicons size={250} name="shirt-outline" color={Colors.dark.text} />}
                            {form.petiteTaille &&
                                <Ionicons size={50} style={{ position: 'absolute', bottom: 2, right: 2 }}
                                    name="arrow-down-circle-outline" color={Colors.app.color} />}
                        </Pressable>
                    </View>
                </View>
                <View style={styles.form}>

                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorForm?.libelleInError ? styles.inputError : styles.input} placeholderTextColor={errorForm?.libelleInError ? 'red' : 'gray'}
                            value={form?.libelle ? form?.libelle : ''}
                            placeholder={!errorForm?.libelleInError ? 'Indiquez le nom du vêtement' : errorForm?.libelleMessage + ''}
                            onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorForm)} />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Type")}</ThemedText>
                        <Dropdown
                            style={!errorForm?.typeInError || form?.type ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorForm?.typeInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                            mode='modal'
                            maxHeight={300}
                            data={getTypeVetementsForm(paramsTypeVetements, dressing)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorForm?.typeInError ? 'Selectionnez un type' : errorForm?.typeMessage + ''}
                            value={form?.type}
                            onChange={(type: ParamTypeVetementsModel) => setTypeForm(type, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-outline.png')} style={styles.icon} />}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Taille")}</ThemedText>
                        <Dropdown
                            style={!errorForm?.tailleInError || form?.taille ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorForm?.tailleInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}

                            maxHeight={300}
                            data={getTaillesMesuresForm(paramsTaillesMesures, dressing, form)}
                            labelField="libelle" valueField="id"
                            placeholder={!errorForm?.tailleInError ? 'Selectionnez une taille' : errorForm?.tailleMessage + ''}
                            value={form?.taille}
                            onChange={(taille: ParamTailleVetementsModel) => setTailleForm(taille, setForm)}
                            renderLeftIcon={() => <Image source={require('@/assets/icons/size-outline.png')} style={styles.icon} />}
                        />
                    </View>
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie
                        && TypeTailleEnum.TAILLE !== form.type?.typeTaille
                        && <View style={{ flexDirection: 'row' }}>
                            <ThemedText type="defaultSemiBold" style={styles.label}>Petite taille</ThemedText>
                            <BouncyCheckbox
                                fillColor={Colors.app.color}
                                isChecked={form?.petiteTaille}
                                onPress={(isChecked: boolean) => setPetiteTailleForm(isChecked, setForm)} />
                        </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Usage(s)")}</ThemedText>
                        <ThemedView style={styles.filtre}><ThemedText type="subtitle">
                            <MultiSelect
                                style={!errorForm?.usageInError ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                                iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorForm?.usageInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}
                                selectedStyle={styles.selectedStyle} inputSearchStyle={styles.inputSearchStyle}
                                mode='modal'
                                data={getUsagesForm(paramsUsagesVetements, dressing)}
                                labelField="libelle" valueField="id"
                                placeholder={!errorForm?.usageInError ? 'Selectionnez des usages' : errorForm?.usageMessage + ''}
                                value={form?.usagesListe}
                                onChange={usage => setUsagesForm(usage, paramsUsagesVetements, setForm, setErrorForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/clothes-usage-outline.png')} style={styles.icon} />}
                                renderSelectedItem={getRenderSelectedItem}
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
                                placeholder={'Selectionnez des saisons (par défaut : toutes saisons)'}
                                value={form?.saisons?.map(saison => (saison.toString())) || []}
                                onChange={saisons => setSaisonForm(saisons, setForm)}
                                renderLeftIcon={() => <Image source={require('@/assets/icons/seasons-outline.png')} style={styles.icon} />}
                                renderSelectedItem={getRenderSelectedItem}
                            />
                        </ThemedText></ThemedView>
                    </View>                    
                    {
                        CategorieDressingEnum.ADULTE !== dressing.categorie &&
                        <View style={{ flexDirection: 'row' }}>
                            <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Etat")}</ThemedText>
                            <Dropdown
                                style={!errorForm?.etatInError || form?.etat ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                                iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorForm?.tailleInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle}

                                maxHeight={300}
                                data={getEtatsForm(paramsEtatVetements, dressing)}
                                labelField="libelle" valueField="id"
                                placeholder={!errorForm?.tailleInError ? 'Selectionnez un état' : errorForm?.etatMessage + ''}
                                value={form?.etat}
                                onChange={(etat: ParamEtatVetementsModel) => setEtatForm(etat, setForm)}
                                renderLeftIcon={() => (
                                    <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                                )}
                            />
                        </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Couleurs</ThemedText>
                        <TextInput style={styles.input} placeholderTextColor={'gray'}
                            value={form?.couleurs ? form?.couleurs : ''}
                            placeholder={'Indiquez les couleurs (facultatif)'}
                            onChangeText={couleurs => setCouleursForm(couleurs, setForm)} />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Description</ThemedText>
                        <TextInput style={[styles.input, {minHeight: 50}]} placeholderTextColor={'gray'}
                            scrollEnabled={true}
                            value={form?.description ? form?.description : ''}
                            multiline numberOfLines={2}
                            placeholder={'Indiquez la description (facultatif)'}
                            onChangeText={descrption => setDescriptionForm(descrption, setForm)} />
                    </View>
                </View>
            </View>
        );
    }


    return (
        <>
            <ThemedView style={styles.title}>
                <Pressable onPress={() => razAndcloseForm(form, setForm, setErrorForm, onCloseForm)}>
                    <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
                </Pressable>
                <ThemedText type="subtitle">{vetementInEdition === null ? "Ajouter" : "Editer"} un vêtement</ThemedText>
                <Pressable onPress={() => validateForm(form, setForm, setErrorForm, onCloseForm)}>
                    <Ionicons size={28} name="checkmark-outline" color={Colors.dark.text} />
                </Pressable>
            </ThemedView>

            {getPanelFormContent()}
        </>
    );
}


const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.app.color,
        padding: 5
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: Colors.app.background
    },
    // Formulaire
    form: {
        flex: 2,
        flexDirection: 'column',
        padding: 10,
        margin: 0,
        backgroundColor: Colors.app.backgroundLight,
    },
    photo: {
        backgroundColor: Colors.app.background,
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10,
        cursor: 'pointer',
    },
    // Label de formulaire
    label: {
        width: 100,
        marginTop: 15,
        marginBottom: 5
    },
    // Champ de formulaire
    inputError: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: 'red',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        color: Colors.dark.text,
        flex: 3,
    },
    input: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        color: Colors.dark.text,
        flex: 3,
        fontSize: Fonts.app.size,
    },
    // Dropdown de sélection
    dropdown: {
        marginTop: 5,
        marginBottom: 5,
        flex: 3,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%',
    },
    dropdownInError: {
        marginTop: 5,
        marginBottom: 5,
        flex: 3,
        padding: 10,
        borderColor: 'red',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    filtre: {
        flex: 1,
        marginTop: 5,
        padding: 0,
        backgroundColor: Colors.app.backgroundLight,
    },
    icon: {
        marginRight: 5,
        width: 20,
        height: 20,
        tintColor: 'white',
    },
    // Style de la liste déroulante d'un dropdown
    listStyle: {
        backgroundColor: Colors.app.backgroundLight,
    },
    // Style des éléments de la liste déroulante d'un dropdown
    listItemStyle: {
        margin: 0,
        padding: 0,
        height: 'auto',
        color: Colors.dark.text,
        fontFamily: "BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif",
    },
    placeholderStyle: {
        fontSize: Fonts.app.size,
        fontWeight: 'normal',
        color: 'gray',
    },
    placeholderErrorStyle: {
        fontSize: Fonts.app.size,
        color: 'red',
    },
    // Items sélectionnés dans un dropdown multi-sélection
    selectedStyle: {
        borderColor: Colors.app.color,
        borderWidth: 2,
        borderRadius: 8,
        margin: 1,
        paddingLeft: 10,
        marginTop: 5,
        marginRight: 5,
        padding: 1,
        cursor: 'pointer',
    },
    selectedTextStyle: {
        fontSize: Fonts.app.size,
        color: Colors.dark.text
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: Fonts.app.size,
        backgroundColor: 'red',
    },
});
