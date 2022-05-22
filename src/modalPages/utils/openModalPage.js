import { store } from "@/store/store";

export const openModalPage = (modalPageName, props) => {
  if (!props || !modalPageName) {
    return;
  }
  store.modalPagesStore.activePageName = modalPageName;
  store.modalPagesStore.props = props;
  store.modalPagesStore.isModalOpen = true;
};
