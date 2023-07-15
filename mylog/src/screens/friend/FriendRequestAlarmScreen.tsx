import React, {Suspense} from 'react';

import FriendPendingList from '@/components/friend/FriendPendingList';
import RetryErrorBoundary from '@/components/@common/RetryErrorBoundary';
import Indicator from '@/components/@common/Indicator';

function FriendRequestAlarmScreen() {
  return (
    <RetryErrorBoundary>
      <Suspense fallback={<Indicator />}>
        <FriendPendingList />
      </Suspense>
    </RetryErrorBoundary>
  );
}

export default FriendRequestAlarmScreen;
