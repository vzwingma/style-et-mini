import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import { Colors } from "@/app/constants/Colors";
import { styles as stylesForm } from "../dressing/vetements/vetementForm.styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { razAndCloseForm, initForm, validateForm, deleteForm } from "@/app/controllers/reglages/parametragesForm.controller";
import { ParametragesFormComponent } from "./parametrageForm.component";
import ParamVetementsFormModel from "@/app/models/params/paramVetementsForm.model";
import { ParametragesVetementEnum } from "@/app/constants/AppEnum";
import ParamGenericVetementsModel from "@/app/models/params/paramGenericVetements.model";
import ErrorsFormParametrageModel, { defaultErrorsFormParametrageModel } from "@/app/models/params/formErrorsParams.model";
import { ModalDialogComponent } from "../commons/views/ModalDialog";


/**
 * * @description Composant d'un item de la liste des paramètres
 * @param {ParametragesItemComponentProps} props - Propriétés du composant
 * @returns {JSX.Element} - Composant d'un item de la liste des paramètres
 * @component
 */
export type ParametragesItemComponentProps = {
    readonly parametrageVetements: ParamGenericVetementsModel
    readonly typeParametrage: ParametragesVetementEnum
    setParametreInEdition: (idParametreToEdit: string | null) => void
    parametreInEdition: string | null,
    refreshListeParametresCallback: (typeParam: ParametragesVetementEnum) => void
};


/**
* Validation du formulaire pour archivage du vêtement
* @param form formulaire à valider
* @param setForm fonction de mise à jour du formulaire
* @param setErrorsForm fonction de mise à jour des erreurs
* @param onCloseForm fonction de fermeture du formulaire
* @returns si le formulaire est invalide
*/
function deleteModalConfirmation(form: ParamVetementsFormModel | null, deleteFormCallBack: () => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
    if (form === null) {
        return;
    }
    const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous supprimer ce paramètre ?'}
        ackModalCallback={() => deleteForm(form, deleteFormCallBack)}
        showModal={Math.random()} />;
    setModalDialog(dialog);
}


/**
 * 
 * @param param0 : ParametragesItemComponentProps
 * @returns Composant d'un item de la liste des paramètres
 */
export const ParametragesItemComponent: React.FC<ParametragesItemComponentProps> = ({ parametrageVetements, typeParametrage,
    setParametreInEdition, parametreInEdition, refreshListeParametresCallback: refreshListeParametres }: ParametragesItemComponentProps) => {


    const zeroForm: ParamVetementsFormModel = {
        id: parametrageVetements.id,
        typeParam: typeParametrage,
        libelle: "",
        categories: [],
        isModified: false
    }
    const [form, setForm] = useState<ParamVetementsFormModel | null>(zeroForm);
    const [errorsForm, setErrorsForm] = useState<ErrorsFormParametrageModel>(defaultErrorsFormParametrageModel);
    const [modalDialog, setModalDialog] = useState<JSX.Element | null>(null);


    useEffect(() => {
        if (parametreInEdition !== null) {
            initForm(typeParametrage, parametrageVetements, setForm)
        }
        else {
            setForm(null);
        }
        setModalDialog(null);
    }, [parametreInEdition]);


    const isSelected = parametreInEdition !== null && parametreInEdition === parametrageVetements.id;
    const isUnselected = parametreInEdition !== null && parametreInEdition !== parametrageVetements.id;
    const isLibelleMarqueAutres = parametrageVetements.libelle === '... Autres';
    const isUnUsed = parametrageVetements.nombreVetements === 0;

    return (
        <>
            {modalDialog}
            <View style={[styles.container, isSelected ? styles.containerSelected : null, isUnselected ? styles.containerUnselected : null]}>
                { /** Icones  */}
                <View style={styles.title}>
                    <ThemedText type="subtitle">{parametrageVetements.libelle}</ThemedText>
                    { /** Icoônes édition */}
                    <View style={stylesForm.rowItems}>
                        {isUnUsed &&
                            <Pressable onPress={() => deleteModalConfirmation(zeroForm, () => refreshListeParametres(zeroForm.typeParam), setModalDialog)}>
                                <Image source={require('@/assets/icons/bin-outline.png')} style={styles.titleIcon} tintColor={'white'} />

                            </Pressable>}

                        {parametreInEdition === null && !isLibelleMarqueAutres &&
                            <Pressable onPress={() => setParametreInEdition(parametrageVetements.id)}>
                                <Ionicons size={18} name="pencil-outline" style={styles.titleIcon} />
                            </Pressable>}

                        { /** Icônes en mode édition */}
                        {isSelected &&
                            <Pressable onPress={() => validateForm(form, setErrorsForm, setParametreInEdition, refreshListeParametres)}>
                                <Ionicons size={20} name="checkmark-outline" style={styles.titleIcon} />
                            </Pressable>
                        }
                        {isSelected &&
                            <Pressable onPress={() => razAndCloseForm(setParametreInEdition)}>
                                <Ionicons size={20} name="close-outline" style={styles.titleIcon} />
                            </Pressable>
                        }
                    </View>
                </View>
                { /** Formulaire  */}
                <ParametragesFormComponent
                    key={"form_" + typeParametrage + "_" + parametrageVetements.id}
                    parametrageVetements={parametrageVetements}
                    paramIsInEdition={isSelected}
                    form={form}
                    setForm={setForm}
                    errorsForm={errorsForm}
                    setErrorsForm={setErrorsForm} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.app.background,
        borderColor: Colors.app.backgroundLight,
        borderWidth: 2,
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