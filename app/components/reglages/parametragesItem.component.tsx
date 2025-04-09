import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import { CategorieDressingEnum, TypeTailleEnum } from "@/app/constants/AppEnum";
import { Colors } from "@/app/constants/Colors";
import { styles as stylesForm } from "../dressing/vetementForm.styles";
import { renderLabelMandatory, renderSelectedItem } from "../dressing/vetementForm.component";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";


export type ParametragesItemComponentProps = {
    readonly parametreVetements: any
    setParametreInEdition: (idParametre: string | null) => void
    parametreInEdition: string | null
};
/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParametragesItemComponent: React.FC<ParametragesItemComponentProps> = ({ parametreVetements, setParametreInEdition, parametreInEdition }: ParametragesItemComponentProps) => {

    const [editParametrage, setEditParametrage] = useState(false);

    useEffect(() => {
        setParametreInEdition(editParametrage ? parametreVetements.id : null);
    }, [editParametrage]);


    const isSelected = parametreInEdition !== null && parametreInEdition === parametreVetements.id;
    const isUnselected = parametreInEdition !== null && parametreInEdition !== parametreVetements.id;

    return (
        <View style={[styles.container, 
                     isSelected ? styles.containerSelected : null,
                     isUnselected ? styles.containerUnselected : null]}>
            <View style={[styles.title, editParametrage ? styles.titleSelected : null]}>
                <ThemedText type="subtitle">{parametreVetements.libelle}</ThemedText>
                <View style={stylesForm.rowItems}>
                { !editParametrage && !isUnselected && <Pressable onPress={() => setEditParametrage(true)}>
                    <Ionicons size={18} name="pencil-outline" style={styles.titleIcon} />
                </Pressable> }
                { editParametrage && <Pressable onPress={() => setEditParametrage(false)}>
                    <Ionicons size={20} name="checkmark-outline" style={styles.titleIcon} />
                </Pressable> 
                }
                { editParametrage && <Pressable onPress={() => setEditParametrage(false)}>
                    <Ionicons size={20} name="close-outline" style={styles.titleIcon} />
                </Pressable>
                }
                { editParametrage && <Pressable onPress={() => setEditParametrage(false)}>
                    <Image source={require('@/assets/icons/bin-outline.png')} tintColor={'white'} style={styles.titleIcon} />
                </Pressable>
                }
                </View>
            </View>
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Nom")}</ThemedText>
                {!editParametrage ? 
                    <ThemedText type="defaultSemiBold" style={[stylesForm.label, { width: 200 }]}>{parametreVetements.libelle}</ThemedText>
                :
                    <TextInput style={stylesForm.input} aria-disabled={true}
                        value={parametreVetements.libelle ?? ''}
                        placeholder={'Indiquez le nom'} />
                }
            </View>
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>Catégories</ThemedText>
                <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!editParametrage ? 
                        parametreVetements.categories?.map((categorie: CategorieDressingEnum) => {
                            return renderSelectedItem({ id: categorie, libelle: categorie }, null);
                        }) ?? ''
                    :
                    <MultiSelect
                        style={stylesForm.dropdown} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                        iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={stylesForm.placeholderStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                        selectedStyle={stylesForm.selectedStyle} inputSearchStyle={stylesForm.inputSearchStyle}
                        mode='modal'
                        data={Object.values(CategorieDressingEnum).map(saison => ({ id: saison, libelle: saison }))}
                        labelField="libelle" valueField="id"
                        placeholder={''}
                        value={parametreVetements.categories?.map((categorie : CategorieDressingEnum) => (categorie.toString())) ?? []}
                        onChange={item => { console.log(item); }}
                        renderSelectedItem={renderSelectedItem}
                    />
                     }
                </View>
            </View>
            {parametreVetements.type &&
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={stylesForm.label}>Type</ThemedText>
                    <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!editParametrage ? 
                            renderSelectedItem({ id: parametreVetements.type, libelle: parametreVetements.type }, null)
                        :
                    <Dropdown
                        style={stylesForm.dropdown} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                        iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={stylesForm.placeholderStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                        mode='modal'
                        data={Object.values(TypeTailleEnum).map(type => ({ id: type, libelle: type }))}
                        labelField="libelle" valueField="id"
                        placeholder={''}
                        value={parametreVetements.type}
                        onChange={item => { console.log(item); }}
                    />
                     }
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.app.background,
        borderColor: Colors.app.background,
        borderWidth: 1,
    },
    containerSelected: {
        borderColor: Colors.app.color,
        borderWidth: 2,
    },
    containerUnselected: {
        opacity: 0.5,
    },        
    title: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    titleSelected: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.app.color,
    },
    titleIcon: {
        color: Colors.dark.text,
        borderColor: 'white',
        borderWidth: 0,
        borderRadius: 2,
        margin: 5,
        height: 20,
        width: 20,
    },
}
);