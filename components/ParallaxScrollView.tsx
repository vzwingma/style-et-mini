import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { AppStatus } from '@/constants/AppEnum';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerTitle: string;
  connexionStatus?: AppStatus;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerTitle,  
  connexionStatus,
  setRefreshing
}: Props) {

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: Colors.dark.titlebackground },
            headerAnimatedStyle,
          ]}>
          {headerImage}
          <ThemedView style={styles.titleHeader}>
            {connexionStatus && getConnexionStatusIcon(connexionStatus)}
            <ThemedText type="title" style={styles.domoticzColor}>{headerTitle}</ThemedText>
          </ThemedView>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}


/**
 * Retourne l'icône de connexion en fonction du statut de connexion
 * @param connexionStatus Le statut de connexion
 * @returns L'icône de connexion
 * @see DomoticzStatus
 * @see MaterialCommunityIcons
 * @see MaterialCommunityIconsProps
 * @see Colors
 */
function getConnexionStatusIcon(connexionStatus: AppStatus) {
  switch (connexionStatus) {
    case AppStatus.CONNECTE:
      return <MaterialCommunityIcons name="check-circle" size={24} color="green" style={{padding: 5}} />;
    case AppStatus.DECONNECTE:
      return <MaterialCommunityIcons name="alert-circle" size={24} color="red" style={{padding: 5}}/>;
    default:
      return <MaterialCommunityIcons name="help-circle" size={24} color="grey" style={{padding: 5}}/>;
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 10,
    overflow: 'hidden',
  },
  titleHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    top: 30,
    right: 8,
  },
  domoticzColor: {
    color: Colors.app.color
  }
});
