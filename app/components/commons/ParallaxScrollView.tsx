import type { PropsWithChildren, ReactElement } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/app/components/commons/ThemedView';
import { APP_MOBILE_NAME, APP_MOBILE_VERSION, AppStatusEnum } from '@/constants/AppEnum';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const HEADER_HEIGHT = 100;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerTitle: string;
  connexionStatus?: AppStatusEnum;
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
  let refreshing = false;
  const bottom = 0;
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(!refreshing);
    refreshing = !refreshing;
  }, [refreshing, setRefreshing]);


  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        /*
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } */
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
            <ThemedText type="title" style={styles.appColor}>{headerTitle}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.titleHeader}>
            {connexionStatus && getConnexionStatusIcon(connexionStatus)}
            <ThemedText type="italic" style={{color : 'grey', marginRight: 10, marginTop: 10, fontSize: 16}}>{APP_MOBILE_NAME} v {APP_MOBILE_VERSION}</ThemedText>
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
 * @see AppStatusEnum
 * @see MaterialCommunityIcons
 * @see MaterialCommunityIconsProps
 * @see Colors
 */
function getConnexionStatusIcon(connexionStatus: AppStatusEnum) {
  switch (connexionStatus) {
    case AppStatusEnum.CONNECTE:
      return <MaterialCommunityIcons name="check-circle" size={20} color="green"/>;
    case AppStatusEnum.DECONNECTE:
      return <MaterialCommunityIcons name="alert-circle" size={20} color="red"/>;
    default:
      return <MaterialCommunityIcons name="help-circle" size={20} color="grey"/>;
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
    padding: 5,
    overflow: 'hidden',
  },
  titleHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    top: 30,
    right: 8,
    backgroundColor: ''
  },
  appColor: {
    color: Colors.app.color,
    fontSize: 26,
  }
});
