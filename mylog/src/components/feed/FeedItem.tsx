import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {StackNavigationProp} from '@react-navigation/stack';

import type {ResponsePost} from '@/api/post';
import type {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import CustomMarker from '../@common/CustomMarker';
import Conditional from '../@common/Conditional';
import {getDateWithSeparator} from '@/utils/date';
import useThemeStore from '@/store/useThemeStore';
import {feedNavigations} from '@/constants/navigations';
import {colors} from '@/constants/colors';
import type {ThemeMode} from '@/types';

interface FeedItemProps {
  post: ResponsePost;
}

function FeedItem({post}: FeedItemProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  const handlePressFeed = () => {
    navigation.navigate(feedNavigations.FEED_DETAIL, {id: post.id});
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePressFeed}>
        <View>
          <Conditional condition={post.images.length > 0}>
            <View key={post.id} style={styles.imageContainer}>
              <Image
                source={{
                  uri: `${Config.BASE_URL}/${post.images[0]?.uri}`,
                }}
                style={styles.image}
              />
            </View>
          </Conditional>

          <Conditional condition={post.images.length === 0}>
            <View style={[styles.imageContainer, styles.emptyImageContainer]}>
              <CustomMarker
                size="medium"
                borderColor={colors[theme].GRAY_200}
                innerColor={colors[theme].WHITE}
              />
            </View>
          </Conditional>

          <View style={styles.textContainer}>
            <Text style={styles.dateText}>
              {getDateWithSeparator(post.date, '/')}
            </Text>
            <Text style={styles.titleText}>{post.title}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      margin: 5,
      marginVertical: 12,
    },
    imageContainer: {
      width: Dimensions.get('screen').width / 2 - 25,
      height: Dimensions.get('screen').width / 2 - 25,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GRAY_200,
      borderRadius: 5,
      borderWidth: 1,
    },
    textContainer: {
      marginTop: 7,
      gap: 2,
    },
    dateText: {
      color: colors[theme].PINK_700,
      fontWeight: '600',
      fontSize: 12,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontWeight: '400',
      fontSize: 13,
    },
  });

export default FeedItem;
