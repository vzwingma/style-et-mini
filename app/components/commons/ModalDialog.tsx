import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";



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
        <>
            <Modal animationType="slide"
                   transparent={true}
                   visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{text}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={ackModal}>
                            <Text style={styles.textStyle}>Valider</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}>
                            <Text style={styles.textStyle}>Annuler</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
