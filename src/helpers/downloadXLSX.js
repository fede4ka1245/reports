import { Directory, Filesystem } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";
import { xlsxMimeType } from "@/helpers/xlsxMimeType";

export const downloadXLSX = async (fileData, name) => {
  const fullFileName = `${name}.xlsx`;

  if (Capacitor.isNativePlatform()) {
    await Filesystem.writeFile({
      path: `Documents/${fullFileName}`,
      data: fileData.toString("base64"),
      directory: Directory.ExternalStorage,
    });
  } else {
    const blob = new Blob([fileData], {
      type: xlsxMimeType,
    });
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${fullFileName}`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return {
    directory: Directory.ExternalStorage,
    path: `Documents/${fullFileName}`,
    mimeType: xlsxMimeType,
  };
};
