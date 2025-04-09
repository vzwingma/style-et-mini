import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './components/commons/views/ThemedText';
import { Colors } from './constants/Colors';



export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <ThemedText type="title">Cet écran n'existe pas.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
