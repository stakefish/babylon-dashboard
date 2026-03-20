import { useWalletConnect } from "@babylonlabs-io/wallet-connector";
import { Header as HeaderComponent } from "@stakefish/ui-kit";
import { NavLink } from "react-router";
import { Nav } from "@babylonlabs-io/core-ui";
import { twJoin } from "tailwind-merge";
import { useState } from "react";

import { Connect } from "@/ui/common/components/Wallet/Connect";
import { useAppState } from "@/ui/common/state";
import { WEBSITE_URL } from "@/ui/stakefish/utils";

import { DashboardLabel } from "./DashboardLabel";
import { NetworkDropdown } from "./NetworkDropdown";
import { ThemeToggler } from "./ThemeToggler";
import { DropdownMenu } from "./DropdownMenu";

export const Header = () => {
  const { isLoading: loading } = useAppState();
  const { open } = useWalletConnect();
  const [isOpen, setIsOpen] = useState(false);

  const frontMenu = (
    <div className="flex items-center justify-center gap-4">
      <DashboardLabel />
    </div>
  );

  const centerMenu: { title: string; url: string }[] = [
    { title: "BTC Staking", url: "/btc" },
    { title: "BABY Staking", url: "/baby" },
    { title: "Rewards", url: "/rewards" },
  ];

  const formattedData = centerMenu.map((item) => ({
    title: item.title,
    url: item.url,
  }));

  const actionContent = (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <ThemeToggler />
      </div>
      <div className="flex gap-2 items-center relative">
        <NetworkDropdown />
        <Connect loading={loading} onConnect={open} />
        <div className="salmon:hidden">
          <DropdownMenu list={formattedData} state={[isOpen, setIsOpen]} />
        </div>
      </div>
    </div>
  );

  return (
    <HeaderComponent
      filled
      bordered
      pictogramOnly
      frontMenu={frontMenu}
      actionsContent={actionContent}
      className="w-screen py-2"
      logoUrl={WEBSITE_URL}
      centerMenu={
        <div className="flex gap-0 py-0 m-0 -mt-px list-none center salmon:gap-5 hidden salmon:block px-10 whale:px-0">
          <Nav>
            {centerMenu.map((item, index) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  twJoin(
                    "flex group select-none items-center justify-between gap-1 px-2 py-2 text-[14px] font-medium outline-hidden salmon:px-3 font-mono font-semibold",
                    isActive ? "underline" : "no-underline",
                  )
                }
                to={item.url}
              >
                {item.title}
              </NavLink>
            ))}
          </Nav>
        </div>
      }
    />
  );
};
