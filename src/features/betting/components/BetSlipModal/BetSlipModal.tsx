"use client";

import { useModalDismiss } from "@/shared/hooks/useModalDismiss";
import { useBetPlacement } from "@/features/betting/hooks/useBetPlacement";
import CloseIcon from "@/shared/components/icons/CloseIcon";
import styles from "./BetSlipModal.module.scss";

interface BetSlipModalProps {
  onClose: () => void;
}

export default function BetSlipModal({ onClose }: BetSlipModalProps) {
  const { backdropProps } = useModalDismiss(onClose);
  const {
    selections,
    balance,
    amounts,
    error,
    totalBet,
    handleAmountChange,
    handleRemove,
    handleClearAll,
    handlePlaceBet,
  } = useBetPlacement(onClose);

  return (
    <div
      className={styles.backdrop}
      {...backdropProps}
    >
      <div role="dialog" aria-labelledby="betslip-title" className={styles.sheet}>
        <header className={styles.header}>
          <h2 id="betslip-title" className={styles.title}>
            Cupón ({selections.length})
          </h2>
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
        </header>

        <ul className={styles.list}>
          {selections.length === 0 ? (
            <li><p className={styles.empty}>No hay selecciones en el cupón</p></li>
          ) : (
            selections.map((sel) => {
              const amt = parseFloat(amounts[sel.id] || "") || 0;
              const odds = parseFloat(sel.odds);
              const potentialWin = amt * odds;

              return (
                <li key={sel.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <strong className={styles.eventName}>{sel.eventName}</strong>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(sel)}
                      aria-label={`Eliminar ${sel.eventName}`}
                    >
                      <CloseIcon size={10} />
                    </button>
                  </div>
                  <span className={styles.marketName}>{sel.marketName}</span>
                  <div className={styles.selectionRow}>
                    <span className={styles.outcomeName}>{sel.outcomeName}</span>
                    <output className={styles.odds}>{sel.odds}</output>
                  </div>
                  <div className={styles.amountRow}>
                    <label className={styles.amountInputWrapper}>
                      <span className={styles.amountPrefix}>S/</span>
                      <input
                        type="number"
                        className={styles.amountInput}
                        value={amounts[sel.id] || ""}
                        onChange={(e) => handleAmountChange(sel.id, e.target.value)}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        aria-label={`Monto para ${sel.outcomeName}`}
                      />
                    </label>
                    {amt > 0 && (
                      <output className={styles.potentialWin}>
                        Ganancia: S/ {potentialWin.toFixed(2)}
                      </output>
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>

        {selections.length > 0 && (
          <footer className={styles.footer}>
            <dl className={styles.balanceRow}>
              <dt className={styles.balanceLabel}>Saldo disponible</dt>
              <dd className={styles.balanceValue}>S/ {balance.toFixed(2)}</dd>
            </dl>

            {totalBet > 0 && (
              <dl className={styles.balanceRow}>
                <dt className={styles.balanceLabel}>Total apostado</dt>
                <dd className={styles.balanceValue}>S/ {totalBet.toFixed(2)}</dd>
              </dl>
            )}

            {error && <span role="alert" className={styles.error}>{error}</span>}

            <button
              className={styles.betButton}
              onClick={handlePlaceBet}
              disabled={totalBet <= 0}
            >
              Realizar apuesta
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
