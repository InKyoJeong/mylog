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

import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants/navigations';
import {getDateWithSeparator} from '@/utils/date';
import {colors} from '@/constants/colors';

interface FeedItemProps {
  post: any;
}

function FeedItem({post}: FeedItemProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  const handlePressFeed = () => {
    navigation.navigate(feedNavigations.FEED_DETAIL, {id: post.id});
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePressFeed}>
        <View>
          <View key={post.id} style={styles.imageContainer}>
            <Image
              source={
                post.images.length
                  ? {uri: `${Config.BACK_URL}/${post.images[0].uri}`}
                  : require('@/assets/modal-marker-default.png')
              }
              style={styles.image}
            />
          </View>
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

const styles = StyleSheet.create({
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
  textContainer: {
    marginTop: 7,
    gap: 2,
  },
  dateText: {
    color: colors.PINK_700,
    fontWeight: '500',
    fontSize: 12,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 12,
  },
});

export default FeedItem;
