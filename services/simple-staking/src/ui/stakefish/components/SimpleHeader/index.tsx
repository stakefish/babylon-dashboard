import {
  Box,
  Button,
  Header as HeaderComponent,
  type ButtonProps,
  cx,
} from "@stakefish/ui-kit";
import { useIsMobile } from "@babylonlabs-io/core-ui";

export interface HeaderProps {
  active?: boolean;
  monochromeLogo?: boolean;
  pictogramOnly?: boolean;
  className?: string;
  variant?: "dark";
}

export const Header = ({
  active = true,
  monochromeLogo,
  className,
  variant,
  pictogramOnly = true,
  ...props
}: HeaderProps) => {
  const isMobile = useIsMobile();
  const forcedDarkMode = variant === "dark";

  const activeButtonProps: ButtonProps = {
    color: active && !isMobile ? "secondary" : "transparent",
    variant: active && !isMobile ? "outline" : "primary",
    className: cx(
      "ring-0 flounder:gap-1 gap-1 tracking-tight flounder:tracking-normal",
      forcedDarkMode && !active && "text-neutral100",
    ),
  };

  const actionsContent = (
    <Box flex className="gap-3.5 trout:gap-1">
      <Button
        size="sm"
        href="/"
        endIcon={{ iconKey: "chevronRight", size: isMobile ? 16 : 14 }}
        tabIndex={0}
        {...activeButtonProps}
      >
        Dashboard
      </Button>
    </Box>
  );

  return (
    <HeaderComponent
      filled={active}
      bordered={active}
      monochromeLogo={monochromeLogo}
      actionsContent={actionsContent}
      className={className}
      variant={variant}
      pictogramOnly={pictogramOnly}
      {...props}
    />
  );
};
