import { store } from "@/store/store";

export const closeModalPage = () => {
  store.modalPagesStore.activePage = "";
  store.modalPagesStore.props = undefined;
  store.modalPagesStore.isModalOpen = false;
};
