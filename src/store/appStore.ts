import { atom } from "recoil";
import storeKeys from "./storeKeys";

const isOpenSelectWallet = atom<boolean>({
  key: storeKeys.app.isOpenSelectWallet,
  default: false,
});

export default {
  isOpenSelectWallet,
};
