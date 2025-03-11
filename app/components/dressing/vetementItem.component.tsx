import { Image, Pressable, StyleSheet, View } from 'react-native';

import React from 'react';
import { ThemedText } from '../commons/ThemedText';
import { Colors } from '@/constants/Colors';
import VetementModel from '@/app/models/vetements.model';


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
                {!vetement.image && <Image source={require('@/assets/icons/clothes-rnd-outline.png')} 
                                                    style={[styles.iconBig ]}  />}
                {vetement.taille.petite && <Image source={require('@/assets/icons/small-size-outline.png')} 
                                                    style={[styles.iconSmall ]} />} 
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
    },
    iconSmall: {
        position: 'absolute', 
        bottom: 1, 
        right: 1, 
        tintColor: Colors.app.color,
        width: 30,
        height: 30,
        borderColor: Colors.dark.icon,
        borderWidth: 0,
        borderRadius: 15,
        backgroundColor: Colors.app.backgroundLight,
    },
    iconBig: {
        tintColor: 'gray',
        margin: 0,
        width: 95,
        height: 95,
        borderColor: Colors.dark.background,
    },
});
