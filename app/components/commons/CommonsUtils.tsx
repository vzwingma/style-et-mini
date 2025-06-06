import { Pressable, View } from "react-native";
import { API_S3_URL } from "../../constants/APIconstants";
import VetementImageModel from "../../models/vetements/vetements.image.model";
import VetementModel from "../../models/vetements/vetements.model";
import { ThemedText } from "./views/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { stylesForm } from "../dressing/vetements/vetementForm.styles";
import { Colors, Fonts } from "@/app/constants/Colors";
import { styles } from "../dressing/dressingList.style";
// Fonction de tri alphanumérique
/**
 * Trie deux chaînes de caractères en utilisant un ordre alphanumérique.
 * 
 * Cette fonction utilise `localeCompare` avec les paramètres de la langue française
 * et l'option `numeric` activée, ce qui permet de comparer les chaînes en tenant
 * compte des valeurs numériques dans les chaînes.
 * 
 * @param a - La première chaîne à comparer.
 * @param b - La seconde chaîne à comparer.
 * @returns Un nombre négatif si `a` précède `b`, un nombre positif si `a` suit `b`,
 *          ou 0 si les deux chaînes sont égales.
 */
export function alphanumSort(a: string, b: string) {
    if(a.startsWith('...')){
        return 1;
    }
    if(b.startsWith('...')){
        return -1;
    }
    return a.localeCompare(b, 'fr', { numeric: true });
}

// Fonction de tri numérique
/**
 * Trie deux nombres dans l'ordre croissant.
 *
 * @param a - Le premier nombre à comparer.
 * @param b - Le second nombre à comparer.
 * @returns Une valeur négative si `a` est inférieur à `b`, 
 *          une valeur positive si `a` est supérieur à `b`, 
 *          ou 0 si les deux sont égaux.
 */
export function numSort(a: number | undefined, b: number | undefined) {
    if(a === undefined || b === undefined) {
        return 0;
    }
    return a - b;
}



/**
 * Retourne la valeur numérique d'un prix sous forme de chaîne de caractères.
 * 
 * @param prix - Le prix à convertir, sous forme de chaîne de caractères, ou `null`/`undefined`.
 * @returns La valeur numérique du prix arrondie à deux décimales, ou `null` si le prix est invalide ou vide.
 */
export function checkPriceFormat(prix: string | null | undefined): boolean {
    const prixFormat = getPriceValue(prix);
    return prixFormat === null || !isNaN(prixFormat);
}





/**
 * Convertit une chaîne de caractères représentant un prix en un nombre.
 * 
 * @param prix - Le prix à convertir, sous forme de chaîne de caractères, ou `null`/`undefined`.
 * @returns La valeur numérique du prix arrondie à deux décimales, ou `null` si le prix est invalide ou vide.
 */
export function getPriceValue(prix: string | null | undefined): number | null {
    if (prix === undefined || prix === null || prix?.trim() === "") {
        return null;
    }
    return parseFloat(parseFloat(prix).toFixed(2));
}


// Fonction de tri des vêtements
export function vetementSort(a: VetementModel, b: VetementModel) {
    if (a.taille.libelle === b.taille.libelle) {

        if (a.taille.petite === b.taille.petite) {
            return alphanumSort(a.libelle, b.libelle);
        }
        return a.taille.petite ? -1 : 1;
    }
    else {
        return alphanumSort(a.taille.libelle, b.taille.libelle);
    };
}





/**
 * Redimensionne une image en fonction d'une taille maximale tout en conservant son ratio.
 *
 * @param image - L'image à redimensionner, représentée par un objet `VetementImageModel`.
 *                Doit contenir les propriétés `contenu`, `largeur` et `hauteur`.
 * @param maxSize - La taille maximale (en pixels) pour la largeur ou la hauteur de l'image.
 * @returns Une nouvelle instance de `VetementImageModel` avec les dimensions redimensionnées
 *          tout en conservant le ratio d'origine. Si l'image ou son contenu est invalide,
 *          retourne l'image d'origine.
 */
export function resizeImage(image: VetementImageModel, maxSize: number): VetementImageModel | null {

    if(!image || (!image.s3uri && !image.localUri)) {
        return null;
    }

    if (image?.largeur && image?.hauteur) {
        const ratioImage = image.largeur / image.hauteur;

        const clonedImage = { ...image }; // Clone the object
        if (ratioImage > 1) {
            return {
                ...clonedImage,
                displayUri: image?.localUri ?? API_S3_URL + image?.s3uri,
                largeur: maxSize,
                hauteur: maxSize / ratioImage
            };
        } else {
            return {
                ...clonedImage,
                displayUri: image?.localUri ?? API_S3_URL + image?.s3uri,
                largeur: maxSize * ratioImage,
                hauteur: maxSize
            };
        }
    }
        
    return { ...image }; // Return a cloned object even if no resizing is done
}


/**
 * Retourne l'icône du type de vêtement (cf. https://www.flaticon.com/)
 * @param typeVetements id du type de vêtement
 * @returns l'icône 
 */
export function getTypeVetementIcon(typeVetements: string): any {
    typeVetements = typeVetements.toLocaleLowerCase();
    switch (typeVetements) {
        case '67c9720416c735a1d539286c':
            return require('@/assets/icons/accessories-outline.png');   // accessoires
        case '67c9712e16c735a1d5392869':
            return require('@/assets/icons/swimming-outline.png');      // accessoires de bain
        case '67e3304008d64ab0e3683d6b':
            return require('@/assets/icons/blouse-outline.png');        // blouse
        case '67baf8e7445ea1ea588258de':
            return require('@/assets/icons/body-outline.png');          // body
        case '67baf923445ea1ea588258e0':
            return require('@/assets/icons/socks-outline.png');         // chaussettes
        case '67bcd7babff50425c7725e3b':
            return require('@/assets/icons/shoes-outline.png');         // chaussures
        case '67e330ac08d64ab0e3683d70':
            return require('@/assets/icons/tights-outline.png');        // collant
        case '67c970a616c735a1d5392865':
            return require('@/assets/icons/jumpsuit-outline.png');      // combinaison
        case '67c9719116c735a1d539286a':
            return require('@/assets/icons/underwear-outline.png');     // culotte/shorty
        case '67c971c116c735a1d539286b':
            return require('@/assets/icons/undershirt-outline.png');    // débardeur
        case '67e5d6e42525c528f4411aa4':
            return require('@/assets/icons/ensemble-outline.png');      // ensemble
        case '67c9708b16c735a1d5392864':
            return require('@/assets/icons/sweater-outline.png');       // gilet  
        case '67e330be08d64ab0e3683d72':
            return require('@/assets/icons/trench-coat-outline.png');   // Impermeable
        case '67e5d6d32525c528f4411aa3':
            return require('@/assets/icons/jogging-outline.png');       // Jogging
        case '67e3307a08d64ab0e3683d6c':
            return require('@/assets/icons/skirt-outline.png');         // jupe
        case '67e330d708d64ab0e3683d75':
            return require('@/assets/icons/skirt-short-outline.png');   // jupe-short
        case '67c9707216c735a1d5392862':
            return require('@/assets/icons/leggins-outline.png');       // legging
        case '67c9711416c735a1d5392868':
            return require('@/assets/icons/swim-clothes-outline.png');  // maillot de bain
        case '67e330a008d64ab0e3683d6f':
            return require('@/assets/icons/undershirt2-outline.png');   // maillot de corps
        case '67bcd836bff50425c7725e3f':
            return require('@/assets/icons/coat-outline.png');          // manteau
        case '67e330c808d64ab0e3683d73':
            return require('@/assets/icons/cropped-pant-outline.png');  // pantacourt
        case '67bcd7fdbff50425c7725e3e':
            return require('@/assets/icons/pants-outline.png');         // pantalon
        case '67e3309208d64ab0e3683d6e':
            return require('@/assets/icons/pullover-outline.png');      // pull
        case '67c970ea16c735a1d5392867':
            return require('@/assets/icons/pyjama-outline.png');        // pyjama
        case '67bcd7d2bff50425c7725e3c':
            return require('@/assets/icons/dress2-outline.png');        // robe
        case '67e330cf08d64ab0e3683d74':
            return require('@/assets/icons/long-pants-outline.png');    // sarouel
        case '67c9707f16c735a1d5392863':
            return require('@/assets/icons/shorts-outline.png');        // short
        case '67ee742d60546911d1e17c53':
            return require('@/assets/icons/tracksuit-outline.png');     // survetement
        case '67c970bf16c735a1d5392866':
            return require('@/assets/icons/sweat-shirt-outline.png');   // sweat-shirt
        case '67c9704b2875e9983ae97589':
            return require('@/assets/icons/tshirt-outline.png');        // t-shirt
        case '67e330b708d64ab0e3683d71':
            return require('@/assets/icons/jacket-outline.png');        // veste
        default:
            return require('@/assets/icons/clothes-outline.png');
    }
}



/**
 * Retourne un élément JSX avec une étiquette obligatoire.
 *
 * @param {string} label - Le texte de l'étiquette.
 * @returns {React.JSX.Element} Un élément JSX contenant l'étiquette avec un astérisque rouge pour indiquer qu'elle est obligatoire.
 */
export const renderLabelMandatory = (label: string): React.JSX.Element => {
    return (<><ThemedText style={{ color: 'red' }}>* </ThemedText><ThemedText>{label}</ThemedText></>);
}


/**
 * Rendu d'un élément sélectionné avec une option de désélection.
 *
 * @param {any} item - L'élément sélectionné à afficher.
 * @param {any} unSelect - Fonction de rappel pour désélectionner l'élément.
 * @returns {React.JSX.Element} Un élément JSX représentant l'élément sélectionné avec une icône de fermeture.
 */
export const renderSelectedItem = (item: any, unSelect?: any, index?: number): React.JSX.Element => (
    <Pressable
        key={index}
        style={stylesForm.selectedStyle}
        onPress={() => unSelect?.(item)}>
        <View style={stylesForm.rowItems}>
            <ThemedText type="default">{item.libelle} </ThemedText>
            {unSelect &&
                <Ionicons style={stylesForm.icon} color={'white'} name="close-circle-outline" size={18} />
            }
        </View>
    </Pressable>
);

/**
 * Rendu d'un élément sélectionné avec une option de désélection.
 *
 * @param {any} item - L'élément sélectionné à afficher.
 * @param {any} unSelect - Fonction de rappel pour désélectionner l'élément.
 * @returns {React.JSX.Element} Un élément JSX représentant l'élément sélectionné avec une icône de fermeture.
 */
export const renderSelectedItemView = (item: any, index?: number): React.JSX.Element => (
    <View key={index} style={stylesForm.selectedViewStyle}>
        <ThemedText type="default" style={{fontSize: Fonts.app.size}}>{item.libelle} </ThemedText>
    </View>
);


    /**
     * Rendu d'un élément de filtre dans la liste de dressing.
     *
     * @param {DressingListFiltreModel} filtre - L'élément de filtre à afficher.
     * @returns {JSX.Element} - Un composant View contenant les informations de l'élément de filtre.
     */
    export const renderFilterItem = (filtre: any) => {
        return (
            <View style={[styles.listItemStyle, filtre.isType ? styles.listTypeStyle : '']}>
                {filtre.isType 
                    && <ThemedText type="subtitle" style={{ fontWeight: 'bold', fontSize: 14, fontStyle: 'italic', color:Colors.app.color}}> {filtre.type}</ThemedText>}
                {!filtre.isType 
                    && <><ThemedText>{}</ThemedText><ThemedText type="subtitle" style={{ fontWeight: "normal" }}>{filtre.libelle}</ThemedText></>}
            </View>
        );
    };


    /**
     * Recherche d'un filtre dans la liste de filtres.
     */
    export const searchQuery = (keyword: string, labelValue: string) : boolean => {
        return !!new RegExp(keyword, 'i').exec(labelValue);
    }