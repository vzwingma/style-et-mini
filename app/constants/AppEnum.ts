import Constants from 'expo-constants';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';

export const APP_MOBILE_VERSION = Constants.expoConfig?.version ?? "0.0.0";
export const APP_MOBILE_NAME = "Style et Mini";


export const ID_NEW_ELEMENT = "-1::NEW"; // ID d'un nouvel élément à ajouter
export const ID_MARQUE_AUTRES = '67ee890c60546911d1e17c54'; // ID d'une marque "... Autres"
/**
 * Enumération représentant les différentes caractéristiques d'un vêtement.
 * 
 * @enum {string}
 * @property {string} TYPES - Le type de vêtement (exemple : chemise, pantalon, etc.).
 * @property {string} TAILLES - Les tailles disponibles pour le vêtement.
 * @property {string} MARQUES - Les marques associées au vêtement.
 * @property {string} USAGES - Les usages possibles du vêtement (exemple : sport, travail, etc.).
 * @property {string} STATUT - Le statut du vêtement (exemple : disponible, en rupture de stock, etc.).
 * @property {string} SAISON - La saison associée au vêtement (exemple : été, hiver, etc.).
 */
export enum CaracteristiqueVetementEnum {
  TYPES = 'TYPES',
  TAILLES = 'TAILLES',
  MARQUES = 'MARQUES',
  USAGES = 'USAGES',
  STATUT = 'STATUT',
  SAISON = 'SAISON'
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
  TYPES = 'TYPES',
  TAILLES = 'TAILLES',
  MARQUES = 'MARQUES',
  USAGES = 'USAGES',
  ETATS = 'ETATS',
  DRESSING = 'DRESSING'
}

// Enumération des menus de l'application
export const menusParametrages: MenuParametragesModel[] =
  [
    {
      titre: 'Type de vêtements',
      icone: require('@/assets/icons/clothes-outline.png'),
      class: ParametragesVetementEnum.TYPES
    },
    {
      titre: 'Tailles et Mesures',
      icone: require('@/assets/icons/size-outline.png'),
      class: ParametragesVetementEnum.TAILLES
    },
    {
      titre: 'Usages',
      icone: require('@/assets/icons/clothes-usage-outline.png'),
      class: ParametragesVetementEnum.USAGES
    },
    {
      titre: 'Etats',
      icone: require('@/assets/icons/clothes-condition-outline.png'),
      class: ParametragesVetementEnum.ETATS
    },
    {
      titre: 'Marques',
      icone: require('@/assets/icons/brand-outline.png'),
      class: ParametragesVetementEnum.MARQUES
    }
  ];



// catégorie de dressing (enfant ou adulte)
export enum CategorieDressingEnum {
  BEBE = 'BEBE',
  ENFANT = 'ENFANT',
  ADULTE = 'ADULTE'
}

/**
 * 
 * @param enumCategorie - La catégorie de dressing à convertir en libellé.
 * @returns le libellé correspondant à la catégorie de dressing.
 */
export function getLibelleCategorieEnum(enumCategorie: CategorieDressingEnum): string {
  switch (enumCategorie) {
    case CategorieDressingEnum.BEBE:
      return "Bébé";
    case CategorieDressingEnum.ENFANT:
      return "Enfant";
    case CategorieDressingEnum.ADULTE:
      return "Adulte";
    default:
      return "Inconnu";
  }
}

/**
 * Enumération représentant les différents types de tailles.
 * 
 * @enum {string}
 * @property {string} VETEMENTS - Représente les tailles pour les vêtements.
 * @property {string} CHAUSSETTES - Représente les tailles pour les vêtements.* 
 * @property {string} CHAUSSURES - Représente les tailles pour les chaussures.
 */
export enum TypeTailleEnum {
  VETEMENTS = 'VETEMENTS',
  CHAUSSETTES = 'CHAUSSETTES',
  CHAUSSURES = 'CHAUSSURES'
}

export function getLibelleTypeTailleEnum(enumTaille: TypeTailleEnum): string {
  switch (enumTaille) {
    case TypeTailleEnum.VETEMENTS:
      return "Vêtements";
    case TypeTailleEnum.CHAUSSETTES:
      return "Chaussettes/Collants";
      case TypeTailleEnum.CHAUSSURES:
      return "Chaussures";
    default:
      return "Inconnu";
  }
}


// Enumération des statuts de vêtements
export enum SaisonVetementEnum {
  ETE = "ETE",
  MISAISON = "MISAISON",
  HIVER = "HIVER"
}

/**
 * Retourne le libellé correspondant à une saison de vêtement.
 *
 * @param enumSaison - L'énumération de la saison de vêtement.
 * @returns Le libellé de la saison de vêtement sous forme de chaîne de caractères.
 */
export function getLibelleSaisonVetementEnum(enumSaison: SaisonVetementEnum): string {
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
  ACTIF = 'ACTIF',
  ARCHIVE = 'ARCHIVE',
}

/**
 * Retourne le libellé correspondant à un statut de vêtement donné.
 *
 * @param enumStatut - Le statut de vêtement de type `StatutVetementEnum`.
 * @returns Le libellé du statut sous forme de chaîne de caractères :
 *          - "Actif" pour `StatutVetementEnum.ACTIF`
 *          - "Archivé" pour `StatutVetementEnum.ARCHIVE`
 *          - "Inconnu" pour tout autre statut non défini.
 */
export function getLibelleStatutVetementEnum(enumStatut: StatutVetementEnum): string {
  switch (enumStatut) {
    case StatutVetementEnum.ACTIF:
      return "Actif";
    case StatutVetementEnum.ARCHIVE:
      return "Archivé";
    default:
      return "Inconnu";
  }
}