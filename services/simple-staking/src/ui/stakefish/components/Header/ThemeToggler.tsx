import { useCallback } from "react";
import { Button, useThemeSync } from "@stakefish/ui-kit";

import { useAppState } from "@/ui/common/state";

export const ThemeToggler = () => {
  const { theme, setTheme } = useAppState();
  const { updateTheme } = useThemeSync({ theme, setTheme });

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateTheme(newTheme);
  }, [theme, updateTheme]);

  return (
    <Button
      size="sm"
      icon={{ iconKey: theme === "light" ? "moon" : "sun", size: 16 }}
      onClick={toggleTheme}
      variant="outline"
      color="secondary"
      className="ring-1 ring-inset !p-2"
    />
  );
};
