import { Image, StyleSheet, View } from 'react-native';

import React from 'react';

import { resizeImage } from '../../commons/CommonsUtils';
import { Colors } from '@/app/constants/Colors';
import VetementImageModel from '@/app/models/vetements/vetements.image.model';



export type TenueItemImageComponentProps = {
    image: VetementImageModel;
};

/**
 * Composant principal pour un vêtement
 *
 * @returns {JSX.Element} Le composant de l'écran 
 *
 * @component
 **/
export const TenueItemImageComponent: React.FC<TenueItemImageComponentProps> = ({ image }: TenueItemImageComponentProps) => {
    
    const tenueImageToShow = image ? resizeImage(image, 250) : null;

    return (<View key={image.s3uri} style={[styles.body]}>
                {tenueImageToShow    && <Image style={styles.body} source={{ uri: tenueImageToShow.displayUri }} width={tenueImageToShow.largeur} height={tenueImageToShow.hauteur} />}
            </View>);
}


const styles = StyleSheet.create({
    body: {
        width: 167,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.app.background,
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginRight: 30,
        marginLeft: 15
    }
});
