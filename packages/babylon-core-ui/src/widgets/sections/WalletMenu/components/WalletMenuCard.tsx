import React from "react";
import { WalletIcon } from "../../../../components/Avatar";
import { Text } from "../../../../components/Text";
import { DisplayHash } from "../../../../components/DisplayHash";
import { CopyIcon } from "../../../../components/Icons";
import { Loader } from "../../../../components/Loader";
import { twJoin } from "tailwind-merge";

/**
 * Balance data structure for wallet display
 */
export interface WalletBalanceData {
  /** Available balance (stakable for BTC, total for BBN) */
  available?: number;
  /** Amount currently staked (BTC only) */
  staked?: number;
  /** Amount available for staking (BTC only) */
  stakable?: number;
  /** Total balance including inscriptions (BTC only) */
  total?: number;
  /** Amount locked in inscriptions (BTC only) */
  inscriptions?: number;
}

export interface WalletMenuCardProps {
  walletType: "Bitcoin" | "Babylon" | "Ethereum";
  walletName?: string;
  walletIcon?: string;
  /** Brand fill for single-colour wallet marks. See `IWallet.iconBackground`. */
  walletIconBackground?: string;
  address: string;
  isCopied: boolean;
  onCopy: () => void;
  className?: string;
  /** Disconnects this wallet alone. Omit to render no per-wallet control. */
  onDisconnect?: () => void;
  /** Accessible name for the per-wallet disconnect control. */
  disconnectLabel?: string;

  // Balance-related props
  balances?: WalletBalanceData;
  coinSymbol?: string;
  isBalanceLoading?: boolean;
  hasUnconfirmedTransactions?: boolean;
  formatBalance?: (amount: number) => string;
}

export const WalletMenuCard: React.FC<WalletMenuCardProps> = ({
  walletType,
  walletName,
  walletIcon,
  walletIconBackground,
  address,
  isCopied,
  onCopy,
  className,
  onDisconnect,
  disconnectLabel,
  balances,
  coinSymbol,
  isBalanceLoading: loading = false,
  hasUnconfirmedTransactions = false,
  formatBalance,
}) => {
  // Simple fallback formatter (consumers should provide their own formatBalance)
  const defaultFormatBalance = (amount: number): string => {
    if (!coinSymbol) return amount.toString();
    return `${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
    })} ${coinSymbol}`;
  };

  const formatBalanceFn = formatBalance || defaultFormatBalance;

  // Render balance value with loading state
  const renderBalanceValue = (value?: number, showLoader = false) => {
    if (loading || showLoader) {
      return <Loader size={20} className="text-accent-primary" />;
    }

    if (value === undefined) {
      return <Text className="text-sm text-accent-secondary">N/A</Text>;
    }

    return (
      <Text variant="body1" className="!text-sm text-accent-primary">
        {formatBalanceFn(value)}
      </Text>
    );
  };

  // Render Bitcoin-specific balance sections
  const renderBitcoinBalances = () => (
    <>
      {/* Staked Balance */}
      {balances?.staked !== undefined && (
        <div className="mb-1 flex flex-col">
          <Text variant="body1" className="!text-xs font-medium text-accent-secondary">
            Staked Balance
          </Text>
          <div data-testid="staked-balance">{renderBalanceValue(balances.staked)}</div>
        </div>
      )}

      {/* Stakable Balance */}
      {balances?.stakable !== undefined && (
        <div className="flex flex-col">
          <Text variant="body1" className="!text-xs font-medium text-accent-secondary">
            Stakable Balance
          </Text>
          <div className="flex items-center gap-2" data-testid="stakable-balance">
            {renderBalanceValue(balances.stakable, loading || hasUnconfirmedTransactions)}
          </div>
        </div>
      )}
    </>
  );

  // Render Babylon-specific balance sections
  const renderBabylonBalances = () => (
    <>
      {/* Available Balance */}
      {balances?.available !== undefined && (
        <div className="flex flex-col">
          <Text variant="body1" className="!text-xs font-medium text-accent-secondary">
            Balance
          </Text>
          <div data-testid="babylon-balance">{renderBalanceValue(balances.available)}</div>
        </div>
      )}
    </>
  );

  const renderEthereumBalances = () => (
    <>
      {balances?.available !== undefined && (
        <div className="flex flex-col">
          <Text variant="body1" className="!text-xs font-medium text-accent-secondary">
            Balance
          </Text>
          <div data-testid="ethereum-balance">{renderBalanceValue(balances.available)}</div>
        </div>
      )}
    </>
  );

  return (
    <div className={twJoin("border-itemPrimaryMute flex-1 border-b py-3 first:pt-0 md:py-4", className)}>
      <div className="flex w-full flex-col">
        <div className="mb-2 flex items-center gap-2.5 md:mb-3">
          <WalletIcon
            alt={walletName || walletType}
            url={walletIcon || ""}
            background={walletIconBackground}
            className="size-8 shrink-0 md:size-10"
          />

          <div className="flex min-w-0 flex-1 flex-col items-start">
            <Text variant="body1" className="text-xs font-medium text-accent-primary">
              {walletType} Wallet
            </Text>
            <div className="flex items-center gap-1">
              {isCopied ? (
                <Text className="text-xs text-accent-secondary">Copied ✓</Text>
              ) : (
                <DisplayHash className="text-xs text-accent-secondary" value={address} symbols={6} />
              )}
              <button
                onClick={onCopy}
                className="flex size-6 shrink-0 items-center justify-center rounded p-1 transition-colors hover:bg-[#d7e1e7] hover:opacity-80 dark:hover:bg-[#252525]"
              >
                <CopyIcon size={14} className="md:size-4" />
              </button>
            </div>
          </div>

          {onDisconnect && (
            <button
              type="button"
              onClick={onDisconnect}
              aria-label={disconnectLabel ?? `Disconnect ${walletType} wallet`}
              className="flex-shrink-0 self-start text-xs font-medium text-error-main transition-opacity hover:opacity-80"
            >
              Disconnect
            </button>
          )}
        </div>

        {/* Balance Sections - only show if balances are provided */}
        {balances && coinSymbol && (
          <div className="space-y-2">
            {walletType === "Bitcoin" && renderBitcoinBalances()}
            {walletType === "Babylon" && renderBabylonBalances()}
            {walletType === "Ethereum" && renderEthereumBalances()}
          </div>
        )}
      </div>
    </div>
  );
};
