import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors, Fonts } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'tab' | 'italic';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor('text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'tab' ? styles.tab : undefined,
        type === 'italic' ? styles.italic : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: Fonts.app.size,
    lineHeight: 18,
  },
  defaultSemiBold: {
    fontSize: Fonts.app.size,
    lineHeight: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32,
    color: Colors.app.color,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
    fontSize: Fonts.app.size,
    color: Colors.dark.icon
  },
  tab: {
    lineHeight: 20,
    fontSize: 10,
    color: '#ffffff',
  },  
  link: {
    lineHeight: 20,
    fontSize: Fonts.app.size,
    color: '#0a7ea4',
  },
});
