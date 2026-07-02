import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { PORTAL_FEES } from "@/lib/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAnnualFee(units: number): number {
  return Math.round(units * PORTAL_FEES.annualPerUnit * 100) / 100
}
