import { Image, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import { Colors } from "@/app/constants/Colors";
import { stylesForm } from "../dressing/vetements/vetementForm.styles";
import { Ionicons } from "@expo/vector-icons";
import { JSX, useEffect, useState } from "react";
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
    setParametreInEdition: (parametreToEdit: string | null) => void
    parametreInEdition: string | null,
    setParametreIsModified: React.Dispatch<React.SetStateAction<boolean>>
    refreshListeParametresCallback: (typeParam: ParametragesVetementEnum) => void
};

/**
 * Affiche une boîte de dialogue de confirmation pour la suppression d'un paramètre
 * @param form Le formulaire associé au paramètre à supprimer
 * @param deleteFormCallBack Fonction de rappel pour rafraîchir la liste après suppression
 * @param setModalDialog Fonction pour définir le dialogue modal à afficher
 */
function deleteModalConfirmation(form: ParamVetementsFormModel | null, deleteFormCallBack: () => void, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {
    if (form === null) {
        return;
    }
    const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous supprimer ce paramètre ?'}
        ackModalCallback={() => deleteForm(form, deleteFormCallBack)} />;
    setModalDialog(dialog);
}

/**
* Gère la fermeture du formulaire avec confirmation si des modifications non sauvegardées existent
* @param form Le formulaire à fermer
* @param closeFormCallBack Fonction de rappel pour fermer le formulaire
* @param setModalDialog Fonction pour définir le dialogue modal à afficher
*/
function closeFormModalConfirmation(form: ParamVetementsFormModel | null, closeFormCallBack: Function, setModalDialog: React.Dispatch<React.SetStateAction<JSX.Element | null>>) {

    if (form === null) {
        return;
    }
    if(form.isModified){
        const dialog: JSX.Element = <ModalDialogComponent text={'Voulez vous quitter le formulaire ?\n Attention, vous allez perdre votre saisie'}
        ackModalCallback={() => closeFormCallBack()} 
        keyModal={Math.random().toString()} />;
        setModalDialog(dialog);
    }
    else {
        closeFormCallBack();
    }
}

/**
 *
 * @param param0 : ParametragesItemComponentProps
 * @returns Composant d'un item de la liste des paramètres
 */
export const ParametragesItemComponent: React.FC<ParametragesItemComponentProps> = ({ parametrageVetements, typeParametrage,
    setParametreInEdition, parametreInEdition, setParametreIsModified, refreshListeParametresCallback: refreshListeParametres }: ParametragesItemComponentProps) => {

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


    useEffect(() => {
        if (form !== null) {
            setParametreIsModified(form.isModified);
        }
    }, [form]);

    const isSelected = parametreInEdition !== null && parametreInEdition === parametrageVetements.id;
    const isUnselected = parametreInEdition !== null && parametreInEdition !== parametrageVetements.id;
    const isLibelleMarqueAutres = parametrageVetements.libelle === '... Autres';
    const isUnUsed = parametrageVetements.nombreVetements === 0;

    return (
        <>
            {modalDialog}
            <View style={[stylesItem.container, isSelected ? stylesItem.containerSelected : null, isUnselected ? stylesItem.containerUnselected : null]}>
                { /** Icones  */}
                <View style={stylesItem.title}>
                    <ThemedText type="subtitle">{parametrageVetements.libelle}</ThemedText>
                    { /** Icônes édition */}
                    <View style={stylesForm.rowItems}>
                        {isUnUsed && !isSelected &&
                            <Pressable onPress={() => deleteModalConfirmation(zeroForm, () => refreshListeParametres(zeroForm.typeParam), setModalDialog)}>
                                <Image source={require('@/assets/icons/bin-outline.png')} style={stylesItem.titleIcon} tintColor={'white'} />

                            </Pressable>}

                        {parametreInEdition === null && !isLibelleMarqueAutres &&
                            <Pressable onPress={() => setParametreInEdition(parametrageVetements.id)}>
                                <Ionicons size={18} name="pencil-outline" style={stylesItem.titleIcon} />
                            </Pressable>}

                        { /** Icônes en mode édition */}
                        {isSelected &&
                            <Pressable onPress={() => validateForm(form, setErrorsForm, setParametreInEdition, refreshListeParametres)}>
                                <Ionicons size={20} name="checkmark-outline" style={stylesItem.titleIcon} />
                            </Pressable>
                        }
                        {isSelected &&
                            <Pressable onPress={() => closeFormModalConfirmation(form, () => razAndCloseForm(setParametreInEdition), setModalDialog)}>
                                <Ionicons size={20} name="close-outline" style={stylesItem.titleIcon} />
                            </Pressable>
                        }
                    </View>
                </View>
                { /** Formulaire  */}
                <ParametragesFormComponent
                    key={"form_" + typeParametrage + "_" + parametrageVetements.id}
                    typeParametrage={typeParametrage}
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

export const stylesItem = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.app.background,
        borderColor: Colors.app.backgroundLight,
        borderWidth: 2
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
    ligne: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});
