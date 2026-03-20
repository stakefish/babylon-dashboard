export const THEME_COOKIE_NAME = "stakefish:theme";
export const WEBSITE_URL = "https://stake.fish";

const DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".stake.fish";

export const setCookie = (name: string, value: string, withExpiry = false) => {
  const expiryDate = new Date(Date.now() + 86400000 * 365);

  if (withExpiry) {
    document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/; domain=${DOMAIN}`;
  } else {
    document.cookie = `${name}=${value}; path=/; domain=${DOMAIN}`;
  }
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  const cookie = cookies.find((cookie) => cookie.trim().startsWith(`${name}=`));

  return cookie ? cookie.split("=")[1] : null;
};

export const pxToRem = (value: number) => `${value / 16}rem`;

export const spacingToPx = (value: number) => `${value * 8}px`;

export const spacingToRem = (value: number) => pxToRem(value * 8);

export { pxToFontVmin } from "./pxToFontVmin";

export const percentToHex = (p: number) => {
  const intValue = Math.round((p / 100) * 255);
  const hexValue = intValue.toString(16);
  return hexValue.padStart(2, "0").toUpperCase();
};

export const colorOpacity = (color: string, opacity: number) => {
  return `${color}${percentToHex(opacity)}`;
};

export const decorativeColorSet = [
  "bg-decorationViolet",
  "bg-decorationYellow",
  "bg-decorationPink",
  "bg-decorationMint",
  "bg-decorationSkin",
  "bg-decorationSky",
  "bg-decorationBlue",
  "bg-decorationPink",
  "bg-decorationSkin",
];
