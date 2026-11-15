import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "P01", "P02" … "P10" — zero-padded project code */
export function projectCode(order: number): string {
  return `P${String(order).padStart(2, "0")}`;
}
