import { useCallback, useState } from "react";
import { BetslipStore } from "../store/betslip.store";
import { WalletStore } from "../store/wallet.store";
import type { BetSelection } from "../types/betslip";

export function useBetPlacement(onClose: () => void) {
  const selections = BetslipStore.useSelections();
  const balance = WalletStore.useBalance();
  const toggle = BetslipStore.useToggle();
  const clearAll = BetslipStore.useClearAll();
  const deduct = WalletStore.useDeduct();

  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const totalBet = selections.reduce(
    (sum: number, sel: BetSelection) =>
      sum + (parseFloat(amounts[sel.id] || "") || 0),
    0
  );

  const handleAmountChange = useCallback(
    (selectionId: string, value: string) => {
      setAmounts((prev) => ({ ...prev, [selectionId]: value }));
      setError("");
    },
    []
  );

  const handleRemove = useCallback(
    (selection: BetSelection) => {
      toggle(selection);
      setAmounts((prev) => {
        const next = { ...prev };
        delete next[selection.id];
        return next;
      });
    },
    [toggle]
  );

  const handleClearAll = useCallback(() => {
    clearAll();
    setAmounts({});
  }, [clearAll]);

  const handlePlaceBet = useCallback(() => {
    const hasAmount = selections.some(
      (sel: BetSelection) => (parseFloat(amounts[sel.id] || "") || 0) > 0
    );
    if (!hasAmount) {
      setError("Ingresa al menos un monto");
      return;
    }
    if (totalBet > balance) {
      setError("Saldo insuficiente");
      return;
    }
    deduct(totalBet);
    selections.forEach((sel: BetSelection) => toggle(sel));
    setAmounts({});
    onClose();
  }, [selections, amounts, totalBet, balance, deduct, toggle, onClose]);

  return {
    selections,
    balance,
    amounts,
    error,
    totalBet,
    handleAmountChange,
    handleRemove,
    handleClearAll,
    handlePlaceBet,
  };
}
