import { TextInput, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import { CategorieDressingEnum, getLibelleTypeTailleEnum, TypeTailleEnum } from "@/app/constants/AppEnum";
import { Colors } from "@/app/constants/Colors";
import { stylesForm } from "../dressing/vetements/vetementForm.styles";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { setCategoriesForm, setLibelleForm, setTriForm, setTypeForm } from "@/app/controllers/reglages/parametragesForm.controller";
import ParamVetementsFormModel from "@/app/models/params/paramVetementsForm.model";
import ErrorsFormParametrageModel from "@/app/models/params/formErrorsParams.model";
import { renderLabelMandatory, renderSelectedItem } from "../commons/CommonsUtils";
import ParamGenericVetementsModel from "@/app/models/params/paramGenericVetements.model";


export type ParametragesFormComponentProps = {
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
export const ParametragesFormComponent: React.FC<ParametragesFormComponentProps> = ({ parametrageVetements, paramIsInEdition, 
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
                        return renderSelectedItem({ id: categorie, libelle: categorie }, null, index);
                    }) ?? ''
                    : <View style={{ width: '100%' }}>
                        <MultiSelect
                            style={!errorsForm?.categoriesInError ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.categoriesInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            selectedStyle={stylesForm.selectedStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={Object.values(CategorieDressingEnum).map(categorie => ({ id: categorie, libelle: categorie }))}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.categoriesInError ? 'Selectionnez des catégories' : errorsForm?.categoriesMessage + ''}
                            value={form?.categories?.map((categorie: CategorieDressingEnum) => (categorie.toString())) ?? []}
                            onChange={item => { setCategoriesForm(item, setForm) }}
                            renderSelectedItem={renderSelectedItem}
                        /></View>
                }
            </View>
        </View>
        {(form?.type || parametrageVetements.type) &&
            <View style={stylesForm.rowItems}>
                <ThemedText type="defaultSemiBold" style={stylesForm.label}>{paramIsInEdition ? renderLabelMandatory("Type") : "Type"}</ThemedText>
                <View style={[stylesForm.filtre, stylesForm.rowItems]}>
                    {!paramIsInEdition ?
                        renderSelectedItem({ id: parametrageVetements.type, libelle: parametrageVetements.type })
                        :
                        <Dropdown
                            style={!errorsForm?.typeInError || form?.type ? stylesForm.dropdown : stylesForm.dropdownInError} containerStyle={stylesForm.listStyle} itemContainerStyle={stylesForm.listItemStyle} itemTextStyle={stylesForm.listItemStyle}
                            iconStyle={stylesForm.iconStyle} activeColor={Colors.app.color} placeholderStyle={!errorsForm?.typeInError ? stylesForm.placeholderStyle : stylesForm.placeholderErrorStyle} selectedTextStyle={stylesForm.selectedTextStyle}
                            mode='modal'
                            backgroundColor={Colors.app.modalBackground}
                            data={Object.values(TypeTailleEnum).map(type => ({ id: type, libelle: getLibelleTypeTailleEnum(type) }))}
                            labelField="libelle" valueField="id"
                            placeholder={!errorsForm?.typeInError ? 'Selectionnez un type' : errorsForm?.typeMessage}
                            value={form?.type}
                            onChange={item => setTypeForm(item, setForm)}
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