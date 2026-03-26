import { useCallback } from "react";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { selectBalance, deductBalance, addBalance } from "./walletSlice";

export const WalletStore = {
  useBalance: () => useAppSelector(selectBalance),

  useDeduct: () => {
    const dispatch = useAppDispatch();
    return useCallback(
      (amount: number) => dispatch(deductBalance(amount)),
      [dispatch]
    );
  },

  useAdd: () => {
    const dispatch = useAppDispatch();
    return useCallback(
      (amount: number) => dispatch(addBalance(amount)),
      [dispatch]
    );
  },
};
