import { FileOpener } from '@awesome-cordova-plugins/file-opener/';
import {Filesystem} from "@capacitor/filesystem";

export const openFile = async (path, directory, mimeType) => {
  const { uri } =  await Filesystem.getUri({path, directory})

  FileOpener.open(uri, mimeType)
}