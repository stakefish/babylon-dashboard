import { IconKeyVariant } from "@stakefish/ui-kit";

import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { Network } from "@/ui/common/types/network";
export const ProtocolVariants = ["ethereum", "solana", "babylon"] as const;
export const Networks = ["Ethereum", "Solana", "Babylon"];

export type ProtocolVariant = (typeof ProtocolVariants)[number];
export type NetworksType = (typeof Networks)[number];
export type DashboardNavs = Record<ProtocolVariant, DashboardNavItem>;
export type DashboardNavItem = {
  displayName: NetworksType;
  logo: IconKeyVariant;
  link: string;
  shortName?: string;
};

const { network } = getNetworkConfigBTC();

export const dashboardNavs: DashboardNavs = {
  ethereum: {
    displayName: "Ethereum",
    logo: "ethLogo",
    link: `https://ethereum.stake.fish`,
  },
  solana: {
    displayName: "Solana",
    logo: "solanaLogo",
    link: "https://solana.stake.fish",
  },
  babylon: {
    displayName: "Babylon Bitcoin",
    shortName: "Babylon",
    logo: "babylonLogo",
    link: `https://babylon${network === Network.MAINNET ? "" : "-testnet"}.stake.fish`,
  },
};
