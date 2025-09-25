import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Returns the native push token when available (Android FCM / iOS APNs),
// otherwise falls back to the Expo push token.
export async function registerForPushNotificationsAsync(): Promise<string | null> {
  try {
    if (!Device.isDevice) {
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return null;
    }

    // Prefer native device token when available
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      try {
        const devicePushToken = await Notifications.getDevicePushTokenAsync();
        if (devicePushToken?.data) {
          return String(devicePushToken.data);
        }
      } catch (_) {
        // ignore and fall back to Expo token
      }
    }

    // Fallback: Expo push token
    const expoToken = (
      await Notifications.getExpoPushTokenAsync({
        projectId: (Constants?.expoConfig as any)?.extra?.eas?.projectId,
      })
    ).data;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    return expoToken ?? null;
  } catch (_err) {
    return null;
  }
}


