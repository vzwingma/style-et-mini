/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Couleurs utilisées en mode clair et sombre.
 */
const tintColorDark = '#fff';

export const Colors = {
  dark: {
    /**
     * Couleur du texte en mode sombre.
     */
    text: '#ECEDEE',
    /**
     * Couleur de l'arrière-plan en mode sombre.
     */
    background: '#151718',
    /**
     * Couleur de l'arrière-plan de la barre de titre en mode sombre.
     */
    titlebackground: '#353636',

    /**
     * Couleur de mise en évidence en mode sombre.
     */
    tint: tintColorDark,
    /**
     * Couleur des icônes en mode sombre.
     */
    icon: '#9BA1A6',
    /**
     * Couleur par défaut des icônes de l'onglet en mode sombre.
     */
    tabIconDefault: '#9BA1A6',
    /**
     * Couleur des icônes de l'onglet sélectionné en mode sombre.
     */
    tabIconSelected: tintColorDark,
  },
  app: {
    /**
     * Couleur du texte en mode sombre.
     */
    color: '#339a9a',
  }
};
