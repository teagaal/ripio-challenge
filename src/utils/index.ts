import type { Transaction } from "../features/dashboard/dashboardSlice";

/**
 * Returns a number with two or less decimals.
 */
export function formatNumber(num: number): number {
  return Math.round(num * 100) / 100;
}

/**
 * Helper to format a new transaction
 */
export function generateTransaction(
  amount: number,
  address: string,
): Transaction {
  return {
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    amount,
    address,
    status: "Completed",
  };
}
