import { Colors } from "@/app/constants/Colors";
import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";



export type ModalDialogComponentProps = {
    text: string;
    showModal: number;
    ackModalCallback: () => void;
};

export const ModalDialogComponent: React.FC<ModalDialogComponentProps> = ({ text, showModal, ackModalCallback }: ModalDialogComponentProps) => {


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
    }, [showModal]);


    return (
        <Modal animationType="slide"
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
