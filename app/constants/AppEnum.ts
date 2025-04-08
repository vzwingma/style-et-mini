import Constants from 'expo-constants';
import MenuParametragesModel from '@/app/models/params/menuParametrage.model';

export const APP_MOBILE_VERSION = Constants.expoConfig?.version ?? "0.0.0";
export const APP_MOBILE_NAME = "Style et Mini";


// Enumération des menus de l'application
export const menusParametrages : { [key: string]: MenuParametragesModel[] } = {
    "Paramétrages" : [
      { titre: 'Type de vêtements',   icone: require('@/assets/icons/clothes-outline.png') },
      { titre: 'Tailles et Mesures',  icone: require('@/assets/icons/size-outline.png') },
      { titre: 'Usages',              icone: require('@/assets/icons/clothes-usage-outline.png') },
      { titre: 'Etats',               icone: require('@/assets/icons/clothes-condition-outline.png')},
      { titre: 'Marques',             icone: require('@/assets/icons/brand-outline.png') }],
    "Dressing": [
      { titre: 'Dressing',            icone: require('@/assets/icons/clothes-outline.png') },

    ]
  };
  

// catégorie de dressing (enfant ou adulte)
export enum CategorieDressingEnum {
  BEBE    = 'BEBE',
  ENFANT  = 'ENFANT',
  ADULTE  = 'ADULTE'
}

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
 * Enumération représentant les différents types de tailles.
 * 
 * @enum {string}
 * @property {string} VETEMENTS - Représente les tailles pour les vêtements.
 * @property {string} CHAUSSURES - Représente les tailles pour les chaussures.
 */
export enum TypeTailleEnum {
  VETEMENTS = 'VETEMENTS',
  CHAUSSURES = 'CHAUSSURES'
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