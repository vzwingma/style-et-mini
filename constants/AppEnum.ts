export const APP_MOBILE_VERSION = "0.0.3";
export const APP_MOBILE_NAME = "Style et Mini";


// Enumération des menus de l'application
export enum MenuParametragesEnum {
  MENU_TYPE_VETEMENTS   = 'Type de vêtements',
  MENU_TAILLES          = 'Tailles et Mesures',
  MENU_USAGES           = 'Usages',
  MENU_ETATS            = 'Etats',
}




// catégorie de dressing (enfant ou adulte)
export enum CategorieDressingEnum {
  BEBE    = 'BEBE',
  ENFANT  = 'ENFANT',
  ADULTE  = 'ADULTE'
}


export enum CaracteristiqueVetementEnum {
  TYPE      = 'TYPE',
  TAILLES   = 'TAILLES',
  POINTURES = 'POINTURES',
  USAGES    = 'USAGES',
  STATUT    = 'STATUT',
  SAISON    = 'SAISON'
}


export enum TypeTailleEnum {
  TAILLE    = 'TAILLE',
  POINTURE  = 'POINTURE'
}

// Enumération des statuts de vêtements
export enum SaisonVetementEnum {
  ETE       = "ETE", 
  MISAISON  = "MISAISON",  
  HIVER     = "HIVER"
}

/**
 * Retourne le libellé correspondant à une saison de vêtement.
 *
 * @param enumSaison - L'énumération de la saison de vêtement.
 * @returns Le libellé de la saison de vêtement sous forme de chaîne de caractères.
 */
export function getLibelleSaisonVetementEnum(enumSaison: SaisonVetementEnum): string  {
  switch (enumSaison) {
    case SaisonVetementEnum.ETE:
      return "Printemps/Eté";
    case SaisonVetementEnum.HIVER:
      return "Automne/Hiver";
      case SaisonVetementEnum.MISAISON:
        return "Mi-saison";      
    default:
      return "Inconnu";
  }
}

// Enumération des statuts de vêtements
export enum StatutVetementEnum {
  ACTIF   = 'ACTIF',
  ARCHIVE = 'ARCHIVE',
}