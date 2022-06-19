import { Directory, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import { nanoid } from "nanoid";

export const downloadXLSX = (fileData, name) => {
  if (Capacitor.isNativePlatform()) {
    Filesystem.writeFile({
      path: `Documents/${name || nanoid()}.xlsx`,
      data: fileData.toString("base64"),
      directory: Directory.ExternalStorage,
    });
  } else {
    const blob = new Blob([fileData], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${name || nanoid()}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
