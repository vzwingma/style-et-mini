/**
 * Tests de la fonction getUrlAPIParametres dans APIconstants.ts
 *
 * Cette fonction calcule l'URL du service API selon le type de paramètre
 * et l'identifiant optionnel du formulaire.
 */

// Mock expo-constants pour éviter les erreurs de chargement en environnement Node
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: { version: '1.0.0' },
  },
  expoConfig: { version: '1.0.0' },
}));

import {
  getUrlAPIParametres,
  SERVICES_URL,
  SERVICES_PARAMS,
} from '../../constants/APIconstants';
import { ParametragesVetementEnum, ID_NEW_ELEMENT } from '../../constants/AppEnum';
import ParamVetementsFormModel from '../../models/params/paramVetementsForm.model';

// ─── getUrlAPIParametres ──────────────────────────────────────────────────────
describe('getUrlAPIParametres', () => {

  /**
   * Construit un formulaire minimal pour le test.
   */
  const makeForm = (typeParam: ParametragesVetementEnum, id?: string): ParamVetementsFormModel => ({
    id: id ?? null,
    typeParam,
    libelle: '',
    categories: [],
    isModified: false,
  } as unknown as ParamVetementsFormModel);

  it('typeParam = TYPES → retourne SERVICE_PARAMS_TYPE_VETEMENTS', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.TYPES));
    expect(url).toBe(SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS);
  });

  it('typeParam = TAILLES → retourne SERVICE_PARAMS_TAILLES_MESURES', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.TAILLES));
    expect(url).toBe(SERVICES_URL.SERVICE_PARAMS_TAILLES_MESURES);
  });

  it('typeParam = MARQUES → retourne SERVICE_PARAMS_MARQUES', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.MARQUES));
    expect(url).toBe(SERVICES_URL.SERVICE_PARAMS_MARQUES);
  });

  it('typeParam = ETATS → retourne SERVICE_PARAMS_ETATS', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.ETATS));
    expect(url).toBe(SERVICES_URL.SERVICE_PARAMS_ETATS);
  });

  it('typeParam = USAGES → retourne SERVICE_PARAMS_USAGES', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.USAGES));
    expect(url).toBe(SERVICES_URL.SERVICE_PARAMS_USAGES);
  });

  it('typeParam = DRESSING (inconnu) → retourne null', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.DRESSING));
    expect(url).toBeNull();
  });

  it('avec un id valide (non ID_NEW_ELEMENT) → l\'URL contient /<IDP>', () => {
    const validId = '507f1f77bcf86cd799439011';
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.TYPES, validId));
    expect(url).toContain(SERVICES_PARAMS.ID_PARAM);
  });

  it('avec id = ID_NEW_ELEMENT → l\'URL ne contient pas /<IDP>', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.TYPES, ID_NEW_ELEMENT));
    expect(url).not.toContain(SERVICES_PARAMS.ID_PARAM);
    expect(url).toBe(SERVICES_URL.SERVICE_PARAMS_TYPE_VETEMENTS);
  });

  it('avec id = null → l\'URL ne contient pas /<IDP>', () => {
    const url = getUrlAPIParametres(makeForm(ParametragesVetementEnum.TYPES, undefined));
    expect(url).not.toContain(SERVICES_PARAMS.ID_PARAM);
  });
});
