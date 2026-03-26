"use client";

import { WalletStore } from "@/features/betting/store/wallet.store";

export default function BalanceDisplay() {
  const balance = WalletStore.useBalance();
  return <>S/ {balance.toFixed(2)}</>;
}
