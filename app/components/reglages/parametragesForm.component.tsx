import { TextInput, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import { CategorieDressingEnum, getLibelleTypeTailleEnum, TypeTailleEnum } from "@/app/constants/AppEnum";
import { Colors } from "@/app/constants/Colors";
import { styles as stylesForm } from "../dressing/vetementForm.styles";
import { renderLabelMandatory, renderSelectedItem } from "../dressing/vetementForm.component";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { setCategoriesForm, setLibelleForm, setTriForm, setTypeForm } from "@/app/controllers/parametragesForm.controller";
import ParamVetementsFormModel from "@/app/models/params/paramVetementsForm.model";


export type ParametragesFormComponentProps = {
    readonly parametrageVetements: any
    editParametrage : boolean,
    form            : ParamVetementsFormModel | null,
    setForm         : Function
};
/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParametragesFormComponent: React.FC<ParametragesFormComponentProps> = ({ parametrageVetements, editParametrage, form, setForm }: ParametragesFormComponentProps) => {


    return (<>
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>{editParametrage ? renderLabelMandatory("Nom") : "Nom"}</ThemedText>
                {!editParametrage ? 
                    <ThemedText type="defaultSemiBold" style={[stylesForm.label, { width: 200 }]}>{parametrageVetements.libelle}</ThemedText>
                :
                    <TextInput style={stylesForm.input}
                        value={form?.libelle ?? ''}
                        placeholder={'Indiquez le nom'}
                        onChangeText={libelle => setLibelleForm(libelle, setForm)} />
                }
            </View>
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>{editParametrage ? renderLabelMandatory("Catégories") : "Catégories"}</ThemedText>
                <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!editParametrage ? 
                        parametrageVetements.categories?.map((categorie: CategorieDressingEnum) => {
                            return renderSelectedItem({ id: categorie, libelle: categorie }, null);
                        }) ?? ''
                    :<View style={{ width: '100%' }}>
                    <MultiSelect
                        style={stylesForm.dropdown} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                        iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={stylesForm.placeholderStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                        selectedStyle={stylesForm.selectedStyle} inputSearchStyle={stylesForm.inputSearchStyle}
                        mode='modal'
                        data={Object.values(CategorieDressingEnum).map(saison => ({ id: saison, libelle: saison }))}
                        labelField="libelle" valueField="id"
                        placeholder={'Sélectionner des catégories'}
                        value={form?.categories?.map((categorie : CategorieDressingEnum) => (categorie.toString())) ?? []}
                        onChange={item => { setCategoriesForm(item, setForm)}}
                        renderSelectedItem={renderSelectedItem}
                    /></View>
                     }
                </View>
            </View>
            {(form?.type || parametrageVetements.type) &&
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={stylesForm.label}>{editParametrage ? renderLabelMandatory("Type") : "Type"}</ThemedText>
                    <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!editParametrage ? 
                            renderSelectedItem({ id: parametrageVetements.type, libelle: parametrageVetements.type }, null)
                        :
                    <Dropdown
                        style={stylesForm.dropdown} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                        iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={stylesForm.placeholderStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                        mode='modal'
                        data={Object.values(TypeTailleEnum).map(type => ({ id: type, libelle: getLibelleTypeTailleEnum(type) }))}
                        labelField="libelle" valueField="id"
                        placeholder={'Sélectionner un type : Chaussure ou Vêtement'}
                        value={form?.type}
                        onChange={item => setTypeForm(item, setForm)}
                    />
                     }
                    </View>
                </View>
            }
            {(form?.tri || parametrageVetements.tri) &&
                <View style={stylesForm.rowItems}>
                    <ThemedText type="defaultSemiBold" style={stylesForm.label}>{editParametrage ? renderLabelMandatory("Tri") : "Tri"}</ThemedText>
                    <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!editParametrage ? 
                        <ThemedText type="defaultSemiBold" style={[stylesForm.label, { width: 200 }]}>{parametrageVetements.tri}</ThemedText>
                    :
                        <TextInput style={stylesForm.input}
                            value={form?.tri?.toString() ?? ''}
                            placeholder={'Indiquez le rang de tri'}
                            keyboardType="numeric"
                            onChangeText={tri => setTriForm(tri, setForm)} />
                    }
                    </View>
                </View>
            }
        </>
    );
};