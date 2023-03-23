import { store } from "@/store/store";

export const appConfirm = (text) => {
  store.propmt.text = text;
  store.propmt.isOpen = true;

  return new Promise((resolve) => {
    store.propmt.onSuccess = () => {
      resolve(true);
    };
    store.propmt.onCancel = () => {
      resolve(false);
    };
  });
};
