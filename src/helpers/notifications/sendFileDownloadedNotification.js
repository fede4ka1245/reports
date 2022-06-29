import {LocalNotifications} from "@capacitor/local-notifications";
import {openFile} from "@/helpers/openFile/openFile";
import {sendNotification} from "@/helpers/notifications/sendNotification";
import {getItem, setItem} from "@/helpers/localStorage";

export const sendFileDownloadedNotification = async (name, body, path, directory, mimeType) => {
  const openFileActionType = {
    id: "OPEN_FILE",
    actions: [
      {
        title: "Открыть",
        id: "open",
      },
    ]
  }
  setItem("downloadedFile", {path, directory, mimeType})

  await LocalNotifications.registerActionTypes({
    types: [openFileActionType]
  })
  await LocalNotifications.addListener("localNotificationActionPerformed", (notification) => {
    if (notification.notification.actionTypeId === "OPEN_FILE") {
      const { path, directory, mimeType } = getItem("downloadedFile")
      openFile(path, directory, mimeType);
    }
  })
  await sendNotification(name, body, "OPEN_FILE");
}
