import Constants from 'expo-constants';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';

export const APP_MOBILE_VERSION = Constants.expoConfig?.version ?? "0.0.0";
export const APP_MOBILE_NAME = "Style et Mini";



/**
 * Enumération représentant les différentes caractéristiques d'un vêtement.
 * 
 * @enum {string}
 * @property {string} TYPE - Le type de vêtement (exemple : chemise, pantalon, etc.).
 * @property {string} TAILLES - Les tailles disponibles pour le vêtement.
 * @property {string} MARQUES - Les marques associées au vêtement.
 * @property {string} USAGES - Les usages possibles du vêtement (exemple : sport, travail, etc.).
 * @property {string} STATUT - Le statut du vêtement (exemple : disponible, en rupture de stock, etc.).
 * @property {string} SAISON - La saison associée au vêtement (exemple : été, hiver, etc.).
 */
export enum CaracteristiqueVetementEnum {
  TYPE      = 'TYPE',
  TAILLES   = 'TAILLES',
  MARQUES   = 'MARQUES',
  USAGES    = 'USAGES',
  STATUT    = 'STATUT',
  SAISON    = 'SAISON'
}

/**
 * Enumération représentant les différents paramètres liés aux vêtements.
 * 
 * - `TYPE` : Type de vêtement (exemple : chemise, pantalon, etc.).
 * - `TAILLES` : Tailles disponibles pour les vêtements.
 * - `MARQUES` : Marques associées aux vêtements.
 * - `USAGES` : Usages ou occasions pour lesquels les vêtements sont destinés.
 * - `ETATS` : États des vêtements (exemple : neuf, usagé, etc.).
 * - `DRESSING` : Référence au dressing ou à l'organisation des vêtements.
 */
export enum ParametragesVetementEnum {
  TYPE      = 'TYPE',
  TAILLES   = 'TAILLES',
  MARQUES   = 'MARQUES',
  USAGES    = 'USAGES',
  ETATS     = 'ETATS',
  DRESSING  = 'DRESSING'
}

// Enumération des menus de l'application
export const menusParametrages : { [key: string]: MenuParametragesModel[] } = {
    "Paramétrages" : [
      { titre: 'Type de vêtements',
        icone: require('@/assets/icons/clothes-outline.png'),
        class: ParametragesVetementEnum.TYPE },
      { titre: 'Tailles et Mesures', 
        icone: require('@/assets/icons/size-outline.png'),
        class: ParametragesVetementEnum.TAILLES },
      { titre: 'Usages',
        icone: require('@/assets/icons/clothes-usage-outline.png'),
        class: ParametragesVetementEnum.USAGES },
      { titre: 'Etats',
        icone: require('@/assets/icons/clothes-condition-outline.png'),
        class: ParametragesVetementEnum.ETATS },
      { titre: 'Marques',
        icone: require('@/assets/icons/brand-outline.png'),
        class: ParametragesVetementEnum.MARQUES }],
    "Dressing": [
      { titre: 'Dressing', 
         icone: require('@/assets/icons/clothes-outline.png'),
        class: ParametragesVetementEnum.DRESSING },
    ]
  };
  

// catégorie de dressing (enfant ou adulte)
export enum CategorieDressingEnum {
  BEBE    = 'BEBE',
  ENFANT  = 'ENFANT',
  ADULTE  = 'ADULTE'
}


/**
 * Enumération représentant les différents types de tailles.
 * 
 * @enum {string}
 * @property {string} VETEMENTS - Représente les tailles pour les vêtements.
 * @property {string} CHAUSSURES - Représente les tailles pour les chaussures.
 */
export enum TypeTailleEnum {
  VETEMENTS   = 'VETEMENTS',
  CHAUSSURES  = 'CHAUSSURES'
}

export function getLibelleTypeTailleEnum(enumTille: TypeTailleEnum): string  {
  switch (enumTille) {
    case TypeTailleEnum.VETEMENTS:
      return "Vêtements";
    case TypeTailleEnum.CHAUSSURES:
      return "Chaussures/Chaussettes";
    default:
      return "Inconnu";
  }
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