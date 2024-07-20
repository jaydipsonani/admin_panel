import { toastError } from "@/utils";
import { VAPID_KEY, getToken, messaging } from "@/utils/socialLogin/Firebase";

const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    // const permission = await Notification.requestPermission();
    // if (permission === "granted") {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (currentToken) {
        return currentToken;
      } else {
        toastError(
          "No registration token available. Request permission to generate one."
        );

        return null;
      }
    // } else {
    //   toastError("Notification permission not granted.");
    //   return null;
    // }
  } catch (error) {
    toastError(error);
    return null;
  }
};

export { requestNotificationPermission };
