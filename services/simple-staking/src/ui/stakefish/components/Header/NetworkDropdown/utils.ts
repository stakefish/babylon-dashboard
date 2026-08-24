import type { IconComponent } from "@stakefish/ui-kit";
import {
  BabylonLogo,
  ConfluxLogo,
  EthLogo,
  SolanaLogo,
} from "@stakefish/ui-kit/icons";

import { getNetworkConfigBTC } from "@/ui/common/config/network/btc";
import { Network } from "@/ui/common/types/network";
export const ProtocolVariants = [
  "ethereum",
  "solana",
  "conflux",
  "babylon",
] as const;
export const Networks = ["Ethereum", "Solana", "Conflux", "Babylon"];

export type ProtocolVariant = (typeof ProtocolVariants)[number];
export type NetworksType = (typeof Networks)[number];
export type DashboardNavs = Record<ProtocolVariant, DashboardNavItem>;
export type DashboardNavItem = {
  displayName: NetworksType;
  logo: IconComponent;
  link: string;
  shortName?: string;
};

const { network } = getNetworkConfigBTC();

export const dashboardNavs: DashboardNavs = {
  ethereum: {
    displayName: "Ethereum",
    logo: EthLogo,
    link: `https://ethereum.stake.fish`,
  },
  solana: {
    displayName: "Solana",
    logo: SolanaLogo,
    link: "https://solana.stake.fish",
  },
  conflux: {
    displayName: "Conflux",
    logo: ConfluxLogo,
    link: "https://conflux.stake.fish",
  },
  babylon: {
    displayName: "Babylon Bitcoin",
    shortName: "Babylon",
    logo: BabylonLogo,
    link: `https://babylon${network === Network.MAINNET ? "" : "-testnet"}.stake.fish`,
  },
};
