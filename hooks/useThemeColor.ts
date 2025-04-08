/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/app/constants/Colors';

export function useThemeColor(
  colorName: keyof typeof Colors.dark
) {
  const theme = 'dark';
  return Colors[theme][colorName];
}
