import MenuParametragesModel from '@/app/models/params/menuParametrage.model';
import { ParametragesVetementEnum } from './AppEnum';

export const menusParametrages: MenuParametragesModel[] = [
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
