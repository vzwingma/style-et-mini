import { TextInput, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import { CategorieDressingEnum, getLibelleCategorieEnum, getLibelleTypeTailleEnum, ParametragesVetementEnum, TypeTailleEnum } from "@/app/constants/AppEnum";
import { Colors } from "@/app/constants/Colors";
import { stylesForm } from "../dressing/vetements/vetementForm.styles";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { setCategoriesForm, setLibelleForm, setTriForm, setTypeForm, setTypesForm } from "@/app/controllers/reglages/parametragesForm.controller";
import ParamVetementsFormModel from "@/app/models/params/paramVetementsForm.model";
import ErrorsFormParametrageModel from "@/app/models/params/formErrorsParams.model";
import { renderLabelMandatory, renderSelectedItem, renderSelectedItemView } from "../commons/CommonsUtils";
import ParamGenericVetementsModel from "@/app/models/params/paramGenericVetements.model";


export type ParametragesFormComponentProps = {
    typeParametrage                 : ParametragesVetementEnum
    readonly parametrageVetements   : ParamGenericVetementsModel
    paramIsInEdition                : boolean,
    form                            : ParamVetementsFormModel | null,
    setForm                         : React.Dispatch<React.SetStateAction<ParamVetementsFormModel | null>>,
    errorsForm                      : ErrorsFormParametrageModel | null,
    setErrorsForm                   : React.Dispatch<React.SetStateAction<ErrorsFormParametrageModel>>
};
/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParametragesFormComponent: React.FC<ParametragesFormComponentProps> = ({ typeParametrage, parametrageVetements, paramIsInEdition, 
    form, setForm, errorsForm, setErrorsForm }: ParametragesFormComponentProps) => {

    return (<View key={"form_" + parametrageVetements.id}>
        <View style={stylesForm.rowItems}>
            <ThemedText type="defaultSemiBold" style={stylesForm.label}>{paramIsInEdition ? renderLabelMandatory("Nom") : "Nom"}</ThemedText>
            {!paramIsInEdition ?
                <ThemedText type="defaultSemiBold" style={[stylesForm.label, { width: 200 }]}>{parametrageVetements.libelle}</ThemedText>
                :
                <TextInput style={errorsForm?.libelleInError ? stylesForm.inputError : stylesForm.input} placeholderTextColor={errorsForm?.libelleInError ? 'red' : 'gray'}
                    value={form?.libelle ?? ''}
                    placeholder={!errorsForm?.libelleInError ? 'Indiquez le nom du paramètre' : errorsForm?.libelleMessage + ''}
                    onChangeText={libelle => setLibelleForm(libelle, setForm, setErrorsForm)} />
            }
        </View>
        <View style={stylesForm.rowItems}>
            <ThemedText type="defaultSemiBold" style={stylesForm.label}>{paramIsInEdition ? renderLabelMandatory("Catégories") : "Catégories"}</ThemedText>
            <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                {!paramIsInEdition ?
                    parametrageVetements.categories?.map((categorie: CategorieDressingEnum, index: number) => {
                        return renderSelectedItemView({ id: categorie, libelle: getLibelleCategorieEnum(categorie) }, index);
                    }) ?? ''
                    : <View style={{ width: '100%' }}>
                        <MultiSelect
                            style={!errorsForm?.categoriesInError ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.categoriesInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            selectedStyle={stylesForm.selectedStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={Object.values(CategorieDressingEnum).map(categorie => ({ id: categorie, libelle: getLibelleCategorieEnum(categorie) }))}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.categoriesInError ? 'Selectionnez des catégories' : errorsForm?.categoriesMessage + ''}
                            value={form?.categories?.map((categorie: CategorieDressingEnum) => (categorie.toString())) ?? []}
                            onChange={item => { setCategoriesForm(item, setForm) }}
                            renderSelectedItem={renderSelectedItem}
                        /></View>
                }
            </View>
        </View>
        {((form?.types || parametrageVetements.types) && (typeParametrage === ParametragesVetementEnum.TAILLES || typeParametrage === ParametragesVetementEnum.MARQUES)) &&
        
        <View style={stylesForm.rowItems}>
            <ThemedText type="defaultSemiBold" style={stylesForm.label}>{paramIsInEdition ? renderLabelMandatory("Types") : "Types"}</ThemedText>
            <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                {!paramIsInEdition ?
                    parametrageVetements.types?.map((type: TypeTailleEnum, index: number) => {
                        return renderSelectedItemView({ id: type, libelle: getLibelleTypeTailleEnum(type) }, index);
                    }) ?? ''    
                    : <View style={{ width: '100%' }}>
                        <MultiSelect
                            style={!errorsForm?.typesInError || form?.types ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.typesInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={Object.values(TypeTailleEnum).map(type => ({ id: type, libelle: getLibelleTypeTailleEnum(type) }))}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.typesInError ? 'Selectionnez des types' : errorsForm?.typesMessage}
                            value={form?.types?.map((typeTaille: TypeTailleEnum) => (typeTaille.toString())) ?? []}
                            onChange={item => setTypesForm(item, setForm)}
                            renderSelectedItem={renderSelectedItem}
                        /></View>
                    }
            </View>
        </View>
        }
        {
        ((form?.types || parametrageVetements.types) && (typeParametrage === ParametragesVetementEnum.TYPES)) &&
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>{paramIsInEdition ? renderLabelMandatory("Type") : "Type"}</ThemedText>
                <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!paramIsInEdition ?
                        parametrageVetements.types?.map((type: TypeTailleEnum, index: number) => {
                        return renderSelectedItemView({ id: type, libelle: getLibelleTypeTailleEnum(type) }, index);
                        }) ?? ''    
                        :
                        <Dropdown
                            style={!errorsForm?.typesInError || form?.types ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.typesInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={Object.values(TypeTailleEnum).map(type => ({ id: type, libelle: getLibelleTypeTailleEnum(type) }))}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.typesInError ? 'Selectionnez un type' : errorsForm?.typesMessage}
                            value={form?.types?.[0]}
                            onChange={item => setTypeForm(item.id, setForm)}
                        />
                    }
                </View>
            </View>
        }

        {(form?.tri !== undefined || parametrageVetements.tri !== undefined) &&
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>{paramIsInEdition ? renderLabelMandatory("Tri") : "Tri"}</ThemedText>
                <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!paramIsInEdition ?
                        <ThemedText type="defaultSemiBold" style={[stylesForm.label, { width: 200 }]}>{parametrageVetements.tri}</ThemedText>
                        :
                        <TextInput style={errorsForm?.triInError ? stylesForm.inputError : stylesForm.input} placeholderTextColor={errorsForm?.triInError ? 'red' : 'gray'}
                            value={form?.tri?.toString() ?? ''}
                            placeholder={!errorsForm?.triInError ? 'Indiquez le rang de tri' : errorsForm?.triMessage}
                            keyboardType="numeric"
                            onChangeText={tri => setTriForm(tri, setForm)} />
                    }
                </View>
            </View>
        }
        {!paramIsInEdition && 
        <View style={stylesForm.rowItems}>
            <ThemedText type="defaultSemiBold" style={stylesForm.label}>Nb vêtements</ThemedText>
            <ThemedText type="defaultSemiBold" style={[stylesForm.label, { width: 200 }]}>{parametrageVetements.nombreVetements}</ThemedText>
        </View> 
        }
    </View>
    );
};