import { StyleSheet, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { ThemedText } from '../commons/ThemedText';
import { Colors } from '@/constants/Colors';
import VetementModel from '@/app/models/vetements.model';
import { Ionicons } from '@expo/vector-icons';


export type VetementItemComponentProps = {
    vetement: VetementModel;
    editVetement: (vetement: VetementModel) => void;
};

/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 **/
export const VetemenItemComponent: React.FC<VetementItemComponentProps> = ({ vetement, editVetement }: VetementItemComponentProps) => {

    return (
        <TouchableOpacity onPress={() => editVetement(vetement)}>
        <View key={vetement.id} style={styles.body}>
            <Ionicons size={95} name="shirt-outline" color={Colors.dark.text} />
            <ThemedText type="default">{vetement.libelle}</ThemedText>
        </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.app.background,
        width: 120,
        height: 124,
        margin: 5,
        alignItems: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10,
        cursor: 'pointer',
    },
});
