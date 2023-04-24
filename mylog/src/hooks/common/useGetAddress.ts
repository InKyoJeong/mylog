import {useEffect, useState} from 'react';
import type {LatLng} from 'react-native-maps';

function useGetAddress(location: LatLng) {
  const {latitude, longitude} = location;
  const [result, setResult] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=street_address|route|political&key=${API_KEY}`,
        );

        if (!response.ok) {
          throw new Error('error');
        }

        const resData = await response.json();
        const address = resData.results.length
          ? resData.results[0].formatted_address
          : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        setResult(address);
      } catch {
        setResult('주소를 알 수 없습니다.');
      }
    })();
  }, [latitude, longitude]);

  return result;
}

export default useGetAddress;
