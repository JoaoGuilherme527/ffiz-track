/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge Tailwind CSS classes while resolving conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to get the correct API URL based on the environment (development or production)
export function getApiURL() {
  return process.env.NODE_ENV === "development" ? process.env.API_DEV : process.env.API_URL;
}

// Recursively flattens nested "attributes" and "data" keys from an object
export function flattenAttributes(data: any): any {
  // Return as is if data is not an object, null, a date, or a function
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, recursively flatten each element
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Create an object to store the flattened structure
  let flattened: { [key: string]: any } = {};

  // Iterate through object properties
  for (let key in data) {
    // Skip inherited properties
    if (!data.hasOwnProperty(key)) continue;

    // If key is "attributes" or "data" and holds an object, merge its contents
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // Otherwise, copy value (recursively flatten if it's an object)
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}

// Formats a timestamp (ISO 8601) into "DD/MM/YYYY HH:mm:ss"
export function formatTime(time: string): string {
  const date = new Date(time);
  return date.toLocaleString().slice(0, 17);
}

// Formats a number as a BRL (Brazilian Real) currency string
export function formatUSDtoBRL(number: number): string {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);

  return formattedValue;
}

// Formats a large number into a short Brazilian Real notation (K, M, B)
export const formatShortBRL = (number: number): string => {
  if (number >= 1_000_000_000) return `R$ ${(number / 1_000_000_000).toFixed(1)}B`;
  if (number >= 1_000_000) return `R$ ${(number / 1_000_000).toFixed(1)}M`;
  if (number >= 1_000) return `R$ ${(number / 1_000).toFixed(1)}K`;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(number);
}

// Retrieves all items from localStorage as an array of [key, value] pairs
export const getItems = () => {
  const items: [string, string][] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key) || "";
      items.push([key, value]);
    }
  }
  return items;
};

// Retrieves a specific item from localStorage by key
export const getItem = (key: string) => {
  const value = localStorage.getItem(key) || "";
  return value;
};

// Saves a new key-value pair to localStorage
export const saveItem = (newKey: string, newValue: string) => {
  localStorage.setItem(newKey, newValue);
};

// Removes a specific item from localStorage
export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};

// Clears all localStorage data after user confirmation
export const clearAll = () => {
  if (confirm("Are you sure you want to clear all localStorage items?")) {
    localStorage.clear();
  }
};
