import { useState } from "react";
import { Button, Dropdown, cx } from "@stakefish/ui-kit";

import { dashboardNavs, ProtocolVariants } from "./utils";

export const NetworkDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown.Root
      modal={false}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(Boolean(open));
      }}
    >
      <Dropdown.Trigger>
        <div className="relative">
          <Button
            application
            size="sm"
            color="secondary"
            startIcon={{ iconKey: dashboardNavs["babylon"].logo, size: 14 }}
            endIcon={{
              iconKey: isOpen ? "chevronUp" : "chevronDown",
              size: 14,
            }}
            className={cx(
              "data-[state=open]:ring-itemSecondaryDefault hover:ring-itemSecondaryDefault ring-itemPrimaryDefaultAlt2 ring-1 ring-inset disabled:backgroundSecondaryOnDefault h-full py-[7px] flounder:!py-[6px] salmon:!py-1.5 gap-1 !px-3",
            )}
          >
            {dashboardNavs["babylon"].shortName}
          </Button>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content
        align="end"
        sideOffset={11}
        className="w-[180px] pointer-events-auto"
      >
        {ProtocolVariants.map((protocol, index) => {
          const isConnected =
            dashboardNavs[protocol].displayName === "Babylon Bitcoin";
          return (
            <Dropdown.Item key={index} className="mb-px" asChild>
              <Button
                size="sm"
                variant="menuItem"
                endIcon={
                  isConnected
                    ? { iconKey: "checkCircleFilled", size: 14 }
                    : undefined
                }
                disabled={isConnected}
                className={cx(
                  "justify-between disabled:backgroundSecondaryOnDefault",
                  isConnected && "!bg-backgroundPrimaryMute",
                )}
                href={dashboardNavs[protocol].link}
                ignoreTargetBlank
              >
                {dashboardNavs[protocol].displayName}
              </Button>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
