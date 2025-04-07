import { Image, Pressable, StyleSheet, View } from 'react-native';

import React from 'react';
import { ThemedText } from '../commons/views/ThemedText';
import { Colors } from '@/constants/Colors';
import VetementModel from '@/app/models/vetements.model';
import { resizeImage } from '../commons/CommonsUtils';


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
    
    const vetementImageToShow = vetement.image ? resizeImage(vetement.image, 100) : null;
    
    return (
        <Pressable onPress={() => editVetement(vetement)}>
            <View key={vetement.id} style={styles.body}>
                <View style={styles.photoFrame}>
                    {vetementImageToShow    && <Image source={{ uri: vetementImageToShow.displayUri }} style={[styles.photo, { width: vetementImageToShow.largeur, height: vetementImageToShow.hauteur }]} />}
                    {!vetementImageToShow   && <Image source={require('@/assets/icons/clothes-rnd-outline.png')}
                        style={[styles.iconBig]} />}
                    {vetement.taille.petite && <Image source={require('@/assets/icons/small-size-outline.png')}
                        style={[styles.iconSmall]} />}
                </View>
                <ThemedText type="default" style={styles.label}>{vetement.libelle}</ThemedText>
            </View>
        </Pressable>
    );
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.app.background,
        width: 112,
        height: 145,
        paddingTop: 5,
        margin: 5,
        alignItems: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10,
        cursor: 'pointer',
    },
    photoFrame: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
    },
    photo: {
        cursor: 'pointer',
    },
    iconSmall: {
        position: 'absolute',
        bottom: 1,
        right: 1,
        tintColor: Colors.app.color,
        width: 20,
        height: 20,
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
    label: {
        fontSize: 12,
        height:40,
        backgroundColor: Colors.app.background,
        textAlign: 'center',
        alignContent: 'center',
    }
});
