import { setColumnsWidth } from "@/modules/excel/helpers/setColumnsWidth";
import { fillEmptyCells } from "@/modules/excel/helpers/fillEmptyCells";

export function styleSheet(sheet) {
  setColumnsWidth(sheet, 36);
  fillEmptyCells(sheet);
}
