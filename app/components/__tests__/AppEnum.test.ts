/**
 * Tests des fonctions utilitaires de AppEnum.ts
 *
 * Ces fonctions sont de pures fonctions de conversion enum → libellé,
 * sans dépendances externes à mocker (hormis expo-constants au chargement du module).
 */

// Mock expo-constants pour éviter les erreurs de chargement en environnement Node
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: { version: '1.0.0' },
  },
  expoConfig: { version: '1.0.0' },
}));

import {
  CategorieDressingEnum,
  getLibelleCategorieEnum,
  SaisonVetementEnum,
  getLibelleSaisonVetementEnum,
  StatutVetementEnum,
  getLibelleStatutVetementEnum,
  TypeTailleEnum,
  getLibelleTypeTailleEnum,
} from '../../constants/AppEnum';

// ─── getLibelleCategorieEnum ──────────────────────────────────────────────────
describe('getLibelleCategorieEnum', () => {

  it('BEBE → "Bébé"', () => {
    expect(getLibelleCategorieEnum(CategorieDressingEnum.BEBE)).toBe('Bébé');
  });

  it('ENFANT → "Enfant"', () => {
    expect(getLibelleCategorieEnum(CategorieDressingEnum.ENFANT)).toBe('Enfant');
  });

  it('ADULTE → "Adulte"', () => {
    expect(getLibelleCategorieEnum(CategorieDressingEnum.ADULTE)).toBe('Adulte');
  });

  it('valeur inconnue → "Inconnu"', () => {
    expect(getLibelleCategorieEnum('INCONNU' as CategorieDressingEnum)).toBe('Inconnu');
  });
});

// ─── getLibelleSaisonVetementEnum ─────────────────────────────────────────────
describe('getLibelleSaisonVetementEnum', () => {

  it('ETE → "Printemps/Eté"', () => {
    expect(getLibelleSaisonVetementEnum(SaisonVetementEnum.ETE)).toBe('Printemps/Eté');
  });

  it('HIVER → "Automne/Hiver"', () => {
    expect(getLibelleSaisonVetementEnum(SaisonVetementEnum.HIVER)).toBe('Automne/Hiver');
  });

  it('MISAISON → "Mi-saison"', () => {
    expect(getLibelleSaisonVetementEnum(SaisonVetementEnum.MISAISON)).toBe('Mi-saison');
  });

  it('valeur inconnue → "Inconnu"', () => {
    expect(getLibelleSaisonVetementEnum('PRINTEMPS' as SaisonVetementEnum)).toBe('Inconnu');
  });
});

// ─── getLibelleStatutVetementEnum ─────────────────────────────────────────────
describe('getLibelleStatutVetementEnum', () => {

  it('ACTIF → "Actif"', () => {
    expect(getLibelleStatutVetementEnum(StatutVetementEnum.ACTIF)).toBe('Actif');
  });

  it('ARCHIVE → "Archivé"', () => {
    expect(getLibelleStatutVetementEnum(StatutVetementEnum.ARCHIVE)).toBe('Archivé');
  });

  it('valeur inconnue → "Inconnu"', () => {
    expect(getLibelleStatutVetementEnum('SUPPRIME' as StatutVetementEnum)).toBe('Inconnu');
  });
});

// ─── getLibelleTypeTailleEnum ─────────────────────────────────────────────────
describe('getLibelleTypeTailleEnum', () => {

  it('VETEMENTS → "Vêtements"', () => {
    expect(getLibelleTypeTailleEnum(TypeTailleEnum.VETEMENTS)).toBe('Vêtements');
  });

  it('CHAUSSETTES → "Chaussettes/Collants"', () => {
    expect(getLibelleTypeTailleEnum(TypeTailleEnum.CHAUSSETTES)).toBe('Chaussettes/Collants');
  });

  it('CHAUSSURES → "Chaussures"', () => {
    expect(getLibelleTypeTailleEnum(TypeTailleEnum.CHAUSSURES)).toBe('Chaussures');
  });

  it('valeur inconnue → "Inconnu"', () => {
    expect(getLibelleTypeTailleEnum('INCONNU' as TypeTailleEnum)).toBe('Inconnu');
  });
});
