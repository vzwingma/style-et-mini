import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import React, { useContext, useState } from 'react';
import { ThemedText } from '../commons/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors } from '@/constants/Colors';
import VetementModel from '@/app/models/dressing.vetements.model';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { AppContext } from '@/app/services/AppContextProvider';
import DressingModel from '@/app/models/dressing.model';
import FormVetementModel from '@/app/models/form.vetements.model';
import { getTaillesMesuresForm, getTypeVetementsForm, getUsagesForm, setTailleForm, setTypeForm, setUsages, validateForm } from '@/app/controllers/vetementForm.controller';


export type VetementFormComponentProps = {
    dressing: DressingModel;
    vetement: VetementModel | null;
    onCloseForm: () => void;
};

/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 **/
export default function VetementFormComponent({ dressing, vetement, onCloseForm }: VetementFormComponentProps) {

    const [form, setForm] = useState<FormVetementModel| null>(null);

    const {typeVetements, taillesMesures, usages} = useContext(AppContext)!;


    /**
     * 
     * @returns Formulaire de vêtement
     */
    const getPanelFormContent = () => {

        
        return (
            <View style={styles.body}>
                <View style={{ flex: 1, backgroundColor: 'dark', alignItems: 'center', borderColor: 'black', borderWidth: 1 }} >
                    <Ionicons size={250} name="shirt-outline" color={Colors.dark.text} />
                </View>
                <View style={styles.form}>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Nom *</ThemedText>
                        <TextInput style={styles.input}/>
                    </View>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Type de vêtement *</ThemedText>
                        <Dropdown
                            style={styles.dropdown} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} 
                            mode='modal'
                            maxHeight={300}
                            data={getTypeVetementsForm(typeVetements, dressing)}
                            labelField="libelle" valueField="id"                            
                            placeholder={'Selectionnez un type de vêtements'} 
                            value={form?.type}                                
                            onChange={type => {
                                setTypeForm(type, setForm);
                            }}
                            renderLeftIcon={() => (
                                <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Taille *</ThemedText>
                        <Dropdown
                            style={styles.dropdown} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} 

                            maxHeight={300}
                            data={getTaillesMesuresForm(taillesMesures, dressing)}
                            labelField="libelle" valueField="id"                            
                            placeholder={'Selectionnez une taille'}
                            value={form?.taille}
                            onChange={taille => {
                                setTailleForm(taille, setForm);
                            }}
                            renderLeftIcon={() => (
                                <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Usage *</ThemedText>
                        <MultiSelect
                            style={styles.dropdown} containerStyle={styles.listStyle} itemContainerStyle={styles.listItemStyle} itemTextStyle={styles.listItemStyle}
                            iconStyle={styles.iconStyle} activeColor={Colors.app.color} placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} 
                            selectedStyle={styles.selectedStyle} inputSearchStyle={styles.inputSearchStyle}
                            maxHeight={300}
                            mode='modal'
                            data={getUsagesForm(usages, dressing)}
                            labelField="libelle" valueField="id"                            
                            placeholder={'Selectionnez un ou plusieurs usages'}
                            value={form?.usage} 
                            onChange={usage => {
                                setUsages(usage, setForm);
                            }}
                            renderLeftIcon={() => (
                                <Ionicons style={styles.icon} color={'white'} name="triangle" size={20} />
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Couleurs</ThemedText>
                        <TextInput style={styles.input} />
                    </View>                    
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Description</ThemedText>
                        <TextInput style={styles.input} multiline numberOfLines={3}/>
                    </View>
                </View>
            </View>
        );
    }


    return (
        <>
            <ThemedView style={styles.title}>
                <TouchableOpacity onPress={onCloseForm}>
                    <Ionicons size={28} name="arrow-undo-circle-outline" color={Colors.dark.text} />
                </TouchableOpacity>
                <ThemedText type="subtitle">{vetement === null ? "Ajouter" : "Editer"} un vêtement</ThemedText>
                <TouchableOpacity onPress={() =>validateForm(form, setForm, onCloseForm)}>
                    <Ionicons size={28} name="checkmark-outline" color={Colors.dark.text} />
                </TouchableOpacity>
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
        padding: 10,
        width: '100%',
        backgroundColor: Colors.app.background
    },
    // Formulaire
    form: {
        flex: 2,
        flexDirection: 'column',
        padding: 10,
        margin: 10,
        width: '100%',
        backgroundColor: Colors.app.backgroundLight
    },
    // Label de formulaire
    label: {
        width: 200,
        marginTop: 5,
        marginBottom: 5,
    },
    // Champ de formulaire
    input: {
        marginTop: 5,
        marginBottom: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        padding: 10,
        color: Colors.dark.text,
        flex: 3,
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
        fontSize: 16,
        color: 'gray',
      },
      // Items sélectionnés dans un dropdown multi-sélection
      selectedStyle: {
        fontSize: 16,
        borderColor: Colors.app.color,
        borderWidth: 2,
        borderRadius: 8,
        margin: 5,
      },      
      selectedTextStyle: {
        fontSize: 16,
        color: Colors.dark.text
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
        backgroundColor: 'red',
      },
});
