import { Colors } from "./../../../../app/constants/Colors";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";



export type ModalDialogComponentProps = {
    text: string;
    ackModalCallback: () => void;
    keyModal?: string;
};

/**
 * Composant React représentant une boîte de dialogue modale.
 *
 * @param {ModalDialogComponentProps} props - Les propriétés du composant.
 * @param {string} props.text - Le texte à afficher dans la boîte de dialogue.
 * @param {boolean} props.showModal - Indique si la boîte de dialogue doit être affichée.
 * @param {() => void} props.ackModalCallback - Fonction de rappel appelée lorsque l'utilisateur valide la boîte de dialogue.
 *
 * @returns {JSX.Element} Le composant ModalDialog.
 *
 * @description
 * Ce composant affiche une boîte de dialogue modale avec deux boutons : 
 * - "Annuler" pour fermer la boîte de dialogue sans action supplémentaire.
 * - "Valider" pour fermer la boîte de dialogue et exécuter la fonction de rappel `ackModalCallback`.
 *
 * La boîte de dialogue utilise une animation de type "slide" et est transparente.
 * Le composant gère l'état de visibilité de la boîte de dialogue via le hook `useState`.
 * L'effet `useEffect` est utilisé pour afficher la boîte de dialogue lorsque la propriété `showModal` change.
 */
export const ModalDialogComponent: React.FC<ModalDialogComponentProps> = ({ text, ackModalCallback, keyModal }: ModalDialogComponentProps) => {


    const [modalVisible, setModalVisible] = useState(false);

    function ackModal() {
        setModalVisible(false);
        ackModalCallback();
    }

    function closeModal() {
        setModalVisible(false);
    }

    useEffect(() => {
        setModalVisible(true);
    }, [keyModal]);


    return (
        <Modal 
            keyModal={keyModal}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{text}</Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}>
                            <Text style={styles.textStyle}>Annuler</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonOpen]}
                            onPress={ackModal}>
                            <Text style={styles.textStyle}>Valider</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark.background,
        opacity: 0.9,
    },
    modalView: {
        margin: 20,
        backgroundColor: Colors.app.background,
        borderRadius: 10,
        borderColor: Colors.app.color,
        borderWidth: 1,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 150,
    },
    button: {
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        margin: 15,
        width: 100,
        height: 50,

    },
    buttonOpen: {
        backgroundColor: Colors.app.color,
        borderColor: Colors.app.color,
        borderWidth: 1,
    },
    buttonClose: {
        backgroundColor: Colors.app.backgroundLight,
        borderColor: Colors.app.color,
        borderWidth: 1,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: Colors.dark.text,
    },
});
