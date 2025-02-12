import { StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/app/components/ThemedText';
import { ThemedView } from '@/app/components/ThemedView';

export default function DressingScreen() {
  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dressing!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        DDD
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
