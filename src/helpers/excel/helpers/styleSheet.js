import { setColumnsWidth } from "@/helpers/excel/helpers/setColumnsWidth";
import { fillEmptyCells } from "@/helpers/excel/helpers/fillEmptyCells";

export function styleSheet(sheet) {
  setColumnsWidth(sheet, 36);
  fillEmptyCells(sheet);
}
