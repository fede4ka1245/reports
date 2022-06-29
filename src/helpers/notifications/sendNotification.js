import {LocalNotifications} from "@capacitor/local-notifications";

export const sendNotification = async (title, body, actionId) => {
  await LocalNotifications.schedule({
    notifications: [
      {
        id: 1,
        title,
        body,
        actionTypeId: actionId
      }
    ]
  })
}

