import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import FriendCard from './FriendCard';
import CustomButton from '../@common/CustomButton';
import InfoMessage from '../@common/InfoMessage';
import {useGetPendingFriends} from '@/hooks/queries/useGetFriends';
import {
  useAcceptFriendRequest,
  useDeleteFriendRequest,
} from '@/hooks/queries/useMutateFriendRequest';

function FriendPendingList() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {data: pendingFriends = [], refetch} = useGetPendingFriends();
  const acceptFriendMutation = useAcceptFriendRequest();
  const deleteFriendMutation = useDeleteFriendRequest();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handlePressAccept = (id: number) => {
    acceptFriendMutation.mutate(id);
  };

  const handlePressDelete = (id: number) => {
    deleteFriendMutation.mutate(id);
  };

  return (
    <FlatList
      data={pendingFriends}
      renderItem={({item}) => (
        <FriendCard key={item.id} friend={item}>
          <View style={styles.buttonContainer}>
            <CustomButton
              label="수락"
              variant="filled"
              size="small"
              onPress={() => handlePressAccept(item.id)}
            />
            <CustomButton
              label="삭제"
              variant="outlined"
              size="small"
              onPress={() => handlePressDelete(item.id)}
            />
          </View>
        </FriendCard>
      )}
      keyExtractor={item => String(item.id)}
      numColumns={1}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      ListEmptyComponent={
        <InfoMessage message="친구 요청을 받으면 여기에 표시됩니다." />
      }
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default FriendPendingList;
