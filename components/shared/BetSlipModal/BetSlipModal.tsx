"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BetSelection } from "@/types/betslip";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { selectSelections, toggleSelection, clearSelections } from "@/store/betslipSlice";
import { selectBalance, deductBalance } from "@/store/walletSlice";
import CloseIcon from "@/components/shared/icons/CloseIcon";
import styles from "./BetSlipModal.module.scss";

interface BetSlipModalProps {
  onClose: () => void;
}

export default function BetSlipModal({ onClose }: BetSlipModalProps) {
  const selections = useAppSelector(selectSelections);
  const balance = useAppSelector(selectBalance);
  const dispatch = useAppDispatch();
  const pointerDownTargetRef = useRef<EventTarget | null>(null);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const totalBet = selections.reduce(
    (sum, sel) => sum + (parseFloat(amounts[sel.id] || "") || 0),
    0
  );

  const handleRemove = useCallback(
    (selection: BetSelection) => {
      dispatch(toggleSelection(selection));
      setAmounts((prev) => {
        const next = { ...prev };
        delete next[selection.id];
        return next;
      });
    },
    [dispatch]
  );

  const handleClearAll = useCallback(() => {
    dispatch(clearSelections());
    setAmounts({});
  }, [dispatch]);

  const handleAmountChange = useCallback(
    (selectionId: string, value: string) => {
      setAmounts((prev) => ({ ...prev, [selectionId]: value }));
      setError("");
    },
    []
  );

  const handlePlaceBet = useCallback(() => {
    const hasAmount = selections.some(
      (sel) => (parseFloat(amounts[sel.id] || "") || 0) > 0
    );
    if (!hasAmount) {
      setError("Ingresa al menos un monto");
      return;
    }
    if (totalBet > balance) {
      setError("Saldo insuficiente");
      return;
    }
    dispatch(deductBalance(totalBet));
    selections.forEach((sel) => dispatch(toggleSelection(sel)));
    setAmounts({});
    onClose();
  }, [selections, amounts, totalBet, balance, dispatch, onClose]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerDownTargetRef.current = e.target;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (
        e.target === e.currentTarget &&
        pointerDownTargetRef.current === e.currentTarget
      ) {
        onClose();
      }
      pointerDownTargetRef.current = null;
    },
    [onClose]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className={styles.sheet}>
        <div className={styles.header}>
          <span className={styles.title}>
            Cupón ({selections.length})
          </span>
          <div className={styles.headerActions}>
            {selections.length > 0 && (
              <button className={styles.clearAllBtn} onClick={handleClearAll}>
                Eliminar todo
              </button>
            )}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {selections.length === 0 ? (
            <p className={styles.empty}>No hay selecciones en el cupón</p>
          ) : (
            selections.map((sel) => {
              const amt = parseFloat(amounts[sel.id] || "") || 0;
              const odds = parseFloat(sel.odds);
              const potentialWin = amt * odds;

              return (
                <div key={sel.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.eventName}>{sel.eventName}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(sel)}
                      aria-label="Eliminar selección"
                    >
                      <CloseIcon size={10} />
                    </button>
                  </div>
                  <span className={styles.marketName}>{sel.marketName}</span>
                  <div className={styles.selectionRow}>
                    <span className={styles.outcomeName}>{sel.outcomeName}</span>
                    <span className={styles.odds}>{sel.odds}</span>
                  </div>
                  <div className={styles.amountRow}>
                    <div className={styles.amountInputWrapper}>
                      <span className={styles.amountPrefix}>S/</span>
                      <input
                        type="number"
                        className={styles.amountInput}
                        value={amounts[sel.id] || ""}
                        onChange={(e) => handleAmountChange(sel.id, e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {amt > 0 && (
                      <span className={styles.potentialWin}>
                        Ganancia: S/ {potentialWin.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {selections.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>Saldo disponible</span>
              <span className={styles.balanceValue}>S/ {balance.toFixed(2)}</span>
            </div>

            {totalBet > 0 && (
              <div className={styles.balanceRow}>
                <span className={styles.balanceLabel}>Total apostado</span>
                <span className={styles.balanceValue}>S/ {totalBet.toFixed(2)}</span>
              </div>
            )}

            {error && <span className={styles.error}>{error}</span>}

            <button
              className={styles.betButton}
              onClick={handlePlaceBet}
              disabled={totalBet <= 0}
            >
              Realizar apuesta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
