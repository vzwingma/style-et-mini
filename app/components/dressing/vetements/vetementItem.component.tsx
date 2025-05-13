import { Image, Pressable, StyleSheet, View } from 'react-native';

import React from 'react';
import VetementModel from '@/app/models/vetements/vetements.model';
import { resizeImage } from '../../commons/CommonsUtils';
import { ThemedText } from '../../commons/views/ThemedText';
import { Colors } from '@/app/constants/Colors';



export type VetementItemComponentProps = {
    vetement: VetementModel;
    selected?: boolean;
    editVetement?: (vetement: VetementModel, selected?: boolean) => void;
};




/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran
 *
 * @component
 **/
export const VetemenItemComponent: React.FC<VetementItemComponentProps> = ({ vetement, selected, editVetement }: VetementItemComponentProps) => {

    const vetementImageToShow = vetement.image ? resizeImage(vetement.image, 100) : null;

    const isInTenueForm = editVetement?.name === "editVetement";
    
    const getContainerStyle = (selected: boolean | undefined, isInTenueForm: boolean) => {
        if (selected) return styles.selected;
        if (isInTenueForm) return styles.unselected;
        return null;
    };
    const containerStyle = getContainerStyle(selected, isInTenueForm);

    return (
        <Pressable onPress={() => editVetement ? editVetement(vetement, !selected) : null}>

            <View key={vetement.id} style={[styles.body, containerStyle]}>
                <View style={[styles.photoFrame, !vetementImageToShow ? { borderColor: Colors.app.backgroundLight, borderWidth: 1, } : null]}>
                    {vetementImageToShow    && <Image source={{ uri: vetementImageToShow.displayUri }} width={vetementImageToShow.largeur} height={vetementImageToShow.hauteur} />}
                    {!vetementImageToShow   && <Image source={require('@/assets/icons/clothes-rnd-outline.png')}
                        style={[styles.iconBig]} />}
                    {'taille' in vetement && vetement.taille?.petite && <Image source={require('@/assets/icons/small-size-outline.png')}
                        style={[styles.iconSmall]} />}
                </View>
                <View style={styles.label}><ThemedText type="default">{vetement.libelle}</ThemedText></View>
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
    iconSmall: {
        position: 'absolute',
        bottom: 1,
        right: 1,
        tintColor: Colors.app.color,
        width: 20,
        height: 20,
        borderWidth: 0,
        borderRadius: 2,
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
        justifyContent: 'center',
        alignContent: 'center'
    }
});
