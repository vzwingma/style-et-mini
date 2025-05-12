import { Image, StyleSheet, View } from 'react-native';

import React from 'react';
import VetementModel from '@/app/models/vetements/vetements.model';
import { resizeImage } from '../../commons/CommonsUtils';
import { Colors } from '@/app/constants/Colors';



export type TenueItemVetementComponentProps = {
    vetement: VetementModel;
};

/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 **/
export const TenueItemVetementComponent: React.FC<TenueItemVetementComponentProps> = ({ vetement }: TenueItemVetementComponentProps) => {

    const vetementImageToShow = vetement.image ? resizeImage(vetement.image, 100) : null;

    return (
        <View key={vetement.id} style={[styles.body]}>
            <View style={[styles.photoFrame, !vetementImageToShow ? { borderColor: Colors.app.backgroundLight, borderWidth: 1, } : null]}>
                {vetementImageToShow && <Image source={{ uri: vetementImageToShow.displayUri }} width={vetementImageToShow.largeur} height={vetementImageToShow.hauteur} />}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.app.background,
        width: 112,
        height: 112,
        paddingTop: 5,
        margin: 5,
        alignItems: 'center',
        borderColor: Colors.app.backgroundLight,
        borderWidth: 1,
        borderStartStartRadius: 10,
        borderEndEndRadius: 10
    },
    selected: {
        borderColor: Colors.app.color,
        borderWidth: 2,
    },
    unselected: {
        opacity: 0.5,
    },
    photoFrame: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
