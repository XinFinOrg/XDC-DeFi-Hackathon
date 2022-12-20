import * as SecureStore from 'expo-secure-store';

// for basic secure storage functions
export const CheckStorageEnabled = async (key: string) => {
  try {
    var result = await SecureStore.isAvailableAsync();
    return result;
  } catch (e) {
    return e;
  }
};

export const SaveItem = async (key: string, value: string) => {
  try {
    var result = await SecureStore.setItemAsync(key, value);
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const ReadItem = async (key: string) => {
  try {
    var result = await SecureStore.getItemAsync(key);
    return result;
  } catch (e) {
    return e;
  }
};

export async function DeleteItem(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (exception) {
    return false;
  }
}




