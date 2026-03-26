"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import { selectBalance } from "@/store/walletSlice";

export default function BalanceDisplay() {
  const balance = useAppSelector(selectBalance);
  return <>S/ {balance.toFixed(2)}</>;
}
