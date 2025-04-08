import { TypeTailleEnum } from '@/app/constants/AppEnum';
import ParamGenericVetementsModel from './paramGenericVetements.model';

/**
 * Modèle représentant un type d'usage de vetements
 */
export default interface ParamGenericVetementsChaussuresModel extends ParamGenericVetementsModel { 
  readonly type       : TypeTailleEnum; 
}