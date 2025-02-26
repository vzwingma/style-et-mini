import { Platform, ToastAndroid } from "react-native";

// Surcharge de la méthode showToast de ToastAndroid pour afficher un toast Android
// Désactivé en mode web
export function showToast(text: string, duration?: ToastDuration) {
    if (Platform.OS === 'web') {
        console.log("Toast: " + text);
    }
    else if (Platform.OS === 'android') {
        ToastAndroid.show(text, duration !== undefined && duration != null && duration === ToastDuration.SHORT ? ToastAndroid.SHORT : ToastAndroid.LONG);
    }
}

export enum ToastDuration {
    SHORT = "SHORT",
    LONG = "LONG"
}