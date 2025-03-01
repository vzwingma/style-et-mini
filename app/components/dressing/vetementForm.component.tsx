import { Pressable, StyleSheet, TextInput, View } from 'react-native'

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
import { razAndcloseForm, getTaillesMesuresForm, getTypeVetementsForm, getUsagesForm, setLibelleForm, setTailleForm, setTypeForm, setUsages, validateForm, setCouleursForm, setDescriptionForm, initForm, setPetiteTailleForm } from '@/app/controllers/vetementForm.controller';
import ErrorsFormVetementModel, { defaultErrorsFormVetementModel } from '@/app/models/form.errors.vetements.model';
import ParamTypeVetementsModel from '@/app/models/paramTypeVetements.model';
import ParamTailleVetementsModel from '@/app/models/paramTailleVetements.model';
import ParamUsageVetementsModel from '@/app/models/paramUsageVetements.model';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { CategorieDressingEnum, TypeTailleEnum } from '@/constants/AppEnum';

export type VetementFormComponentProps = {
    dressing: DressingModel;
    vetement: VetementModel | null;
    onCloseForm: () => void;
};


export type VetementsFormParamsTypeProps = {
    paramsTypeVetements?     : ParamTypeVetementsModel[];
    paramsTaillesMesures?    : ParamTailleVetementsModel[];
    paramsUsagesVetements?   : ParamUsageVetementsModel[];
};

/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 **/
export const VetementFormComponent : React.FC<VetementFormComponentProps> = ({ dressing, vetement: vetementInEdition, onCloseForm }: VetementFormComponentProps) => {

    const [form, setForm] = useState<FormVetementModel>({} as FormVetementModel);
    const [errorForm, setErrorForm] = useState<ErrorsFormVetementModel>(defaultErrorsFormVetementModel);

    const {typeVetements: paramsTypeVetements, taillesMesures: paramsTaillesMesures, usages: paramsUsagesVetements} = useContext(AppContext)!;

    useEffect(() => {
        initForm(dressing, vetementInEdition, setForm, {paramsTypeVetements, paramsTaillesMesures, paramsUsagesVetements});
    }, [dressing, vetementInEdition]);


    // TODO : Fix on Android
    const getLabelMandatory = (label: string): React.JSX.Element => {
        return (
            <>{label}</>
        );
    }

    /**
     * 
     * @returns Formulaire de vêtement
     */
    const getPanelFormContent = () => {

        return (
            <View style={styles.body}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.photo} >
                    <Ionicons size={250} name="shirt-outline" color={Colors.dark.text} />
                    {form.petiteTaille &&
                    <Ionicons size={50} style={{ position: 'absolute', bottom: 2, right: 2 }}
                                                                         name="arrow-down-circle-outline" color={Colors.app.color} />}
                </View>
                </View>
                <View style={styles.form}>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Nom")}</ThemedText>
                        <TextInput style={errorForm?.libelleInError ? styles.inputError : styles.input} placeholderTextColor={errorForm?.libelleInError ? 'red' : 'gray'} 
                                    value={form?.libelle ? form?.libelle : ''}
                                    placeholder={!errorForm?.libelleInError ? 'Indiquez le nom du vêtement' : errorForm?.libelleMessage+''}
                                    onChangeText={libelle => setLibelleForm(libelle, setForm)} />
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
                            placeholder={!errorForm?.typeInError ? 'Selectionnez un type' : errorForm?.typeMessage+''} 
                            value={form?.type}                                
                            onChange={(type : ParamTypeVetementsModel) => setTypeForm(type, setForm)}
                            renderLeftIcon={() => (
                                <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                            )}
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
                            placeholder={!errorForm?.tailleInError ? 'Selectionnez une taille' : errorForm?.tailleMessage+''}
                            value={form?.taille}
                            onChange={(taille : ParamTailleVetementsModel)=> setTailleForm(taille, setForm)}
                            renderLeftIcon={() => (
                                <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                            )}
                        />
                    </View>
                    {   
                        (dressing.categorie !== CategorieDressingEnum.ADULTE.toUpperCase()) 
                        && form.type?.typeTaille === TypeTailleEnum.TAILLE.toUpperCase()
                        &&  <View style={{ flexDirection: 'row' }}>
                            <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Petite taille")}</ThemedText>
                            <BouncyCheckbox 
                                fillColor={Colors.app.color}
                                isChecked={form?.petiteTaille}
                                onPress={(isChecked: boolean) => setPetiteTailleForm(isChecked, setForm)} />
                        </View>
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>{getLabelMandatory("Usage")}</ThemedText>
                        <MultiSelect
                            style={!errorForm?.usageInError || form?.usagesListe ? styles.dropdown : styles.dropdownInError} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorForm?.usageInError ? styles.placeholderStyle : styles.placeholderErrorStyle} selectedTextStyle={styles.selectedTextStyle} 
                            selectedStyle={styles.selectedStyle} inputSearchStyle={styles.inputSearchStyle}
                            maxHeight={300}
                            mode='modal'
                            data={getUsagesForm(paramsUsagesVetements, dressing)}
                            labelField="libelle" valueField="id"                            
                            placeholder={!errorForm?.usageInError ? 'Selectionnez un ou plusieurs usages' : errorForm?.usageMessage+''}
                            value={form?.usagesListe} 
                            onChange={usage => setUsages(usage, paramsUsagesVetements, setForm)}
                            renderLeftIcon={() => (
                                <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Couleurs</ThemedText>
                        <TextInput style={styles.input} placeholderTextColor={'gray'} 
                                    value={form?.couleurs ? form?.couleurs : ''}
                                    placeholder={'Indiquez les couleurs (facultatif)'}
                                    onChangeText={couleurs => setCouleursForm(couleurs, setForm)} />
                    </View>                    
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Description</ThemedText>
                        <TextInput style={styles.input} placeholderTextColor={'gray'} 
                                    value={form?.description ? form?.description : ''}
                                    multiline numberOfLines={3}
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
                <Pressable onPress={() =>razAndcloseForm(form, setForm, setErrorForm, onCloseForm)}>
                    <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
                </Pressable>
                <ThemedText type="subtitle">{vetementInEdition === null ? "Ajouter" : "Editer"} un vêtement</ThemedText>
                <Pressable onPress={() =>validateForm(form, setForm, setErrorForm, onCloseForm)}>
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
        width: '100%',
        backgroundColor: Colors.app.backgroundLight
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
      icon: {
        marginRight: 5,
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
      },      
      placeholderStyle: {
        fontSize: Fonts.app.size,
        color: 'gray',
      },
      placeholderErrorStyle: {
        fontSize: Fonts.app.size,
        color: 'red',
      },      
      // Items sélectionnés dans un dropdown multi-sélection
      selectedStyle: {
        fontSize: Fonts.app.size,
        borderColor: Colors.app.color,
        borderWidth: 2,
        borderRadius: 8,
        margin: 3,
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
