import { useSetRecoilState } from "recoil";
import appStore from "store/appStore";

const useSelectWallet = (): {
  openSelectWallet: () => void;
} => {
  const setIsOpenSelectWallet = useSetRecoilState(appStore.isOpenSelectWallet);
  const openSelectWallet = (): void => {
    setIsOpenSelectWallet(true);
  };

  return {
    openSelectWallet,
  };
};

export default useSelectWallet;
