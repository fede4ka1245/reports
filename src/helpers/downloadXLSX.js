import { xlsxMimeType } from "@/helpers/xlsxMimeType";

export const downloadXLSX = async (fileData, name) => {
  const fullFileName = `${name}.xlsx`;

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
};
