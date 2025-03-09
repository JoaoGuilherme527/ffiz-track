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
  return date.toLocaleString("pt-BR").slice(0, 17);
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
  else return ""
}

// Retrieves all items from localStorage as an array of [key, value] pairs
export const getItems = () => {
  if (typeof window !== "undefined") {
    const items: [string, string][] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key) || "";
        items.push([key, value]);
      }
    }
    return items;
  }
};

// Retrieves a specific item from localStorage by key
export const getItem = (key: string) => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key) || "";
    return value;
  }
};

// Saves a new key-value pair to localStorage
export const saveItem = (newKey: string, newValue: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(newKey, newValue);
  }
};

// Removes a specific item from localStorage
export const removeItem = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Clears all localStorage data after user confirmation
export const clearAll = () => {
  if (typeof window !== "undefined") {
    if (confirm("Are you sure you want to clear all localStorage items?")) {
      localStorage.clear();
    }
  }
};

export const formatDate = (date: string): string => {
  if (date) {

    const [year, part1, part2] = date.split("-").map(Number);

    const isDayInMiddle = part1 > 12;

    const day = isDayInMiddle ? part1 : part2;
    const month = isDayInMiddle ? part2 : part1;

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
  } return ""
};
