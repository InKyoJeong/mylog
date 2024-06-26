import AsyncStorage from '@react-native-async-storage/async-storage';

const setAsyncStorage = async <T>(key: string, data: T) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const getAsyncStorage = async (key: string) => {
  const storedData = await AsyncStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
};

export {setAsyncStorage, getAsyncStorage};
