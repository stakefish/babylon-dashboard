import { CoreUIProvider, ScrollLocker } from "@babylonlabs-io/core-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, useTheme } from "next-themes";
import { Suspense, useEffect, useRef, useState } from "react";

import { PendingOperationsProvider } from "../baby/hooks/services/usePendingOperationsService";
import { MixpanelTracker } from "../stakefish/components/MixpanelTracker";

import { NotificationContainer } from "./components/Notification/NotificationContainer";
import { ErrorProvider } from "./context/Error/ErrorProvider";
import { BbnRpcProvider } from "./context/rpc/BbnRpcProvider";
import { BTCWalletProvider } from "./context/wallet/BTCWalletProvider";
import { CosmosWalletProvider } from "./context/wallet/CosmosWalletProvider";
import { WalletConnectionProvider } from "./context/wallet/WalletConnectionProvider";
import { AppState } from "./state";

/**
 * Mirrors the resolved theme onto the class @stakefish/ui-kit expects.
 *
 * The kit declares its palette on `:root` (light) and `.dark-theme` (dark),
 * while next-themes is configured with attribute="class" and so writes
 * `light` / `dark` - the convention core-ui's prebuilt CSS also keys off.
 * next-themes can only write one class (it calls classList.add with a single
 * token), so without this the kit's tokens would stay on their light values in
 * dark mode: `html`/`body` background and colour in its _global.css read
 * var(--color-backgroundPrimaryDefault) directly.
 *
 * Nothing paints before this runs - index.html ships an empty #root - so
 * mirroring in an effect costs no flash.
 */
function UiKitThemeClass() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const { classList } = document.documentElement;
    classList.toggle("dark-theme", resolvedTheme === "dark");
    classList.toggle("light-theme", resolvedTheme === "light");
  }, [resolvedTheme]);

  return null;
}

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());
  const appRootRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    if (appRootRef.current) {
      setPortalContainer(appRootRef.current);
    }
  }, []);

  return (
    <Suspense>
      <ScrollLocker>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <UiKitThemeClass />
          <CoreUIProvider portalContainer={portalContainer}>
            <div ref={appRootRef} className="min-h-screen">
              <QueryClientProvider client={client}>
                <ErrorProvider>
                  <BbnRpcProvider>
                    <WalletConnectionProvider>
                      <BTCWalletProvider>
                        <CosmosWalletProvider>
                          <PendingOperationsProvider>
                            <AppState>
                              <MixpanelTracker>{children}</MixpanelTracker>
                            </AppState>
                          </PendingOperationsProvider>
                        </CosmosWalletProvider>
                      </BTCWalletProvider>
                    </WalletConnectionProvider>
                  </BbnRpcProvider>
                </ErrorProvider>
                <ReactQueryDevtools
                  buttonPosition="bottom-left"
                  initialIsOpen={false}
                />
              </QueryClientProvider>
              <NotificationContainer />
            </div>
          </CoreUIProvider>
        </ThemeProvider>
      </ScrollLocker>
    </Suspense>
  );
}

export default Providers;
