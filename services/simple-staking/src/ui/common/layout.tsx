import { Outlet } from "react-router";
import { twJoin } from "tailwind-merge";

import { network } from "@/ui/common/config/network/btc";
import { Network } from "@/ui/common/types/network";
import "@/ui/globals.css";

import { Footer } from "../stakefish/components/Footer";
import { Header } from "../stakefish/components/Header";

import { CoStakingBanner } from "./components/CoStakingBanner";

export default function RootLayout() {
  return (
    <div
      className={twJoin(
        `relative h-full min-h-svh w-full`,
        network === Network.MAINNET ? "main-app-mainnet" : "main-app-testnet",
      )}
    >
      <div className="flex min-h-svh flex-col py-12 flounder:py-15">
        <CoStakingBanner />
        <Header />

        <Outlet />

        <Footer />
      </div>
    </div>
  );
}
