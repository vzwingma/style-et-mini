
export const APP_MOBILE_VERSION = "0.0.1";
export const APP_MOBILE_NAME = "Style et Mini";
// Enumération des statuts de l'application
export enum AppStatusEnum {
    INCONNU = 'INCONNU',
    CONNECTE = 'CONNECTE',
    DECONNECTE = 'DECONNECTE',
}


// Enumération des menus de l'application
export enum MenuParametragesEnum {
    MENU_TYPE_VETEMENTS = 'Type de vêtements',
    MENU_TAILLES = 'Tailles et Mesures', 
    MENU_USAGES = 'Usages',
  }

  // Enumération des statuts de vêtements
export enum StatutVetementEnum {
    ACTIF   = 'Actif',
    ARCHIVE = 'Archivé',
  }
  

// catégorie de dressing (enfant ou adulte)
export enum CategorieDressingEnum {
    BEBE    = 'Bébé',
    ENFANT  = 'Enfant',
    ADULTE  = 'Adulte'
}

export enum TypeTailleEnum {
    TAILLE = 'Taille',
    POINTURE = 'Pointure'
}