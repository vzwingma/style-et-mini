import { Image, Pressable, StyleSheet, View } from 'react-native';

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
        <Pressable onPress={() => editVetement(vetement)}>
            <View key={vetement.id} style={styles.body}>
                {vetement.image  && <Image source={{ uri: vetement.image }} style={styles.photo} />}
                {!vetement.image && <Ionicons size={95} name="shirt-outline" color={Colors.dark.text} style={{paddingBottom: 5}} />}
                {   vetement.taille.petite && <Ionicons size={30} 
                                                        name="arrow-down-circle-outline" 
                                                        style={{ position: 'absolute', bottom: 0, right: 0 }} color={Colors.app.color} /> }
                <ThemedText type="default">{vetement.libelle}</ThemedText>
            </View>
        </Pressable>
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
    photo: {
        width: 95,
        height: 95,
        cursor: 'pointer',
        margin: 4,
        alignItems: 'center',
    }
});
