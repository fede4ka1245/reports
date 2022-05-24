import { Filesystem, Directory } from "@capacitor/filesystem";

export const downloadWorkbook = (workbookData) => {
  const blob = new Blob([workbookData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  console.log("here", blob);

  Filesystem.writeFile({
    path: "report.xlsx",
    data: blob,
    directory: Directory.Data,
  });
};
