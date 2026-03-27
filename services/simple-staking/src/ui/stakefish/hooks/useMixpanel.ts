import { useLocation, useSearchParams } from "react-router";
import { useEffect } from "react";

import { useBTCWallet } from "@/ui/common/context/wallet/BTCWalletProvider";

import { Mixpanel } from "../utils/mixpanel";

export function useMixpanelIdentify() {
  const { address: activeAccount } = useBTCWallet();
  useEffect(() => {
    if (activeAccount) Mixpanel.identify(`${activeAccount}`);
    else Mixpanel.reset();
  }, [activeAccount]);
}

export function useMixpanelPageTracker() {
  const location = useLocation();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      Mixpanel.track_pageview();
    }
  }, [location.pathname, searchParams]);
}
