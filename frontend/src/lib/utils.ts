/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiURL() {
  return process.env.NODE_ENV === "development" ? process.env.API_DEV : process.env.API_URL;
}

export function flattenAttributes(data: any): any {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}


//format the time 2025-02-17T03:29:45.189Z to 17/02/2025 03:29:45
export function formatTime(time: string): string {
  const date = new Date(time);
  return date.toLocaleString();
}

export function formatUSDtoBRL(number: number): string {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number)

  return formattedValue
}

export const formatShortBRL = (number: number): string => {
    if (number >= 1_000_000_000) return `R$ ${(number / 1_000_000_000).toFixed(1)}B`
    if (number >= 1_000_000) return `R$ ${(number / 1_000_000).toFixed(1)}M`
    if (number >= 1_000) return `R$ ${(number / 1_000).toFixed(1)}K`
    return new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(number)
}