import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import ParamGenericVetementsModel from "@/app/models/params/paramGenericVetements.model";
import { CategorieDressingEnum, ParametragesVetementEnum, TypeTailleEnum } from "@/app/constants/AppEnum";
import { Colors } from "@/app/constants/Colors";
import { styles as stylesForm } from "../dressing/vetementForm.styles";
import { renderLabelMandatory, renderSelectedItem } from "../dressing/vetementForm.component";
import ParamGenericVetementsChaussuresModel from "@/app/models/params/paramGenericVetementsChaussures.model";


export type ParametragesItemComponentProps = {
    readonly parametreVetements: any;
    typeParametrage: ParametragesVetementEnum;
};
/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParametragesItemComponent: React.FC<ParametragesItemComponentProps> = ({ parametreVetements, typeParametrage }: ParametragesItemComponentProps) => {
    return (
        <View style={styles.container}>
            <ThemedText type="subtitle">{parametreVetements.libelle}</ThemedText>
                <View style={{ flexDirection: 'row' }}>
                    <ThemedText type="defaultSemiBold" style={stylesForm.label}>{renderLabelMandatory("Nom")}</ThemedText>
                    <TextInput style={stylesForm.input} aria-disabled={true}
                        value={parametreVetements.libelle ?? ''}
                        placeholder={'Indiquez le nom du ' + typeParametrage} />
                </View>
            <View style={{ flexDirection: 'row' }}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>Catégories</ThemedText>
                <View style={stylesForm.filtre}><ThemedText type="subtitle">
                    {
                        parametreVetements.categories?.map((categorie : CategorieDressingEnum) => {
                            return renderSelectedItem({id : categorie, libelle : categorie}, null);
                        }) ?? ''
                    }

                    { /** 
                    <MultiSelect
                        style={stylesForm.dropdown} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                        iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={stylesForm.placeholderStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                        selectedStyle={stylesForm.selectedStyle} inputSearchStyle={stylesForm.inputSearchStyle}
                        mode='modal'
                        data={Object.values(CategorieDressingEnum).map(saison => ({ id: saison, libelle: saison }))}
                        labelField="libelle" valueField="id"
                        placeholder={''}
                        value={parametreVetements.categories?.map(saison => (saison.toString())) ?? []}
                        onChange={item => { console.log(item); }}
                        renderSelectedItem={renderSelectedItem}
                    />
                     */}
                </ThemedText></View>
            </View>
            {parametreVetements.type && 
            <View style={{ flexDirection: 'row' }}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>Type</ThemedText>
                <View style={stylesForm.filtre}><ThemedText type="subtitle">
                    {
                         renderSelectedItem({ id: parametreVetements.type, libelle: parametreVetements.type }, null)
                    }

                    { /** 
                    <MultiSelect
                        style={stylesForm.dropdown} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                        iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={stylesForm.placeholderStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                        selectedStyle={stylesForm.selectedStyle} inputSearchStyle={stylesForm.inputSearchStyle}
                        mode='modal'
                        data={Object.values(CategorieDressingEnum).map(saison => ({ id: saison, libelle: saison }))}
                        labelField="libelle" valueField="id"
                        placeholder={''}
                        value={parametreVetements.categories?.map(saison => (saison.toString())) ?? []}
                        onChange={item => { console.log(item); }}
                        renderSelectedItem={renderSelectedItem}
                    />
                     */}
                </ThemedText></View>
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
        backgroundColor: Colors.dark.background,
        borderColor: Colors.app.background,
        borderWidth: 1,
    }
}
);