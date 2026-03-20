"use client";

import type { ButtonProps } from "@stakefish/ui-kit";
import type { Dispatch, SetStateAction } from "react";
import { Button, DropdownNav } from "@stakefish/ui-kit";
import { useEffect } from "react";
import { useIsMobile } from "@babylonlabs-io/core-ui";
import { NavLink } from "react-router";
import { twJoin } from "tailwind-merge";

interface DropdownMenuProps {
  list: { title: string; url: string }[];
  state?: [boolean, Dispatch<SetStateAction<boolean>>];
  buttonProps?: ButtonProps;
}
export const DropdownMenu = ({
  list,
  state,
  buttonProps,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = state || [false, () => {}];
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile, setIsOpen]);

  return (
    <DropdownNav.Root open={isOpen}>
      <DropdownNav.Trigger asChild>
        <div className="relative">
          <Button
            size="sm"
            variant="outline"
            color="secondary"
            className="ring-1 ring-inset !p-2"
            icon={{ iconKey: isOpen ? "close" : "menu", size: 16 }}
            onClick={() => setIsOpen(!isOpen)}
            {...buttonProps}
          />
        </div>
      </DropdownNav.Trigger>
      <DropdownNav.Content
        align="end"
        side="bottom"
        sideOffset={10}
        alignOffset={0}
      >
        <nav>
          {list.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                twJoin(
                  "w-full flex justify-between align-middle text-[14px] px-4 py-3.5 hover:bg-backgroundSecondaryDefault transition-colors font-mono font-semibold",
                  isActive ? "bg-backgroundSecondaryDefault" : "",
                )
              }
              to={item.url}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </DropdownNav.Content>
    </DropdownNav.Root>
  );
};
