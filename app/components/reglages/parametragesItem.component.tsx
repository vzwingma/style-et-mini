import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../commons/views/ThemedText";
import { Colors } from "@/app/constants/Colors";
import { styles as stylesForm } from "../dressing/vetementForm.styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { razAndCloseForm, initForm, validateForm } from "@/app/controllers/parametragesForm.controller";
import { ParametragesFormComponent } from "./parametragesForm.component";
import ParamVetementsFormModel from "@/app/models/params/paramVetementsForm.model";
import { ParametragesVetementEnum } from "@/app/constants/AppEnum";
import ParamGenericVetementsModel from "@/app/models/params/paramGenericVetements.model";


export type ParametragesItemComponentProps = {
    readonly parametrageVetements   : ParamGenericVetementsModel
    readonly typeParametrage        : ParametragesVetementEnum
    setParametreInEdition           : (idParametre: string | null) => void
    parametreInEdition              : string | null
};
/**
 * 
 * @param typeVetements : TypeVetementsModel
 * @returns item de la liste des types de vêtements
 */
export const ParametragesItemComponent: React.FC<ParametragesItemComponentProps> = ({ parametrageVetements, typeParametrage, setParametreInEdition, parametreInEdition }: ParametragesItemComponentProps) => {

    const [editParametrage, setEditParametrage] = useState(false);
    const [form, setForm] = useState({} as ParamVetementsFormModel | null);

    useEffect(() => {
        setParametreInEdition(editParametrage ? parametrageVetements.id : null);
        if(editParametrage) {
            initForm(typeParametrage, parametrageVetements, setForm)
        }
        else {
            setForm(null);
        }

    }, [editParametrage]);


    const isSelected = parametreInEdition !== null && parametreInEdition === parametrageVetements.id;
    const isUnselected = parametreInEdition !== null && parametreInEdition !== parametrageVetements.id;
    const isLibelleMarqueAutres = parametrageVetements.libelle === '... Autres';



    return (
        <View style={[styles.container, 
                     isSelected ? styles.containerSelected : null,
                     isUnselected ? styles.containerUnselected : null]}>
            { /** Icones  */}
            <View style={styles.title}>
                <ThemedText type="subtitle">{parametrageVetements.libelle}</ThemedText>
                <View style={stylesForm.rowItems}>
                { !editParametrage && !isUnselected && !isLibelleMarqueAutres &&
                <Pressable onPress={() => setEditParametrage(true)}>
                    <Ionicons size={18} name="pencil-outline" style={styles.titleIcon} />
                </Pressable> }
                { editParametrage &&
                <Pressable onPress={() => validateForm(form, setEditParametrage, setForm)}>
                    <Ionicons size={20} name="checkmark-outline" style={styles.titleIcon} />
                </Pressable> 
                }
                { editParametrage && 
                <Pressable onPress={() => razAndCloseForm(form, setEditParametrage, setForm)}>
                    <Ionicons size={20} name="close-outline" style={styles.titleIcon} />
                </Pressable>
                }
                </View>
            </View>
            { /** Formulaire  */}
            <ParametragesFormComponent
                key={"form_"+typeParametrage+"_" + parametrageVetements.id}
                parametrageVetements={parametrageVetements}
                editParametrage={editParametrage}
                form={form} 
                setForm={setForm}/>
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