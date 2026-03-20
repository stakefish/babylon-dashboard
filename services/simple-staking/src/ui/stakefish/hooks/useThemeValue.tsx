"use client";

import { useThemeSync } from "@stakefish/ui-kit";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

type ThemeValue = "dark" | "light";

export const useThemeValue = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isLightTheme, setIsLightTheme] = useState<boolean | undefined>();
  const [isDarkTheme, setIsDarkTheme] = useState<boolean | undefined>();
  const { updateTheme } = useThemeSync({ theme, setTheme });

  const toggleTheme = useCallback(() => {
    const targetTheme = resolvedTheme === "light" ? "dark" : "light";
    updateTheme(targetTheme);

    // Forced 'transition: none' on theme change
    document.documentElement.classList.add("disable-hover");
    const timer = setTimeout(
      () => document.documentElement.classList.remove("disable-hover"),
      300,
    );
    return () => clearTimeout(timer);
  }, [resolvedTheme, updateTheme]);

  useEffect(() => {
    setIsLightTheme(resolvedTheme === "light");
    setIsDarkTheme(resolvedTheme === "dark");
    if (resolvedTheme) setTheme(resolvedTheme as ThemeValue);
  }, [resolvedTheme, setTheme]);

  return {
    theme,
    isLightTheme,
    isDarkTheme,
    toggleTheme,
    setTheme,
  };
};
