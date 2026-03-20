import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";

import { screenBreakPoints } from "./src/ui/common/config/screen-breakpoints";
import { pxToFontVmin } from "./src/ui/stakefish/pxToFontVmin";
import { colors } from "./src/ui/stakefish/theme/colors";
const coreUIConfig = require("@babylonlabs-io/core-ui/tailwind");
const tailwindConfig = require("@stakefish/ui-kit/tailwind.config");

const config: Config = {
  presets: [coreUIConfig, tailwindConfig],
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/stakefish/**/*.{css,scss,js,ts,jsx,tsx,mdx}",
    "./node_modules/@stakefish/ui-kit/lib/**/*.{js,ts,jsx,tsx}",
    "../../packages/babylon-core-ui/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/babylon-wallet-connector/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    screens: {
      ...screenBreakPoints,
      sm: "641px",
      md: "768px",
      lg: "1024px",
      xl: "1240px",
      "2xl": "1440px",
      trout: "428px",
      perch: "641px",
      flounder: "768px",
      salmon: "1024px",
      tuna: "1240px",
      whale: "1440px",
      whaleShark: { raw: "(min-width: 1680px)" },
      troutY: { raw: "(min-width: 768px) and (max-height: 427px)" },
      flounderY: { raw: "(min-width: 768px) and (max-height: 767px)" },
      salmonY: { raw: "(min-width: 768px) and (max-height: 1023px)" },
    },
  },
  boxShadow: {
    none: "none",
    portal: `rgba(var(--color-neutral0), 0.047) 0px 4px 8px 0px`,
    portalInverse: `rgba(var(--color-neutral0), 0.047) 0px -4px 8px 0px`,
    popover: "0px 2px 4px rgba(var(--color-neutral0), 0.12)",
    images:
      "0px 1px 2px rgba(var(--color-neutral0), 0.08), 0px 4px 8px rgba(var(--color-neutral0), 0.08)",
    sliderControls: "0px 4px 8px rgba(var(--color-neutral0), 0.08)",
    dropShadow: "-4px 0px 40px rgba(0, 0, 0, 0.12)",
  },
  extend: {
    opacity: {
      8: ".08",
      12: ".12",
      24: ".24",
      44: ".44",
    },
    fontSize: {
      desktopHero: [pxToFontVmin(120, 88), "1"],
      desktopH1: ["56px", "64px"],
      desktopH2: ["48px", "52px"],
      desktopH3: ["40px", "44px"],
      desktopH4: ["32px", "40px"],
      desktopH5: ["21px", "24px"],
      desktopH6: ["18px", "24px"],
      desktopTitle: ["28px", "34px"],
      desktopBody1: ["24px", "32px"],
      desktopBody2: ["20px", "28px"],
      desktopBody3: ["18px", "28px"],
      desktopBody4: ["16px", "24px"],
      desktopCallout: ["14px", "20px"],
      desktopTag1: ["13px", "16px"],
      desktopTag2: ["8px", "10px"],

      mobileHero: [pxToFontVmin(64, 64), "1"],
      mobileH1: ["32px", "36px"],
      mobileH2: ["28px", "32px"],
      mobileH3: ["26px", "28px"],
      mobileH4: ["24px", "28px"],
      mobileH5: ["18px", "24px"],
      mobileH6: ["16px", "20px"],
      mobileTitle: ["24px", "32px"],
      mobileBody1: ["18px", "24px"],
      mobileBody2: ["17px", "24px"],
      mobileBody3: ["16px", "24px"],
      mobileBody4: ["14px", "20px"],
      mobileCallout: ["13px", "18px"],
      mobileTag1: ["10px", "12px"],
      mobileTag2: ["8px", "10px"],

      h1: "",
      h2: "",
      h3: "",
      h4: "",
      h5: "",
      h6: "",
      hero: "",
      title: "",
      body1: "",
      body2: "",
      body3: "",
      body4: "",
      callout: "",
      tag1: "",
      tag2: "",
    },
    spacing: {
      13: "3.25rem",
      14: "3.5rem",
      15: "4rem",
      16: "5rem",
      17: "6rem",
      18: "7rem",
      19: "7.5rem",
      20: "8rem",
      21: "8.75rem",
      22: "9rem",
    },
    keyframes: {
      "modal-in": {
        "0%": {
          transform: "scale(.96)",
          opacity: 0,
        },
        "100%": {
          transform: "scale(1)",
          opacity: 1,
        },
      },
      "modal-out": {
        "0%": {
          transform: "scale(1)",
          opacity: 1,
        },
        "100%": {
          transform: "scale(.96)",
          opacity: 0,
        },
      },
      "mobile-modal-in": {
        "0%": {
          transform: "translateY(100%)",
        },
        "100%": {
          transform: "translateY(0)",
        },
      },
      "mobile-modal-out": {
        "0%": {
          transform: "translateY(0)",
        },
        "100%": {
          transform: "translateY(100%)",
        },
      },
      "backdrop-in": {
        "0%": {
          opacity: "0",
        },
        "100%": {
          opacity: "1",
        },
      },
      "backdrop-out": {
        "0%": {
          opacity: "1",
        },
        "100%": {
          opacity: "0",
        },
      },
      mouse: {
        "0%": { opacity: 0 },
        "50%": { transform: "translateY(0px)", opacity: 1 },
        "100%": { transform: "translateY(10px)", opacity: 0 },
      },
      enterMenu: {
        from: { opacity: 0, transform: "translateY(5px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      exitMenu: {
        from: { opacity: 1, transform: "translateY(0)" },
        to: { opacity: 0, transform: "translateY(5px)" },
      },
      scaleIn: {
        from: {
          opacity: 0,
          transform:
            "rotateX(-10deg) scale(0.9) translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
        to: {
          opacity: 1,
          transform:
            "rotateX(0deg) scale(1) translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
      },
      scaleOut: {
        from: {
          opacity: 1,
          transform:
            "rotateX(0deg) scale(1) translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
        to: {
          opacity: 0,
          transform:
            "rotateX(-10deg) scale(0.95) translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
      },
      fadeIn: {
        from: {
          opacity: 0,
          transform:
            "translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
        to: {
          opacity: 1,
          transform:
            "translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
      },
      fadeInUp: {
        from: { opacity: "0", transform: "translate3d(0, 15%, 0)" },
        to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
      },
      fadeInUpPX: {
        from: { opacity: "0", transform: "translate3d(0, 30px, 0)" },
        to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
      },
      fadeOut: {
        from: {
          opacity: 1,
          transform:
            "translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
        to: {
          opacity: 0,
          transform:
            "translate3d(var(--radix-popover-content-transform-origin), 0)",
        },
      },
      slideDownAndFade: {
        from: { opacity: 0, transform: "translateY(-2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideLeftAndFade: {
        from: { opacity: 0, transform: "translateX(2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      slideUpAndFade: {
        from: { opacity: 0, transform: "translateY(2px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      slideRightAndFade: {
        from: { opacity: 0, transform: "translateX(-2px)" },
        to: { opacity: 1, transform: "translateX(0)" },
      },
      slideDown: {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      slideUp: {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
      slideLeft: {
        from: { width: "100%" },
        to: { width: 0 },
      },
      drawerIn: {
        from: {
          opacity: 0,
          "-webkit-transform": "translate3d(-20px, 0, 0)",
          transform: "perspective(1px) translate3d(-20px, 0, 0)",
        },
        to: {
          opacity: 1,
          "-webkit-transform": "translate3d(0, 0, 0)",
          transform: "perspective(1px) translate3d(0, 0, 0)",
        },
      },
      contentShow: {
        from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
        to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
      },
      contentHide: {
        from: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        to: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
      },
      triggered: {
        from: { transform: "translate3d(0, 0, 0)" },
        to: { transform: "translate3d(0, 0, 0)" },
      },
      pulse: {
        "0%, 100%": { transform: "scale(1)" },
        "50%": { transform: "scale(0.9)" },
      },
      show: {
        from: { opacity: 0, transform: "translateY(-6px)" },
        to: { opacity: 1, transform: "translateY(0)" },
      },
      "spin-slow": {
        "0%": { transform: "rotate(0deg)" },
        "45%": { transform: "rotate(180deg)" },
        "50%": { transform: "rotate(180deg)" },
        "95%": { transform: "rotate(360deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      mouse: "mouse 3s cubic-bezier(.15,.41,.69,.94) infinite",
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterMenu: "enterMenu 250ms ease",
      exitMenu: "exitMenu 250ms ease",
      slideDownAndFade:
        "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
      slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideUpAndFade:
        "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
      slideRightAndFade:
        "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      slideDown: "slideDown 150ms ease-in",
      slideUp: "slideUp 150ms ease-out",
      slideLeft: "slideLeft 3s ease-in",
      contentShow: "contentShow 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
      contentHide: "contentHide 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
      in: "fadeIn 150ms ease",
      out: "exitMenu 150ms ease",
      drawerIn: "drawerIn 150ms ease",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      show: "show 200ms ease forwards",
      "spin-slow": "spin-slow 4s ease-in-out infinite",
      "modal-in": "modal-in 0.5s ease-in-out forwards",
      "modal-out": "modal-out 0.5s ease-in-out forwards",
      "mobile-modal-in": "mobile-modal-in 0.5s ease-in-out forwards",
      "mobile-modal-out": "mobile-modal-out 0.5s ease-in-out forwards",
      "backdrop-in": "backdrop-in 0.5s ease-in-out forwards",
      "backdrop-out": "backdrop-out 0.5s ease-in-out forwards",
    },
  },
  plugins: [
    createThemes({
      light: {
        ...colors.tonalPalette,
        ...colors.tokensLight,
        transparent: "transparent",
        surface: "#ffffff",
        accent: {
          primary: "#12495E",
          secondary: "#387085",
          disabled: "#9ab7c2",
          contrast: "#ffffff",
        },
        neutral: {
          100: "#F9F9F9",
          200: "#F2F2F2",
        },
        primary: {
          main: "#042F40",
          dark: "#12495E",
          light: "#387085",
          contrast: "#F5F7F2",
        },
        secondary: {
          main: "#CE6533",
          highlight: "#F9F9F9",
          contrast: "#F5F7F2",
          strokeLight: "#d7e1e7",
          strokeDark: "#387085",
        },
        error: {
          main: "#D32F2F",
          dark: "#C62828",
          light: "#EF5350",
        },
        warning: {
          main: "#EF6C00",
          dark: "#E65100",
          light: "#FF9800",
        },
        info: {
          main: "#3465CF",
          dark: "#213F82",
          light: "#34C7CF",
        },
        success: {
          main: "#2E7D32",
          dark: "#518665",
          light: "#4CAF50",
        },
      },
      dark: {
        ...colors.tonalPalette,
        ...colors.tokensDark,
        transparent: "transparent",
        surface: "#121212",
        accent: {
          primary: "#F0F0F0",
          secondary: "#B0B0B0",
          disabled: "#787878",
          contrast: "#ffffff",
        },
        neutral: {
          100: "#252525",
          200: "#2C2C2C",
        },
        primary: {
          main: "#111111",
          dark: "#000000",
          light: "#387085",
          contrast: "#191919",
        },
        secondary: {
          main: "#CE6533",
          highlight: "#252525",
          contrast: "#F5F7F2",
          strokeLight: "#2F2F2F",
          strokeDark: "#5A5A5A",
        },
        error: {
          main: "#D32F2F",
          dark: "#C62828",
          light: "#EF5350",
        },
        warning: {
          main: "#EF6C00",
          dark: "#E65100",
          light: "#FF9800",
        },
        info: {
          main: "#3465CF",
          dark: "#213F82",
          light: "#34C7CF",
        },
        success: {
          main: "#2E7D32",
          dark: "#518665",
          light: "#4CAF50",
        },
      },
    }),
  ],
  safelist: [
    // For SubmitModal iconParentClassName prop
    "h-40",
    "w-80",
  ],
};

export default config;
