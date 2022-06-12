import { writeFile } from "capacitor-blob-writer";
import { Directory } from "@capacitor/filesystem";

export const downloadXLSX = (data, name) => {
  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = `${name}.xlsx`;
  a.click();
  window.URL.revokeObjectURL(url);

  writeFile({
    path: `Documents/${name}.xlsx`,
    data: blob,
    directory: Directory.ExternalStorage,
  });
};
