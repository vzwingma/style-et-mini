import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

import React, { useContext, useState } from 'react';
import { ThemedText } from '../commons/ThemedText';
import { ThemedView } from '../commons/ThemedView';
import { Colors } from '@/constants/Colors';
import DressingVetementModel from '@/app/models/dressing.vetements.model';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { AppContext } from '@/app/services/AppContextProvider';


export type VetementFormComponentProps = {
    vetement: DressingVetementModel | null;
    onCloseForm: () => void;
};

/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 **/
export default function VetementFormComponent({ vetement, onCloseForm }: VetementFormComponentProps) {

    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);

    const {typeVetements} = useContext(AppContext)!;

    /**
     * 
     * @returns Formulaire de vêtement
     */
    const getPanelFormContent = () => {
        return (
            <View style={styles.body}>
                <View style={{ flex: 1, backgroundColor: 'dark' }} />
                <View style={styles.form}>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Nom</ThemedText>
                        <TextInput style={styles.input}/>
                    </View>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Type de vêtement</ThemedText>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={typeVetements}
                            search searchPlaceholder="Search..."
                            maxHeight={300}
                            labelField="libelle" valueField="_id"
                            placeholder={'Selectionnez un type'}
                            value={value}
                            onChange={item => {
                                setValue(item);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <Ionicons
                                style={styles.icon}
                                color={isFocus ? 'white' : 'white'}
                                name="triangle"
                                size={20}
                                />
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Taille</ThemedText>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={typeVetements}
                            search searchPlaceholder="Search..."
                            maxHeight={300}
                            labelField="libelle" valueField="_id"
                            placeholder={'Selectionnez un type'}
                            value={value}
                            onChange={item => {
                                setValue(item);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <Ionicons
                                style={styles.icon}
                                color={isFocus ? 'white' : 'white'}
                                name="triangle"
                                size={20}
                                />
                            )}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <ThemedText type="defaultSemiBold" style={styles.label}>Usage</ThemedText>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle} selectedTextStyle={styles.selectedTextStyle} inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={typeVetements}
                            search searchPlaceholder="Search..."
                            maxHeight={300}
                            labelField="libelle" valueField="_id"
                            placeholder={'Selectionnez un type'}
                            value={value}
                            onChange={item => {
                                setValue(item);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <Ionicons
                                style={styles.icon}
                                color={isFocus ? 'white' : 'white'}
                                name="triangle"
                                size={20}
                                />
                            )}
                        />
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
                <TouchableOpacity onPress={onCloseForm}>
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
        flex: 1,
        flexDirection: 'row',
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
      labelD: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
});
