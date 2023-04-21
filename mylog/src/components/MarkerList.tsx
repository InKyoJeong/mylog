import React from 'react';

import CustomMarker from './common/CustomMarker';
import type {MarkerLocation} from '@/hooks/queries/useMarker';

interface MarkerListProps {
  markers: MarkerLocation[];
}

function MarkerList({markers}: MarkerListProps) {
  return (
    <>
      {markers.map(({id, color, latitude, longitude}) => (
        <CustomMarker
          key={id}
          coordinate={{latitude, longitude}}
          color={color}
        />
      ))}
    </>
  );
}

export default MarkerList;
